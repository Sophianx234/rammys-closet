"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashStore } from "@/lib/store";
import { Lock, Mail, Upload, User } from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { z } from "zod";

/* ------------------ ZOD SCHEMAS ------------------ */
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const passwordSchema = z.object({
  current: z.string().min(1, "Current password is required"),
  newPass: z.string().min(6, "New password must be at least 6 characters"),
  confirm: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPass === data.confirm, {
  path: ["confirm"],
  message: "Passwords do not match",
});

export default function SettingsPage() {
  const { user, setUser } = useDashStore();

  // Local state for safe initialization
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "/default-profile.png",
    file: null as File | null,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [btnProfile, setBtnProfile] = useState("Save Profile");
  const [btnEmail, setBtnEmail] = useState("Update Email");
  const [btnPass, setBtnPass] = useState("Update Password");

  // Hydrate profile state when user is loaded
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        image: user.profile || "/default-profile.png",
        file: null,
      });
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-20">Loading...</div>;
  }

  /* ------------------ PROFILE IMAGE ------------------ */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, image: url, file }));
    setBtnProfile("Save Changes");
  };

  /* ------------------ PROFILE SAVE ------------------ */
  const handleProfileSave = async () => {
    const validate = profileSchema.safeParse({ name: profile.name });
    if (!validate.success) {
      setErrors({ profileName: validate.error.errors[0].message });
      return;
    }
    setErrors({});
    setBtnProfile("Saving...");

    try {
      const form = new FormData();
      form.append("userId", user._id);

      form.append("name", profile.name);
      if (profile.file) form.append("profile", profile.file);
      console.log("Submitting profile update with form data:", user._id, profile.name, profile.file);

      const res = await fetch("/api/users/update-profile", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ toast: true, icon: "error", title: data.message || "Failed to update profile", position: "top-end", showConfirmButton: false, timer: 2000 });
        setBtnProfile("Save Profile");
        return;
      }

      setUser(data.user);
      setProfile((prev) => ({ ...prev, image: data.user.profile }));
      setBtnProfile("Updated!");
      setTimeout(() => setBtnProfile("Save Profile"), 1500);
    } catch {
      Swal.fire({ toast: true, icon: "error", title: "Something went wrong", position: "top-end", showConfirmButton: false, timer: 2000 });
      setBtnProfile("Save Profile");
    }
  };

  /* ------------------ EMAIL UPDATE ------------------ */
  const handleEmailUpdate = async () => {
    const validate = emailSchema.safeParse({ email: profile.email });
    if (!validate.success) {
      setErrors({ email: validate.error.errors[0].message });
      Swal.fire({ toast: true, icon: "error", title: validate.error.errors[0].message, position: "top-end", showConfirmButton: false, timer: 2000 });
      return;
    }
    setErrors({});
    setBtnEmail("Updating...");

    try {
      const form = new FormData();
      form.append("userId", user._id);
      form.append("email", profile.email);

      const res = await fetch("/api/users/update-email", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ toast: true, icon: "error", title: data.message || "Failed to update email", position: "top-end", showConfirmButton: false, timer: 2000 });
        setBtnEmail("Update Email");
        return;
      }

      setUser(data.user);
      setBtnEmail("Updated!");
      setTimeout(() => setBtnEmail("Update Email"), 1500);
    } catch {
      Swal.fire({ toast: true, icon: "error", title: "Something went wrong", position: "top-end", showConfirmButton: false, timer: 2000 });
      setBtnEmail("Update Email");
    }
  };

  /* ------------------ PASSWORD UPDATE ------------------ */
  const handlePasswordUpdate = async () => {
    const validate = passwordSchema.safeParse(passwords);
    if (!validate.success) {
      const err = validate.error.errors[0];
      setErrors({ [err.path[0]]: err.message });
      Swal.fire({ toast: true, icon: "error", title: err.message, position: "top-end", showConfirmButton: false, timer: 2000 });
      return;
    }

    setErrors({});
    setBtnPass("Updating...");

    try {
      const form = new FormData();
      form.append("userId", user._id);
      form.append("current", passwords.current);
      form.append("newPass", passwords.newPass);

      const res = await fetch("/api/users/update-password", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ toast: true, icon: "error", title: data.message || "Failed to update password", position: "top-end", showConfirmButton: false, timer: 2000 });
        setBtnPass("Update Password");
        return;
      }

      setBtnPass("Updated!");
      setTimeout(() => setBtnPass("Update Password"), 1500);
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch {
      Swal.fire({ toast: true, icon: "error", title: "Something went wrong", position: "top-end", showConfirmButton: false, timer: 2000 });
      setBtnPass("Update Password");
    }
  };

  return (
    <>
      <div className="max-w-3xl py-6 mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Account Settings</h1>

        {/* PROFILE */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <img src={profile.image} className="w-20 h-20 rounded-full object-cover border" />
              <div>
                <Label>Profile Picture</Label>
                <div className="relative inline-block">
                  <Input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                  <Button variant="outline" className="flex gap-2"><Upload className="w-4 h-4" /> Upload</Button>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input value={profile.name} onChange={(e) => { setProfile((p) => ({ ...p, name: e.target.value })); setBtnProfile("Save Changes"); }} />
              {errors.profileName && <p className="text-primary text-sm">{errors.profileName}</p>}
            </div>
            <Button className="w-fit" onClick={handleProfileSave}>{btnProfile}</Button>
          </CardContent>
        </Card>

        {/* EMAIL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> Email Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label>New Email</Label>
            <Input type="email" value={profile.email} onChange={(e) => { setProfile((p) => ({ ...p, email: e.target.value })); setBtnEmail("Save Changes"); }} />
            {errors.email && <p className="text-primary text-sm">{errors.email}</p>}
            <Button className="w-fit" onClick={handleEmailUpdate}>{btnEmail}</Button>
          </CardContent>
        </Card>

        {/* PASSWORD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Current Password</Label>
              <Input type="password" value={passwords.current} onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} />
              {errors.current && <p className="text-primary text-sm">{errors.current}</p>}
            </div>
            <div className="space-y-1">
              <Label>New Password</Label>
              <Input type="password" value={passwords.newPass} onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))} />
              {errors.newPass && <p className="text-primary text-sm">{errors.newPass}</p>}
            </div>
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} />
              {errors.confirm && <p className="text-primary text-sm">{errors.confirm}</p>}
            </div>
            <Button className="w-fit" onClick={handlePasswordUpdate}>{btnPass}</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
