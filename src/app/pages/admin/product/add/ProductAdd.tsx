"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Select } from "antd";
import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function ProductAdd() {
  const [variants, setVariants] = useState<any>([
    {
      property_ids: [],
      price: "",
      price_sale: "",
      colors: [
        {
          name: "",
          image: "",
          price_extra: "",
          quantity: "",
        },
      ],
    },
  ]);

  function handleAddVariant() {
    setVariants((prev: any) => [
      ...prev,
      {
        property_ids: [],
        price: "",
        price_sale: "",
        colors: [
          {
            name: "",
            image: "",
            price_extra: "",
            quantity: "",
          },
        ],
      },
    ]);
  }
  function handleAddColor(iVariant: number) {
    setVariants((prev: any) =>
      prev.map((item: any, index: number) => {
        if (index === iVariant) {
          console.log(item);
          return {
            ...item,
            colors: [
              ...item.colors,
              {
                name: "",
                image: "",
                price_extra: "",
                quantity: "",
              },
            ],
          };
        }
        return item;
      })
    );
  }

  return (
    <>
      <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
              Sửa Sản Phẩm
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên sản phẩm <span className="text-primary">*</span>
              </div>
              <Input
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Giá sản phẩm <span className="text-primary">*</span>
              </div>
              <Input
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Loại sản phẩm <span className="text-primary">*</span>
              </div>
              <Select
                className="shadow-md"
                defaultValue="Điện thoại"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: "Điện thoại", label: "Điện thoại" },
                  { value: "Laptop", label: "Laptop" },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center ">
            <p className="text-sm font-bold">
              Loại <span className="text-primary">*</span>
            </p>
            <div
              onClick={handleAddVariant}
              className="px-5 py-2 bg-green-100 rounded"
            >
              <p className="w-full text-sm font-bold text-green-800">
                Thêm loại
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {variants.map((variant: any, iVariant: number) => (
              <div key={iVariant} className="w-full flex flex-col gap-3">
                <div className="flex flex-col gap-2 px-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-[18px] h-[18px] bg-orange-400">
                      <GrFormNext className="text-white flex justify-center items-center" />
                    </div>
                    <div className="w-[18px] h-[18px] bg-red-600">
                      <IoIosClose className="text-white flex justify-center items-center" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      className="w-[268px] h-11 shadow-md"
                      placeholder="Nhập tên sản phẩm"
                    />
                    <Input
                      className="w-[268px] h-11 shadow-md"
                      placeholder="Nhập giá thêm"
                    />
                    <Input
                      className="w-[268px] h-11 shadow-md"
                      placeholder="Nhập giá giảm"
                    />
                  </div>
                </div>
                {/* color */}
                <div className="w-full px-3 flex flex-col gap-4">
                  <div className="flex gap-2 items-center ">
                    <p className="text-sm font-bold">Màu Sắc</p>
                    <div
                      onClick={() => handleAddColor(iVariant)}
                      className="px-5 py-2 bg-green-100 rounded"
                    >
                      <p className="w-full text-sm font-bold text-green-800">
                        Thêm màu
                      </p>
                    </div>
                  </div>
                  {variant.colors.map((color: any, iColor: number) => (
                    <div
                      key={iColor}
                      className="flex flex-col p-3 gap-2 border-t-2 border-primary"
                    >
                      <div className="flex flex-col gap-2  px-3">
                        <div className="flex gap-2">
                          <div className="w-[18px] h-[18px] bg-orange-400 flex justify-center items-center">
                            <GrFormNext className="text-white" />
                          </div>
                          <div className="w-[18px] h-[18px] bg-red-600">
                            <IoIosClose className="text-white flex justify-center items-center" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <Input
                            className="w-[268px] h-11 shadow-md"
                            placeholder="Nhập tên màu"
                          />
                          <Input
                            className="w-[268px] h-11 shadow-md"
                            placeholder="Nhập giá thêm"
                          />
                          <Input
                            className="w-[268px] h-11 shadow-md"
                            placeholder="Nhập số lượng"
                          />
                        </div>
                        <div className="flex gap-2.5 flex-col">
                          <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                            <div className="w-[106px] h-auto text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded">
                              Chọn tệp
                            </div>
                            <div className="w-full text-sm font-normal">
                              <span>1</span> Tệp
                            </div>
                          </div>
                          <div className="flex items-center flex-wrap gap-3">
                            <div className="w-20 h-20 relative">
                              <img
                                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                                alt=""
                              />
                              <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                                <IoCloseSharp />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-sm font-medium">
              Hình Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex gap-2.5 flex-col">
              <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                <div className="w-[106px] h-auto text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded">
                  Chọn tệp
                </div>
                <div className="w-full text-sm font-normal">
                  <span>1</span> Tệp
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <div className="w-20 h-20 relative">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                    alt=""
                  />
                  <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                    <IoCloseSharp />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button back="product/list" />
        </div>
      </div>
    </>
  );
}

export default ProductAdd;

//đã duyện
// "use client";
// import React, { useState } from "react";

// interface Color {
//   id: number;
//   image: File | null;
// }

// interface Category {
//   id: number;
//   colors: Color[];
//   visible: boolean;
// }

// const ProductAdd = () => {
//   const [categories, setCategories] = useState<Category[]>([]);

//   const addCategory = () => {
//     setCategories([...categories, { id: Date.now(), colors: [], visible: true }]);
//   };

//   const toggleCategory = (id: number) => {
//     setCategories(categories.map(cat => cat.id === id ? { ...cat, visible: !cat.visible } : cat));
//   };

//   const removeCategory = (id: number) => {
//     setCategories(categories.filter(cat => cat.id !== id));
//   };

//   const addColor = (categoryId: number) => {
//     setCategories(categories.map(cat =>
//       cat.id === categoryId
//         ? { ...cat, colors: [...cat.colors, { id: Date.now(), image: null }] }
//         : cat
//     ));
//   };

//   const removeColor = (categoryId: number, colorId: number) => {
//     setCategories(categories.map(cat =>
//       cat.id === categoryId
//         ? { ...cat, colors: cat.colors.filter(color => color.id !== colorId) }
//         : cat
//     ));
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold border-b pb-2 mb-4">Sửa Sản Phẩm</h2>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={addCategory}
//       >
//         Thêm Loại
//       </button>

//       {categories.map((category) => (
//         <div key={category.id} className="border p-4 mb-4 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-3">
//             <button className="text-blue-500" onClick={() => toggleCategory(category.id)}>
//               {category.visible ? "Ẩn" : "Hiện"}
//             </button>
//             <button
//               className="text-red-500"
//               onClick={() => removeCategory(category.id)}
//             >
//               Xóa
//             </button>
//           </div>
//           {category.visible && (
//             <>
//               <div className="mb-3 grid grid-cols-3 gap-3">
//                 <input className="border p-2 rounded" placeholder="Tên sản phẩm" />
//                 <input className="border p-2 rounded" placeholder="Giá thêm" />
//                 <input className="border p-2 rounded" placeholder="Giá giảm" />
//               </div>
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded mt-2"
//                 onClick={() => addColor(category.id)}
//               >
//                 Thêm Màu Sắc
//               </button>
//               {category.colors.map((color) => (
//                 <div key={color.id} className="border p-4 mt-3 rounded-lg shadow">
//                   <div className="flex justify-between items-center mb-3">
//                     <button
//                       className="text-red-500"
//                       onClick={() => removeColor(category.id, color.id)}
//                     >
//                       Xóa
//                     </button>
//                   </div>
//                   <div className="mb-3 grid grid-cols-3 gap-3">
//                     <input className="border p-2 rounded" placeholder="Tên màu" />
//                     <input className="border p-2 rounded" placeholder="Giá thêm" />
//                     <input className="border p-2 rounded" placeholder="Số lượng" />
//                   </div>
//                   <input type="file" className="border p-2 rounded w-full" />
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductAdd;
