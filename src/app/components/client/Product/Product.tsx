import { FaRegHeart, FaRegStar } from "react-icons/fa6";

function Product({type}: any) {
  return (
    <div className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-2.5">
      <div className="w-full aspect-square">
        <img
          className="w-full h-full object-contain"
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_2__3.png"
          alt=""
        />
      </div>
      <div className="text-base w-full line-clamp-2 font-medium">
        Samsung Galaxy S25 Ultra 12GB 256GB
      </div>
      <div className={`text-red-500 ${type == 4 ? "text-2xl" : "text-xl"} font-bold`}>32.990.000 đ</div>
      <div className="flex gap-2.5">
        <del className={`text-gray-400 ${type == 4 ? "text-lg" : "text-base"} font-normal`}>34.990.000 đ</del>
        <div className="bg-primary text-white px-1.5 py-1 rounded-md text-xs font-bold">-6%</div>
      </div>
      <div className="flex justify-between w-full">
        <div className= "center-flex justify-start">
          <FaRegStar width={18} height={18} />
          <FaRegStar width={18} height={18} />
          <FaRegStar width={18} height={18} />
          <FaRegStar width={18} height={18} />
          <FaRegStar width={18} height={18} />
        </div>
        <div className="center-flex gap-1">
          <p className={`${type == 4 ? "text-sm" : "text-xs"}`}>Yêu thích</p>
          <FaRegHeart className={`${type == 4 ? "w-6 h-6" : "w-4.5 h-4.5"}`} />
        </div>
      </div>
    </div>
  );
}

export default Product;
