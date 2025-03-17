import { BsCardImage } from "react-icons/bs";

function ProductLoad() {
  return (
    <div className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-2 ">
      <div className="relative center-flex bg-gray-200 rounded-lg shadow !w-full aspect-square overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                      w-full h-full animate-[shimmer_1.5s_infinite]"
        ></div>
        <BsCardImage className="!w-24 !h-24 text-gray-300 " />
      </div>
      <div className="relative bg-gray-200 rounded-lg shadow !w-full !h-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                      w-full h-full animate-[shimmer_1.5s_infinite]"
        ></div>
      </div>
      <div className="relative bg-gray-200 rounded-lg  shadow !w-full !h-7 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
        ></div>
      </div>
      <div className="relative bg-gray-200 rounded-lg  shadow !w-full !h-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                      w-full h-full animate-[shimmer_1.5s_infinite]"
        ></div>
      </div>
      <div className="relative bg-gray-200 rounded-lg  shadow !w-full !h-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
        ></div>
      </div>
    </div>
  );
}

export default ProductLoad;
