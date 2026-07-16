import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

interface GoogleTokenResponse {
  access_token: string;
  error?: string;
  error_description?: string;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const role = searchParams.get("state") === "employer" ? "employer" : "candidate";
  const oauthError = searchParams.get("error");

  if (oauthError) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Google sign-in was cancelled.")}`);
  }
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Google sign-in failed. Please try again.")}`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Google login isn't configured on the server yet.")}`);
  }

  try {
    // 1. Exchange the authorization code for an access token.
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${origin}/api/auth/google/callback`,
      }),
    });
    const tokenData: GoogleTokenResponse = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Google sign-in failed during token exchange.")}`);
    }

    // 2. Fetch the candidate/employer's Google profile.
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile: GoogleUserInfo = await profileRes.json();

    if (!profile.email) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Your Google account has no email HireForge can use.")}`);
    }

    await connectDB();

    // 3. Find an existing account by Google ID, then by email, or create a new one.
    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      user = await User.findOne({ email: profile.email });
      if (user) {
        user.googleId = profile.sub;
        if (!user.avatarUrl) user.avatarUrl = profile.picture;
        await user.save();
      }
    }
    if (!user) {
      user = await User.create({
        name: profile.name || profile.email.split("@")[0],
        email: profile.email,
        role,
        authProvider: "google",
        googleId: profile.sub,
        avatarUrl: profile.picture,
      });
    }

    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const res = NextResponse.redirect(`${origin}/`);
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Something went wrong during Google sign-in.")}`);
  }
}