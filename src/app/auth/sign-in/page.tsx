"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SignInForm } from "./SigninForm";
import { SignUpForm } from "./SignupForm";
export default function SignIn() {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/onboarding";

  const handleSignIn = async (provider: string) => {
    const res = await signIn(provider, {
      callbackUrl: callbackUrl,
    });

    if (res?.error) {
      toast.error(res.error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mt-8">Login</h2>
      <Button onClick={() => handleSignIn("google")}>
        Sign in with Google
      </Button>
    </div>
  );
}
