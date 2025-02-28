"use client";

import { Select } from "antd";
import Voucher from "@/app/components/client/Voucher";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { LuTicket } from "react-icons/lu";
import * as addressServices from "@/app/services/address.service";
import { TfiLocationPin } from "react-icons/tfi";
import { FaCheckCircle } from "react-icons/fa";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Modal from "./modal";
import * as productServices from "@/app/services/product.service";
function Checkout() {
  var totalProducts = 0;
  const query = useSearchParams();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const [modal, setModal] = useState(false);
  const [editAddress, seteditAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState(false);
  const [payment, setPayment] = useState(false);
  const [checkPayment, setCheckPayment] = useState("");
  const [checkaddress1, setCheckaddress1] = useState("1");
  const [checkaddress2, setCheckaddress2] = useState("1");
  const [productCheckout, setProductCheckOut] = useState<any>([]);
  const [showVoucher, setVoucher] = useState(false);
  //Lấy địa chỉ address
  const [getaddress,setGetaddress] = useState([]);
  useEffect(() => {
    addressServices.getAll().then((res)=>setGetaddress(res));
  },[]);
  console.log(getaddress);
  

  const showAdress = () => setAddress(true);
  const showpayment = () => setPayment(true);
  const showEditAddress = () => {
    seteditAddress(true);
    setAddress(false);
  };
  const showNewAddress = () => {
    setNewAddress(true);
    setAddress(false);
  };
  const closeAddress = () => setAddress(false);
  const closepayment = () => setPayment(false);
  const closeEditAddress = () => {
    setAddress(true);
    seteditAddress(false);
  };
  const closeNewAddress = () => {
    setNewAddress(false);
    setAddress(true);
  };

  // Xét trang thái thanh toán có thành công hay không
  useEffect(() => {
    if (query.get("vnp_TransactionStatus")) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
      }, 1200);
    }
  }, [query]);

  function handleOrder() {
    const order = {
      order_id: "hjohgcfgvhjklkjhgf",
      total: "1000000",
      bankCode: "",
    };

    fetch("http://localhost:8000/checkout/create_payment_url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.paymentUrl) window.location.href = data.paymentUrl;
      })
      .catch((error) => console.error("Error:", error));
  }

  const Payments = [
    {
      id: "1",
      name: "Thanh Toán Khi Nhận Hàng",
      image:
        "https://bacsicayxanh.vn/images/info-policy/payment-policy/cod.png",
    },
    {
      id: "2",
      name: "VNPAY",
      image:
        "https://ee3v7pn43nm.exactdn.com/wp-content/uploads/2022/03/Vi-Vnpay.png?strip=all&lossy=1&ssl=1",
    },
  ];

  
  const abc = getaddress.find((a:any) => a.id === checkaddress1);

  const checkout = JSON.parse(localStorage.getItem("checkout")!);

  useEffect(() => {
    async function _() {
      const _: IProduct[] = [];
      if (checkout?.length) {
        for (const item of checkout) {
          await productServices.getProById(item.product_id).then((res) => {
            _.push(res);
          });
        }
      }
      setProductCheckOut(_);
    }
    _();
    
  }, []);

  // console.log(totalProducts);
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 p-4 flex flex-col gap-6">
      <div className=" bg-white shadow-xl rounded-2xl p-5 grid gap-y-4">
        <div className="flex gap-4 items-center">
          <TfiLocationPin className="w-10 h-10" />
          <p className="text-2xl font-bold text-primary">Địa chỉ nhận hàng</p>
        </div>
        <div className="flex items-center gap-10 w-full place-content-between">
          <div className="flex gap-6 items-center">
            <div className="flex gap-4 text-xl font-semibold">
              <p>{abc?.name}</p>
              <p>{abc?.phone}</p>
            </div>
            <p className="text-base font-normal w-[812px]">
              {abc?.description}, {abc?.ward}, {abc?.district}, {abc?.province}
            </p>
          </div>
          <p
            className="text-base font-semibold text-blue-500 p-2.5 gap-2.5 cursor-pointer"
            onClick={showAdress}
          >
            Thay đổi
          </p>
        </div>
      </div>
      <div className=" bg-white shadow-xl rounded-2xl p-5 grid gap-y-4">
        <div className="flex gap-2.5 pb-4 border-b-[1px] border-gray-300">
          <p className="w-[730px] text-base font-medium">Sản phẩm</p>
          <p className="w-[160px] text-center text-base font-medium">đơn giá</p>
          <p className="w-[160px] text-center text-base font-medium">
            Số lượng
          </p>
          <p className="w-[160px] text-center text-base font-medium">
            Thành tiền
          </p>
        </div>
      

        {productCheckout.map((product: any, index: number) => {
          totalProducts +=
            (product.price +
              product.variants[checkout[index].variant].price_extra -
              product.variants[checkout[index].variant].price_sale +
              product.variants[checkout[index].variant].colors[
                checkout[index].color
              ].price_extra) *
            checkout[index].quantity;
          return (
            <div key={index} className="flex gap-2.5 items-center">
              <div className="flex gap-2.5 items-center w-[730px]">
                <img
                  src={
                    product.variants[checkout[index].variant].colors[
                      checkout[index].color
                    ].image
                  }
                  alt="Ảnh"
                  className="w-24 h-24"
                />
                <p className="text-base font-medium">{`${
                  product.name
                } - ${product.variants[checkout[index].variant].properties.join(
                  " - "
                )} - ${
                  product.variants[checkout[index].variant].colors[
                    checkout[index].color
                  ].name
                }`}</p>
              </div>
              <div className="text-center w-[160px] ">
                <p className="text-base font-medium text-primary">
                  {(
                    product.price +
                    product.variants[checkout[index].variant].price_extra -
                    product.variants[checkout[index].variant].price_sale +
                    product.variants[checkout[index].variant].colors[
                      checkout[index].color
                    ].price_extra
                  ).toLocaleString("vi", "VN")}
                </p>
              </div>
              <p className="text-base font-normal w-[160px] text-center">
                {checkout[index].quantity}
              </p>
              <p className="text-base font-bold text-primary w-[160px] text-center">
                {(
                  (product.price +
                    product.variants[checkout[index].variant].price_extra -
                    product.variants[checkout[index].variant].price_sale +
                    product.variants[checkout[index].variant].colors[
                      checkout[index].color
                    ].price_extra) *
                  checkout[index].quantity
                ).toLocaleString("vi-VN")}
              </p>
            </div>
          );
        })}

      </div>
      <div className=" bg-white shadow-xl rounded-2xl p-5 grid gap-y-4">
        <p className="text-xl font-bold w-full ">Lời nhắn</p>
        <div>
          <TextArea
            placeholder="Lưu ý cho cửa hàng ..."
            className="h-[64px]"
          ></TextArea>
        </div>
      </div>
      <div className=" bg-white shadow-xl rounded-2xl p-5 grid gap-y-4">
        <p className="text-xl font-bold w-full">Phương Thức Thanh Toán</p>
        <div
          className="flex place-content-between border-gray-300 border px-12 py-5 items-center rounded-lg cursor-pointer"
          onClick={showpayment}
        >
          <div className="flex gap-6 items-center">
            <img
              src="https://www.shutterstock.com/image-vector/credit-card-cartoon-vector-illustration-600nw-2472976831.jpg"
              alt="payment"
              className="w-24 h-24"
            />
            <p className="text-2xl font-bold text-primary">
              Chọn phương thức thanh toán
            </p>
          </div>
          <FaChevronRight className="w-[30px] h-[30px] " />
        </div>
      </div>
      <div className=" bg-white shadow-xl rounded-2xl p-5 grid">
        <div className="flex items-center place-content-between px-5 py-2.5">
          <div className="flex items-center gap-2">
            <LuTicket className="w-8 h-8" />
            <p className="text-lg font-normal">ElecKing Voucher</p>
          </div>
          <p
            className="text-lg font-bold text-blue-600 cursor-pointer"
            onClick={() => setVoucher(showVoucher ? false : true)}
          >
            Chọn mã
          </p>
        </div>
        <div className="flex justify-end gap-32 py-4 border-y border-gray-300 border-dashed">
          <div className="flex flex-col gap-7">
            <p className="text-lg font-normal">Tổng tiền hàng</p>
            <p className="text-lg font-normal">Vận chuyển</p>
            <p className="text-lg font-normal">Voucher</p>
            <p className="text-2xl font-medium">Tổng số tiền</p>
          </div>
          <div className="flex flex-col gap-7 text-end">
            <p className="text-lg font-normal">{totalProducts.toLocaleString("vi-VN")} đ</p>
            <p className="text-lg font-normal">2.200.000 đ</p>
            <p className="text-lg font-normal">100.000 đ</p>
            <p className="text-2xl font-bold text-primary">32.690.000 đ</p>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <p className="text-base font-normal">
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
            <span className="text-base font-bold">Điều khoản Elecking</span>
          </p>

          <button onClick={handleOrder}>
            <p className="bg-primary py-4 px-24 text-white text-2xl font-bold rounded-lg">
              Đặt hàng
            </p>
          </button>
        </div>
      </div>

      {address && (
        <>
          <div className="bg-white center-fixed w-[524px] flex-col gap-5 rounded-lg shadow-xl z-50">
            <div className="px-5 flex text-justify items-center h-20">
              <p className="text-xl font-semibold">Địa chỉ của tôi</p>
            </div>
            <div className="p-4 h-[500px] flex items-start flex-col gap-4 border border-y border-gray-200 ">
              {getaddress.map((address:any, i:number) => (
                <div
                  key={i}
                  className="flex w-full p-4 gap-4 shadow-md border border-gray-200 rounded-lg"
                  onClick={() => {
                    setCheckaddress2(address.id);
                  }}
                >
                  <input
                    type="radio"
                    className="accent-primary w-5 h-5"
                    readOnly
                    checked={address.id == checkaddress2}
                  />
                  <div className="flex flex-col w-full items-start gap-2.5">
                    <div className="flex justify-between w-full">
                      <div className="flex gap-5">
                        <p className="text-base font-medium">{address.fullname}</p>
                        <p className="text-base font-normal">{address.phone}</p>
                      </div>
                      <p
                        className="tetx-sm font-semibold text-blue-500 cursor-pointer"
                        onClick={showEditAddress}
                      >
                        Cập nhật
                      </p>
                    </div>
                    <p>{address.description}</p>
                    <p>
                      {address.ward}, {address.district}, {address.province}
                    </p>
                    <p className="text-primary text-xs font-normal border border-primary rounded-sm px-1 ">
                      Mặc định
                    </p>
                  </div>
                </div>
              ))}

              <div
                className="flex cursor-pointer  gap-2 px-6 py-3 items-center shadow-md border border-gray-200 rounded-lg"
                onClick={showNewAddress}
              >
                <FaPlus className="w-5 h-5" />
                <p className="text-sm font-medium">Thêm Địa Chỉ Mới</p>
              </div>
            </div>
            <div className="flex gap-4 justify-end p-4">
              <p
                className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
                onClick={() => {
                  setCheckaddress2(checkaddress1);
                  closeAddress();
                }}
              >
                Trở lại
              </p>
              <p
                onClick={() => {
                  setCheckaddress1(checkaddress2);
                  closeAddress();
                }}
                className="px-5 bg-primary py-2 rounded-lg text-white"
              >
                Hoàn thành
              </p>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
      {newAddress && (
        <>
          <div className="bg-white center-fixed w-[524px] flex-col gap-5 rounded-lg shadow-xl z-50">
            <div className="px-5 flex text-justify items-center h-20">
              <p className="text-xl font-semibold">Địa Chỉ Mới</p>
            </div>
            <div className="p-4 flex flex-col gap-4 border border-y border-y-gray-200">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="border border-gray-200 p-2.5 rounded w-[238px]"
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="border border-gray-200 p-2.5 rounded w-[238px]"
                />
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full"
                    showSearch
                    placeholder="Tỉnh/Thành phố"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full !text-sm font-normal"
                    showSearch
                    placeholder="Quận/Huyện"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full"
                    showSearch
                    placeholder="Phường/Xã"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
              </div>
              <textarea
                placeholder="Địa chỉ cụ thể"
                id=""
                className="border border-gray-200 p-2.5 rounded w-[492px]"
              ></textarea>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-normal">Loại địa chỉ</p>
                <div className="flex gap-2">
                  <p className="text-sm font-normal border border-gray-200 px-3 py-2.5 rounded">
                    Nhà Riêng
                  </p>
                  <p className="text-sm font-normal border border-gray-200 px-3 py-2.5 rounded">
                    Văn Phòng
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm font-normal text-gray-500">
                  Đặt làm địa chỉ mặc định
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-end p-4">
              <p
                className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
                onClick={closeNewAddress}
              >
                Trở lại
              </p>
              <p className="px-5 bg-primary py-2 rounded-lg text-white">
                Hoàn thành
              </p>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
      {editAddress && (
        <>
          <div className="bg-white center-fixed w-[524px] flex-col gap-5 rounded-lg shadow-xl z-50">
            <div className="px-5 flex text-justify items-center h-20">
              <p className="text-xl font-semibold">Cập Nhật Địa Chỉ</p>
            </div>
            <div className="p-4 flex flex-col gap-4 border border-y border-y-gray-200">
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="border border-gray-200 p-2.5 rounded w-[238px]"
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="border border-gray-200 p-2.5 rounded w-[238px]"
                />
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full"
                    showSearch
                    placeholder="Tỉnh/Thành phố"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full !text-sm font-normal"
                    showSearch
                    placeholder="Quận/Huyện"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                <div className="h-10 w-full !text-sm font-normal">
                  <Select
                    className="w-full h-full"
                    showSearch
                    placeholder="Phường/Xã"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack97",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
              </div>
              <textarea
                placeholder="Địa chỉ cụ thể"
                id=""
                className="border border-gray-200 p-2.5 rounded w-[492px]"
              ></textarea>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-normal">Loại địa chỉ</p>
                <div className="flex gap-2">
                  <p className="text-sm font-normal border border-gray-200 px-3 py-2.5 rounded">
                    Nhà Riêng
                  </p>
                  <p className="text-sm font-normal border border-gray-200 px-3 py-2.5 rounded">
                    Văn Phòng
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm font-normal text-gray-500">
                  Đặt làm địa chỉ mặc định
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-end p-4">
              <p
                className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
                onClick={closeEditAddress}
              >
                Trở lại
              </p>
              <p className="px-5 bg-primary py-2 rounded-lg text-white">
                Hoàn thành
              </p>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
      {modal &&
        (query.get("vnp_TransactionStatus") == "00" ? (
          <Modal status="success" content="Đặt hàng thành công" />
        ) : (
          <Modal status="erorr" content="Đặt hàng Thất Bại" />
        ))}
      {payment && (
        <>
          <div className="bg-white center-fixed w-[524px] flex-col gap-5 rounded-lg shadow-xl z-50">
            <p className="text-xl font-semibold px-5 h-20 flex items-center">
              Chọn Phương Thức Thanh Toán
            </p>
            <div className="p-4 border-y border-gray-200 flex flex-col gap-4 h-[500px]">
              {Payments.map((payment, i) => (
                <div
                  onClick={() => {
                    setCheckPayment(payment.id);
                  }}
                  className="flex justify-between border border-gray-300 rounded-lg p-5 cursor-pointer"
                  key={i}
                >
                  <div className="flex gap-4 items-center">
                    <img src={payment.image} alt="" className="w-16 h-16" />
                    <p className="text-xl font-medium">{payment.name}</p>
                  </div>
                  <input
                    className="w-5 h-5 accent-primary"
                    type="radio"
                    readOnly
                    checked={payment.id == checkPayment}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end p-4">
              <p
                className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
                onClick={closepayment}
              >
                Hủy
              </p>
              <p className="px-5 bg-primary py-2 rounded-lg text-white">
                Xác nhận
              </p>
            </div>
          </div>

          <div className="overlay" onClick={() => console.log("ada")}></div>
        </>
      )}
      {showVoucher && (
        <>
          <Voucher onClick={() => setVoucher(false)} />
          <div className="overlay"></div>
        </>
      )}
    </div>
  );
}

export default Checkout;
