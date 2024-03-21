"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSignOut = async () => {
    signOut({ callbackUrl: "/" });
  };
  return <Button onClick={() => handleSignOut()}>{children}</Button>;
}
