"use client";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function ModalOrderStatus(props: { status: string; content: string }) {
  return (
    <>
      <div className="w-[500px] bg-white center-fixed flex-col gap-5 rounded-2xl z-50">
        <div className="bg-white flex flex-col gap-5 rounded-lg py-10 px-20 items-center shadow-xl">
          {props.status == "success" ? (
            <FaCircleCheck className="w-36 h-36 text-green-500" />
          ) : (
            <FaCircleXmark className="w-36 h-36 text-red-500" />
          )}
          <p className="text-2xl font-bold">{props.content}</p>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default ModalOrderStatus;
