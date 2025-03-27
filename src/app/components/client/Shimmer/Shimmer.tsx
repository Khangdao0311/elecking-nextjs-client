import { BsCardImage } from "react-icons/bs";

function Shimmer({ className, image = false}: any) {
  return (
    <div
      className={`relative center-flex bg-gray-200 rounded-lg shadow overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full animate-[shimmer_1.5s_infinite]"></div>
      {image && <BsCardImage className="!h-1/2 w-auto max-w-[60%] aspect-square text-gray-300 " />}
    </div>
  );
}

export default Shimmer;
