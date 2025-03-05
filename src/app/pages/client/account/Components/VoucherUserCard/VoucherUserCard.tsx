import { SlTag } from "react-icons/sl";

function VoucherUserCard() {
    return (
        <>
            <div className="flex items-center gap-2 flex-wrap w-[956px]">
                <div className="flex items-end gap-5 p-2.5 border-gray-300 rounded-lg shadow-xl w-[474px]">
                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-primary rounded"><SlTag className="w-10 h-10 text-white" /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-base text-red-500 font-bold">Giảm 10.000 đ</div>
                        <div className="text-sm font-normal">Đơn Tối Thiểu 25.000 đ</div>
                        <div className="text-sm font-normal">HSD: 30/01/2025</div>
                        <div className="text-sm font-bold">Số Lượng : <span>5</span></div>
                    </div>
                </div>
                <div className="flex items-end gap-5 p-2.5 border-gray-300 rounded-lg shadow-xl w-[474px]">
                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-primary rounded"><SlTag className="w-10 h-10 text-white" /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-base text-red-500 font-bold">Giảm 10.000 đ</div>
                        <div className="text-sm font-normal">Đơn Tối Thiểu 25.000 đ</div>
                        <div className="text-sm font-normal">HSD: 30/01/2025</div>
                        <div className="text-sm font-bold">Số Lượng : <span>5</span></div>
                    </div>
                </div>
                <div className="flex items-end gap-5 p-2.5 border-gray-300 rounded-lg shadow-xl w-[474px]">
                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-primary rounded"><SlTag className="w-10 h-10 text-white" /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-base text-red-500 font-bold">Giảm 10.000 đ</div>
                        <div className="text-sm font-normal">Đơn Tối Thiểu 25.000 đ</div>
                        <div className="text-sm font-normal">HSD: 30/01/2025</div>
                        <div className="text-sm font-bold">Số Lượng : <span>5</span></div>
                    </div>
                </div>
                <div className="flex items-end gap-5 p-2.5 border-gray-300 rounded-lg shadow-xl w-[474px]">
                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-primary rounded"><SlTag className="w-10 h-10 text-white" /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-base text-red-500 font-bold">Giảm 10.000 đ</div>
                        <div className="text-sm font-normal">Đơn Tối Thiểu 25.000 đ</div>
                        <div className="text-sm font-normal">HSD: 30/01/2025</div>
                        <div className="text-sm font-bold">Số Lượng : <span>5</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VoucherUserCard;