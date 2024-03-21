import { Skeleton } from "@/components/ui/skeleton";

export default function DefaultLoading() {
  return (
    <div className="p-5 mt-3">
      <h2 className="text-2xl">Goals</h2>
      <Skeleton className="w-full h-12" />
    </div>
  );
}
