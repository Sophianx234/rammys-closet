"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Mail, Lock, User } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useDashStore } from "@/lib/store";

export default function SettingsPage() {
  const {user} = useDashStore();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@email.com",
    image: "/default-avatar.png",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, image: url }));
  };

  return (
    <>
    <Header/>
    <div className="max-w-3xl py-6 mx-auto space-y-10">
    
      <h1 className="text-3xl font-bold">Account Settings</h1>

      {/* ---------------- PROFILE ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Image */}
          <div className="flex items-center gap-6">
            <img
              src={user?.profile}
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div>
              <Label className="text-sm mb-1">Profile Picture</Label>
              <div className="relative inline-block">
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" className="flex gap-2">
                  <Upload className="w-4 h-4" /> Upload
                </Button>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={user.name}
              onChange={(e) =>
                setProfile((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>

          <Button className="w-fit">Save Profile</Button>
        </CardContent>
      </Card>

      {/* ---------------- EMAIL ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" /> Email Address
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>New Email</Label>
            <Input
              type="email"
              value={user.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          <Button className="w-fit">Update Email</Button>
        </CardContent>
      </Card>

      {/* ---------------- PASSWORD ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Change Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, current: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, newPass: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, confirm: e.target.value }))
              }
            />
          </div>

          <Button className="w-fit">Update Password</Button>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  );
}
