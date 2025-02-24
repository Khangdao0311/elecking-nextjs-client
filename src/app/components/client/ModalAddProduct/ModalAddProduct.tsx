import { HiCheckCircle } from "react-icons/hi";

function ModalAddProduct({ onClick }: any) {
  return (
    <div className="center-fixed flex flex-col gap-5 w-[519px] h-[228px] p-10 bg-white rounded-2xl z-50 items-center justify-center">
      <div>
        <HiCheckCircle className="w-24 h-24 fill-green-500 text-white" />
      </div>
      <div className="text-2xl font-bold">Sản phẩm đã được thêm vào giỏ hàng</div>
      <div></div>
    </div>
  );
}

export default ModalAddProduct;
