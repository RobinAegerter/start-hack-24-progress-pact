import { Skeleton } from "@/components/ui/skeleton";

export default function DefaultLoading() {
  return (
    <div>
      <h2 className="text-2xl">Your Profile</h2>
      <Skeleton className="w-full h-12" />
    </div>
  );
}
