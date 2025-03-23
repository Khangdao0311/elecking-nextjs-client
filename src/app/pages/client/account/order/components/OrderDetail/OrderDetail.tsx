function OrderDetail(props: { order: IOrder | null }) {
  return (
    <div className="flex flex-col gap-4 w-[600px] ">
      <h2 className="text-xl font-bold uppercase">CHI TIẾT ĐƠN HÀNG</h2>
      <div>
        <p>Địa chỉ: </p>
      </div>
      <div className="flex flex-col w-full h-[500px] gap-2">
        {props.order?.products.map((item, index) => (
          <div
            key={index}
            className="flex w-full gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300"
          >
            <div className="w-20 h-20 rounded-lg">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <p className="text-base font-medium text-black">{item.product.name}</p>
              <p className="text-base font-medium text-black">Số Lượng: {item.quantity}</p>
              <p className="text-base font-bold text-red-500">
                {item.product.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetail;
