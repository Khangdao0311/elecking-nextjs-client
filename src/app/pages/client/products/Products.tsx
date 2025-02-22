"use client";

import Product from "@/app/components/client/Product";
import { Pagination } from "antd";
import { useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaMinus, FaMoneyBill } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import {
  IoCloseCircle,
  IoCloseOutline,
} from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

function Products() {
  const [activePopup, setActivePopup] = useState("");
  const togglePopup = (popupName: string) => {
    setActivePopup(activePopup === popupName ? "" : popupName);
  };
  const [isCheckedPrice, setCheckedPrice] = useState(false);
  const [isCheckedCategory, setCheckedCategory] = useState(false);
  const isAllChecked = isCheckedPrice && isCheckedCategory;
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (buttonName: any) => {
    if (selectedButton === buttonName) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonName);
    }
  };
  const category = ["Điện Thoại", "Máy Tính Bảng", "Laptop", "Tai Nghe", "Loa", "Màn Hình", "TiVi", "Đồng Hồ Thông Minh", "Đồ Gia Dụng"]
  const brand = ["Apple", "Samsung", "Oppo", "Asus", "Acer", "Lenovo"]
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedBrand, setCheckedBrand] = useState<string[]>([]);
  const handleCategoryClick = (category: string) => {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) // Bỏ chọn nếu đã có
        : [...prev, category] // Thêm nếu chưa có
    );
  };

  const handleBrandClick = (brand: string) => {
    setCheckedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand) // Bỏ chọn nếu đã có
        : [...prev, brand] // Thêm nếu chưa có
    );
  };






  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      {/* Lọc sản phẩm */}
      <section className="flex flex-col gap-4 py-4">

        <div className="flex flex-col gap-3.5">
          <h3 className="text-xl font-bold">Chọn theo tiêu chí</h3>
          <div className="flex gap-4">

            {/* Giá */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-2 relative border ${activePopup === "price" ? "border-red-500 bg-red-50" : "border-black bg-white"
                } rounded-lg cursor-pointer`}

            >
              <p onClick={() => togglePopup("price")} className={`text-base ${activePopup === "price" ? "text-red-500" : "text-black"}`}>Giá</p>
              <FaMoneyBill className={`w-6 h-6 ${activePopup === "price" ? "text-red-500" : "text-black"}`} />

              {activePopup === "price" && (
                <div className="absolute left-0 bottom-0 translate-y-[calc(100%+10px)] bg-white p-4 rounded-2xl border border-gray-300 flex flex-col items-center gap-4">
                  <div className="w-[416px] flex items-center justify-between">
                    <input type="text" placeholder="Từ" className="border w-36 h-11 px-3 py-2 rounded-md" />
                    <FaMinus className="text-gray-500" />
                    <input type="text" placeholder="Đến" className="border w-36 h-11 px-3 py-2 rounded-md" />
                  </div>
                  <div className="flex gap-4 w-full">
                    <button className="border w-full border-red-500 text-red-500 px-4 py-2 rounded-md" onClick={() => setActivePopup("")}>Đóng</button>
                    <button className="bg-red-500 w-full text-white px-4 py-2 rounded-md">Xem kết quả</button>
                  </div>
                </div>
              )}
            </div>

            {/* Danh mục */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-2 relative border ${activePopup === "category" ? "border-red-500 bg-red-50" : "border-black bg-white"
                } rounded-lg cursor-pointer`}

            >
              <p onClick={() => togglePopup("category")} className={`text-base ${activePopup === "category" ? "text-red-500" : "text-black"}`}>Danh mục</p>
              <IoMdArrowDropdown className={`w-6 h-6 ${activePopup === "category" ? "text-red-500" : "text-black"}`} />

              {activePopup === "category" && (
                <div className="absolute left-0 bottom-0 translate-y-[calc(100%+10px)] bg-white p-4 rounded-2xl border border-gray-300 flex flex-col items-center gap-4">
                  <div className="w-[416px] flex flex-wrap gap-2">
                    {category.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleCategoryClick(item)}
                        className={`px-4 py-2 border rounded-lg cursor-pointer relative ${checkedCategories.includes(item) ? "border-red-500 bg-red-50" : "border-black bg-white"
                          }`}
                      >
                        {item}
                        {checkedCategories.includes(item) && (
                          <div className="absolute top-0 left-0 w-5 h-3 bg-red-500 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                            <IoMdCheckmark className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 w-full">
                    <button className="border w-full border-red-500 text-red-500 px-4 py-2 rounded-md" onClick={() => setActivePopup("")}>Đóng</button>
                    <button className="bg-red-500 w-full text-white px-4 py-2 rounded-md">Xem kết quả</button>
                  </div>
                </div>
              )}
            </div>

            {/* Thương hiệu */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-2 relative border ${activePopup === "brand" ? "border-red-500 bg-red-50" : "border-black bg-white"
                } rounded-lg cursor-pointer`}

            >
              <p onClick={() => togglePopup("brand")} className={`text-base ${activePopup === "brand" ? "text-red-500" : "text-black"}`}>Thương hiệu</p>
              <IoMdArrowDropdown className={`w-6 h-6 ${activePopup === "brand" ? "text-red-500" : "text-black"}`} />

              {activePopup === "brand" && (
                <div className="absolute left-0 bottom-0 translate-y-[calc(100%+10px)] bg-white p-4 rounded-2xl border border-gray-300 flex flex-col items-center gap-4">
                  <div className="w-[416px] flex flex-wrap gap-2">
                    {brand.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleBrandClick(item)}
                        className={`px-4 py-2 border rounded-lg cursor-pointer relative ${checkedBrand.includes(item) ? "border-red-500 bg-red-50" : "border-black bg-white"
                          }`}
                      >
                        {item}
                        {checkedBrand.includes(item) && (
                          <div className="absolute top-0 left-0 w-5 h-3 bg-red-500 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                            <IoMdCheckmark className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 w-full">
                    <button className="border w-full border-red-500 text-red-500 px-4 py-2 rounded-md" onClick={() => setActivePopup("")}>Đóng</button>
                    <button className="bg-red-500 w-full text-white px-4 py-2 rounded-md">Xem kết quả</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {!isAllChecked && (
          <div className="flex flex-col gap-3.5">
            <h3 className="text-xl font-bold">Đang lọc theo</h3>
            <div className="flex gap-4">
              {/* Giá */}
              {!isCheckedPrice && (
                <div className="flex items-center gap-1.5 px-2.5 py-2 border border-red-500 bg-red-50 rounded-lg">
                  <IoCloseCircle
                    onClick={() => setCheckedPrice(true)}
                    className="w-6 h-6 text-red-500 cursor-pointer"
                  />
                  <p className="text-base text-red-500">
                    Giá: <span className="inline">100.000 đ</span> -{" "}
                    <span className="inline">500.000 đ</span>
                  </p>
                </div>
              )}

              {/* Danh mục */}
              {!isCheckedCategory && (
                <div className="flex items-center gap-1.5 px-2.5 py-2 border border-red-500 bg-red-50 rounded-lg">
                  <IoCloseCircle
                    onClick={() => setCheckedCategory(true)}
                    className="w-6 h-6 text-red-500 cursor-pointer"
                  />
                  <p className="text-base text-red-500">
                    Danh mục: <span className="inline">Điện thoại</span>,{" "}
                    <span className="inline">Tablet</span>
                  </p>
                </div>
              )}

              {/* Bỏ chọn tất cả */}
              <div
                onClick={() => {
                  setCheckedPrice(true);
                  setCheckedCategory(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-2 cursor-pointer border border-red-500 bg-red-50 rounded-lg"
              >
                <IoCloseOutline className="w-6 h-6 text-red-500" />
                <p className="text-base text-red-500">Bỏ chọn tất cả</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3.5">
          <h3 className="text-xl font-bold">Sắp xếp theo</h3>
          <div className="flex gap-4">
            {/* Giá cao - Thấp */}
            <div
              onClick={() => handleButtonClick("highToLow")}
              className={`flex items-center gap-1.5 px-2.5 py-2 border rounded-lg cursor-pointer ${selectedButton === "highToLow"
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-black bg-white text-black"
                }`}
            >
              <BsSortDown
                className={`w-6 h-6 ${selectedButton === "highToLow" ? "text-red-500" : "text-black"
                  }`}
              />
              <p>
                Giá: <span className="inline">Giá cao</span> -{" "}
                <span className="inline">Thấp</span>
              </p>
            </div>

            {/* Giá thấp - Cao */}
            <div
              onClick={() => handleButtonClick("lowToHigh")}
              className={`flex items-center gap-1.5 px-2.5 py-2 border rounded-lg cursor-pointer ${selectedButton === "lowToHigh"
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-black bg-white text-black"
                }`}
            >
              <BsSortDownAlt
                className={`w-6 h-6 ${selectedButton === "lowToHigh" ? "text-red-500" : "text-black"
                  }`}
              />
              <p>
                Giá: <span className="inline">Giá thấp</span> -{" "}
                <span className="inline">Cao</span>
              </p>
            </div>

            {/* Khuyến mãi */}
            <div
              onClick={() => handleButtonClick("promotion")}
              className={`flex items-center gap-1.5 px-2.5 py-2 border rounded-lg cursor-pointer ${selectedButton === "promotion"
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-black bg-white text-black"
                }`}
            >
              <AiOutlinePercentage
                className={`w-6 h-6 ${selectedButton === "promotion" ? "text-red-500" : "text-black"
                  }`}
              />
              <p>Khuyến mãi</p>
            </div>

            {/* Xem nhiều */}
            <div
              onClick={() => handleButtonClick("viewCount")}
              className={`flex items-center gap-1.5 px-2.5 py-2 border rounded-lg cursor-pointer ${selectedButton === "viewCount"
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-black bg-white text-black"
                }`}
            >
              <MdRemoveRedEye
                className={`w-6 h-6 ${selectedButton === "viewCount" ? "text-red-500" : "text-black"
                  }`}
              />
              <p>Xem nhiều</p>
            </div>
          </div>
        </div>
      </section>

      {/* Show sản phẩm */}
      <section className="py-4">
        <div className="grid grid-cols-5 gap-2.5 flex-wrap">
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
        </div>
        <div className="flex items-center justify-center  mt-4">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>
    </div>
  );
}

export default Products;
