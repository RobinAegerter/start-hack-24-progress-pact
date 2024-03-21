import { Skeleton } from "@/components/ui/skeleton";

export default function DefaultLoading() {
  return (
    <div className="p-5">
      <h2 className="text-2xl">Chats</h2>
      <Skeleton className="w-full h-12" />
    </div>
  );
}
