"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUploader({ label, values, onChange, multiple = false, maxFiles = 6 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  async function uploadFile(file: File): Promise<string | null> {
    if (!cloudName || !uploadPreset) {
      setError("Image upload isn't configured yet. Add your Cloudinary credentials to .env.local.");
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.secure_url as string;
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError("");
    setUploading(true);

    try {
      const files = Array.from(fileList).slice(0, maxFiles - values.length);
      const uploaded: string[] = [];
      for (const file of files) {
        const url = await uploadFile(file);
        if (url) uploaded.push(url);
      }
      if (uploaded.length > 0) {
        onChange(multiple ? [...values, ...uploaded] : [uploaded[0]]);
      } else if (!error) {
        setError("Upload failed. Please try a different image.");
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-graphite-700">{label}</label>

      {values.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {values.map((url, i) => (
            <div key={i} className="group relative aspect-video overflow-hidden rounded-lg border border-graphite-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-graphite-900/80 text-white opacity-0 transition group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {(multiple || values.length === 0) && values.length < maxFiles && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-secondary"
        >
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
          {uploading ? "Uploading…" : "Upload image" + (multiple ? "s" : "")}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}