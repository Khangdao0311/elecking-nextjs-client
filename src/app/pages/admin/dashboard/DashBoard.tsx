"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { FaBasketShopping, FaTicketSimple, FaUser } from "react-icons/fa6";
import { HiCash } from "react-icons/hi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { FiEdit } from "react-icons/fi";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6","Tháng 12"],
  datasets: [
    {
      label: "Doanh Thu",
      data: [4000, 3000, 5000, 7000, 6000, 8000, 12000],
      backgroundColor: "#4F46E5",
      borderRadius: 6,
    },
  ],
};
const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};
function DashBoard() {
  const orders = [
    { id: "AL3947", customer: "Phạm Thị Ngọc", total: "19.770.000 đ" },
    { id: "ER3835", customer: "Nguyễn Thị Mỹ Y...", total: "19.770.000 đ" },
    { id: "MD0837", customer: "Triệu Thanh Phú", total: "19.770.000 đ" },
    { id: "MT9835", customer: "Đặng Hoàng Phúc", total: "19.770.000 đ" },
    { id: "MT9835", customer: "Nguyễn Đặng H...", total: "19.770.000 đ" },
    { id: "MD0837", customer: "Nguyễn Đặng N...", total: "19.770.000 đ" },
    { id: "ER3835", customer: "Nguyễn Đặng H...", total: "19.770.000 đ" },
    { id: "AL3947", customer: "Nguyễn Đặng H...", total: "19.770.000 đ" },
  ];
  const users = [
    { id: "AL3947", customer: "Phạm Thị Ngọc", email: "Khang@gmail.com", phone : "031665884" },
    { id: "ER3835", customer: "Nguyễn Thị Mỹ Y...", email: "Khang@gmail.com", phone : "031665884" },
    { id: "MD0837", customer: "Triệu Thanh Phú", email: "Khang@gmail.com", phone : "031665884" },
    { id: "MT9835", customer: "Đặng Hoàng Phúc", email: "Khang@gmail.com", phone : "031665884" },
    { id: "MT9835", customer: "Nguyễn Đặng H...", email: "Khang@gmail.com", phone : "031665884" },
    { id: "MD0837", customer: "Nguyễn Đặng N...", email: "Khang@gmail.com", phone : "031665884" },
    { id: "ER3835", customer: "Nguyễn Đặng H...", email: "Khang@gmail.com", phone : "031665884" },
    { id: "AL3947", customer: "Nguyễn Đặng H...", email: "Khang@gmail.com", phone : "031665884" },
  ];
  return (
    <>
      <TitleAdmin title="Bảng điều khiển" />
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-start flex-col gap-4">
        <div className="flex gap-4 justify-between w-full  max-w-full">
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[160px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <HiCash className="w-[60px] h-[60px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng doanh thu</p>
              <p className="text-base font-bold">2.100.000 đ</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[160px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaUser className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">
                Tổng khách hàng
              </p>
              <p className="text-base font-bold">56</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[160px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaTicketSimple className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng voucher</p>
              <p className="text-base font-bold">18</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[160px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaBasketShopping className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng đơn hàng</p>
              <p className="text-base font-bold">227</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
        </div>

        <div className="min-w-full max-w-2xl px-60 bg-white flex flex-col gap-2.5 py-5 shadow-lg border rounded-xl">
          <h2 className="text-xl font-bold text-center mb-4">
            Doanh Thu Hàng Tháng
          </h2>
          <Bar data={data} options={options} />
        </div>
        <div className="flex w-full gap-4">
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg overflow-scroll">
            <p className="text-xl font-bold">Đơn hàng chờ xử lý</p>
            <div className="border border-zinc-300"></div>

            <table className="w-ful">
              <thead className="bg-stone-100 text-sm font-normal text-left">
                <tr>
                  <th className="px-2 py-2.5">ID Đơn Hàng</th>
                  <th className="px-2 py-2.5">Tên Khách Hàng</th>
                  <th className="px-2 py-2.5">Tổng Tiền</th>
                  <th className="px-2 py-2.5 min-w-24 text-center">
                    Trạng Thái
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="text-sm font-normal even:bg-gray-100"
                  >
                    <td className="px-2 py-2.5">{order.id}</td>
                    <td className="px-2 py-2.5">{order.customer}</td>
                    <td className="px-2 py-2.5">{order.total}</td>
                    <td className="px-2 py-2.5 w-[96px] max-w-[96px] text-center">
                      <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800">
                        <FiEdit className="w-5 h-5 text-center" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg overflow-scroll">
            <p className="text-xl font-bold">Khách hàng mới</p>
            <div className="border border-zinc-300"></div>

            <table className="w-ful">
              <thead className="bg-stone-100 text-sm font-normal text-left">
                <tr>
                  <th className="px-2 py-2.5">ID</th>
                  <th className="px-2 py-2.5">Tên Khách Hàng</th>
                  <th className="px-2 py-2.5">Email</th>
                  <th className="px-2 py-2.5">Số Điện Thoại</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="text-sm font-normal even:bg-gray-100"
                  >
                    <td className="px-2 py-2.5">{user.id}</td>
                    <td className="px-2 py-2.5">{user.customer}</td>
                    <td className="px-2 py-2.5">{user.email}</td>
                    <td className="px-2 py-2.5">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
