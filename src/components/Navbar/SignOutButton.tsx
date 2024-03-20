"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

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
