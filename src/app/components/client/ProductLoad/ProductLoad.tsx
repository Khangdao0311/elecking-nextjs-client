import Shimmer from "@/app/components/client/Shimmer";

function ProductLoad() {
  return (
    <div className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-2 ">
      <Shimmer className="!w-full aspect-square" image />
      <Shimmer className="!w-full !h-12" />
      <Shimmer className="!w-full !h-7" />
      <Shimmer className="!w-full !h-6" />
      <Shimmer className="!w-full !h-6" />
    </div>
  );
}

export default ProductLoad;
