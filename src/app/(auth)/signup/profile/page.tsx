"use client";

import { useState, ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UploadProfileImageProps {
  token: string; // JWT token from signup/login
}

export default function UploadProfileImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(selected.type)) {
      setError("Only JPG or PNG files are allowed.");
      setFile(null);
      setPreview(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError(null);
  };

  const triggerFileInput = () => inputRef.current?.click();

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/auth/signup/profile", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Failed to upload image.");
      }
      if(res.ok){
        console.log('Profile image uploaded successfully:', data);
        router.push('/admin/products');
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto mt-10 p-6 bg-secondary rounded-xl border border-border shadow-lg sm:p-8">
      <h1 className="text-2xl font-bold text-foreground text-center">Upload Profile Image</h1>
      <p className="text-sm text-muted-foreground text-center">
        Add a profile picture before creating your account (optional)
      </p>

      {/* Image Circle */}
      <div
        className={cn(
          "w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition",
          error && "border-destructive"
        )}
        onClick={triggerFileInput}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-muted-foreground text-center">Click to Upload</span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full mt-2">
        <Button
          onClick={handleUpload}
          disabled={loading }
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? "Uploading..." : "Continue"}
        </Button>

        <Link
          href="/admin/products"
         
          className="w-full text-center py-2 rounded-md text-foreground hover:bg-muted transition"
        >
          Skip
        </Link>
      </div>
    </div>
  );
}
