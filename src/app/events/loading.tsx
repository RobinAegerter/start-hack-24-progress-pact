import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-5 mt-3">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl">Events</h2>
      </div>
      <Skeleton className="w-full h-48 mb-5" />
      <Skeleton className="w-full h-48 mb-5" />
      <Skeleton className="w-full h-48 mb-5" />
    </div>
  );
}
