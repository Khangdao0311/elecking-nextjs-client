function Status(props: { status: number }) {
  switch (props.status) {
    case 1:
      return (
        <>
          <div className="px-5 py-2 rounded-lg bg-yellow-100">
            <p className="text-base font-medium text-yellow-800">
              Chờ Xác Nhận
            </p>
          </div>
          <div className="px-6 py-2.5 border border-red-500 rounded">
            <p className="text-red-500 text-sm font-bold">Hủy</p>
          </div>
        </>
      );
    case 2:
      return (
        <div className="px-5 py-2 rounded-lg bg-blue-100">
          <p className="text-base font-medium text-blue-800">Đang Giao Hàng</p>
        </div>
      );
    case 3:
      return (
        <>
          <div className="px-5 py-2 rounded-lg bg-green-100">
            <p className="text-base font-medium text-green-800">Đã Giao Hàng</p>
          </div>
          <div className="flex gap-2.5">
            <div className="px-6 py-2.5 bg-primary rounded">
              <p className="text-white text-sm font-bold">Mua lại</p>
            </div>
            <div className="px-6 py-2.5 bg-yellow-100 rounded">
              <p className="text-sm font-bold text-yellow-800 ">Đánh giá</p>
            </div>
          </div>
        </>
      );
    case 0:
      return (
        <>
          <div className="px-5 py-2 rounded-lg bg-red-100">
            <p className="text-base font-medium text-red-800">Đã Hủy</p>
          </div>
          <div className="px-6 py-2.5 bg-primary rounded">
            <p className="text-white text-sm font-bold">Mua lại</p>
          </div>
        </>
      );
  }
}

export default Status;
