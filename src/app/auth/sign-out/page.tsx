"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
export default function SignIn() {
  const handleSignout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <h1>You can sign out here!</h1>
      <Button onClick={handleSignout}>Sign out</Button>
    </>
  );
}
