"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  // get query params next app router
  const errorMessage = useSearchParams().get("error");
  return (
    <div>
      <h2 className="text-2xl">Something went wrong!</h2>
      <p className="my-3">{errorMessage}</p>
      <Button variant="outline" onClick={() => window.history.back()}>
        Back
      </Button>
    </div>
  );
}
