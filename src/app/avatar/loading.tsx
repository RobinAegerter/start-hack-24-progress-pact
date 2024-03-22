import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Image
        src={"/model_loading.gif"}
        width={"400"}
        unoptimized
        height={400}
        alt="loading"
      />
    </div>
  );
}
