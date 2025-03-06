import Status from "../Status";

function OrderStatus(props: {status:number}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300">
      <div className="w-[120px] h-[120px] rounded-lg">
        <img
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <p className="text-base font-medium text-black">iPhone 16 Pro Max | Chính hãng VN/A - 256 GB - Titan Sac Mạc</p>
        <p className="text-base font-medium text-black">Số Lượng: 1</p>
        <p className="text-base font-bold text-red-500">32.790.000 đ</p>
        <div className="flex justify-between">
           <Status status={props.status}/>
            
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
