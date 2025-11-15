"use client";

import { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadProfileImageProps {
  onNext: (file?: File) => void;
}

export default function UploadProfileImage({ onNext }: UploadProfileImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validate type
    if (!["image/png", "image/jpeg", "image/jpg"].includes(selected.type)) {
      setError("Only JPG or PNG files are allowed.");
      setFile(null);
      setPreview(null);
      return;
    }

    // Validate size (<5MB)
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

  const handleNext = () => {
    onNext(file || undefined);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto mt-10 p-6 bg-secondary rounded-xl border border-border shadow-md">
      <h1 className="text-2xl font-bold text-foreground text-center">
        Upload Profile Image
      </h1>
      <p className="text-sm text-muted-foreground text-center">
        Add a profile picture before creating your account (optional)
      </p>

      {/* Preview */}
      <div className="w-32 h-32 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-muted-foreground">No Image</span>
        )}
      </div>

      {/* Hidden File Input Trigger */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="profile-image"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="profile-image"
        className={cn(
          "cursor-pointer px-4 py-2 border border-border rounded text-sm text-foreground bg-secondary hover:bg-secondary/80 transition",
          error && "border-destructive"
        )}
      >
        {file ? "Change Image" : "Select Image"}
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={handleNext}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Continue
        </Button>

        <Button
          variant="outline"
          onClick={() => onNext()}
          className="w-full text-foreground hover:bg-muted"
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
