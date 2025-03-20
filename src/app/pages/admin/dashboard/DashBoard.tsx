"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { FaBasketShopping, FaTicketSimple, FaUser } from "react-icons/fa6";
import { HiCash } from "react-icons/hi";
import { Bar } from "react-chartjs-2";
import * as orderServices from "@/app/services/orderService";
import * as userServices from "@/app/services/userService";
import * as voucherServices from "@/app/services/voucherService";
import * as statsServices from "@/app/services/statService";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Space, Table, TableProps } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function DashBoard() {
  const [getorders, setGetorders] = useState<IOrder[]>([]);
  const [vouchers, setVoucher] = useState()
  const [users, setUsers] = useState< IUser[] >([]);
  const [limit, setLimit] = useState(1000);
  const [totalorder, setTotalorder] = useState()
  const [stats, setStats] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
  const [totalprice, setTotalprice] = useState()

  useEffect(() => {
    const query: any = {};

    query.limit = limit;

    voucherServices.getQuery(query).then((res) => {
      setVoucher(res.total);  
    });
  }, []);
  console.log(vouchers);
  
  useEffect(() => {
    const query: any = {};

    query.limit = limit;

    userServices.getQuery(query).then((res) => {
      setUsers(res.data);
    });
  }, []);
  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    orderServices.getQuery(query).then((res) => {
      setGetorders(res.data);
      setTotalorder(res.total);
    });
  }, []);
  useEffect(() => {
    const query = {year : year};
    console.log(query);
    statsServices.getQuery(query).then((res) => {
      setStats(res.data);
      setTotalprice(res.data.totalPrice);
      const updatedChartData = Array.from({ length: 12 }, (_, index) => {
        return res.data[index + 1]?.price || 0;
      });
      setChartData(updatedChartData);
    });
  }, [year]);
  console.log(getorders);
  console.log(stats);
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh Thu",
        data: chartData,
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
  const ordercolumns: TableProps<IOrder>["columns"] = [
    {
      title: "ID Đơn Hàng",
      dataIndex: "id",
      key: "id",
      width: 150,
      align: "left",
      render: (id) => (
        <span className="line-clamp-1">{id.length > 10 ? `${id.slice(0,10)}...`: id}</span>
      )
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "user",
      key: "user",
      width: 200,
      align: "left",
      render: (user) => user.fullname,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      width: 150,
      align: "left",
      render: (total) => `${(+total).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Chức Năng",
      key: "action",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center">
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];
  const usercolumns: TableProps<IUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "left",
      render: (id) => (
        <span className="line-clamp-1">{id.length > 10 ? `${id.slice(0,10)}...`: id}</span>
      )
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "fullname",
      key: "fullname",
      width: 220,
      align: "left",
      render: (fullname) => (
        <span className="line-clamp-1">{fullname}</span>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      align: "left",
      render: (email) => (
        <span className="line-clamp-1">{email}</span>
      )
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
      width: 180,
      align: "left",
    },
  ];
  
  return (
    <>
      <TitleAdmin title="Bảng điều khiển" yearChange={(newYear: any)=>{setYear(newYear)}}/>
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-start flex-col gap-4">
        <div className="flex gap-4 justify-between w-full  max-w-full">
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <HiCash className="w-[60px] h-[60px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng doanh thu</p>
              <p className="text-base font-bold">{(totalprice??0).toLocaleString("vi-VN")} đ</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaUser className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">
                Tổng khách hàng
              </p>
              <p className="text-base font-bold">{Object.keys(users).length}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaTicketSimple className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng voucher</p>
              <p className="text-base font-bold">{vouchers}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaBasketShopping className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng đơn hàng</p>
              <p className="text-base font-bold">{totalorder}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
        </div>

        <div className="min-w-full p-64  bg-white flex flex-col gap-2.5 py-5 shadow-lg border rounded-xl">
          <h2 className="text-xl font-bold text-center mb-4">
            Doanh Thu Hàng Tháng
          </h2>
          <Bar data={data} options={options} />
        </div>
        <div className="flex w-full gap-4">
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
            <p className="text-xl font-bold">Đơn hàng chờ xác nhận</p>
            <div className="border border-zinc-300"></div>
            <div style={{ width: "100%", overflowY: "auto", maxWidth: "100%" }}>
          <Table<IOrder>
            columns={ordercolumns}
            dataSource={getorders.filter(order => order.status === 2)}
            rowKey="id"
            scroll={{ x: 500, y: 230 }} 
            pagination={false}
            tableLayout="auto"
          />
        </div>
          </div>
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
            <p className="text-xl font-bold">Khách hàng mới</p>
            <div className="border border-zinc-300"></div>
            <div style={{ width: "100%", overflowY: "auto", maxWidth: "100%" }}>
          <Table<IUser>
            columns={usercolumns}
            dataSource={users}
            rowKey="id"
            scroll={{ x: 500, y: 230 }} 
            pagination={false}
            tableLayout="auto"
          />
        </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
