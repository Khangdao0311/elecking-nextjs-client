"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Select, Upload } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { GrFormNext } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import * as categoryServices from "@/app/services/categoryService";
import * as propertyServices from "@/app/services/propertyService";
import * as productServices from "@/app/services/productService";
import * as uploadServices from "@/app/services/uploadService";
import * as brandServices from "@/app/services/brandService";
import "quill/dist/quill.snow.css";
import Quill from "quill";

function ProductAdd() {
  const [imagescolor, setImagescolor] = useState<UploadFile[]>([]);
  const quillRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [name, setName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [variants, setVariants] = useState<any>([]);
  const [expandedVariants, setExpandedVariants] = useState<boolean[]>([true]);
  const [expandedColors, setExpandedColors] = useState<boolean[]>([true]);
  const [selectedcategory, setSelectedcategory] = useState<ICategory | null>(
    null
  );
  const [selectedbrand, setSelectedbrand] = useState<IBrand | null>(null);
  const [properties, setProperties] = useState<any>({});
  const [storageimgcolor, setStorageimgcolor] = useState<File[]>([]);
  const [storageidcategory, setStorageidcategory] = useState<number | null>(
    null
  );
  const { id }: any = useParams();
  useEffect(() => {
    productServices.getProById(`${id}`).then((res) => {
      console.log("Variants từ API:", res.data.variants); // ✅ Debug
      const formattedVariants = res.data.variants.map((variant: any) => ({
        ...variant,
        colors: variant.colors.map((color: any, index: number) => ({
          ...color,
          image: color.image
            ? {
                uid: crypto.randomUUID(),
                name: `color_${index + 1}.png`,
                status: "done",
                url: color.image,
              }
            : null,
        })),
      }));
      setVariants(formattedVariants);
    });
  }, [id]);

  useEffect(() => {
    console.log("Danh sách variants cập nhật:", variants);
  }, [variants]);
  
  

  useEffect(() => {
    if (!quillRef.current || !editorContent) return;

    if (quillRef.current.querySelector(".ql-editor")) return;

    const quillInstance = new Quill(quillRef.current, {
      theme: "snow",
    });

    quillInstance.root.innerHTML = editorContent;

    quillInstance.on("text-change", () => {
      setEditorContent(quillInstance.root.innerHTML);
    });
  }, [editorContent]);

  useEffect(() => {
    async function _() {
      if (selectedcategory) {
        const _: any = [];
        const __: any = [];
        for (const item of selectedcategory.proptypes) {
          await propertyServices
            .getQuery({ proptype_id: item.id })
            .then((res: any) => {
              _[item.name] = [{ id: "", name: `${item.name}` }, ...res.data];
              __.push("");
            });
        }
        setProperties(_);
        setVariants([
          {
            property_ids: __,
            price: "",
            price_sale: "",
            colors: [
              {
                name: "",
                image: "",
                price_extra: "",
                quantity: "",
                status: 1,
              },
            ],
          },
        ]);
      }
    }
    _();
  }, [selectedcategory]);

  const beforeUploadcolor = (file: File, iVariant: number, iColor: number) => {
    setVariants((prev: IProductVariant[]) =>
      prev.map((variant, i) => {
        if (i === iVariant) {
          return {
            ...variant,
            colors: variant.colors.map((color, j) => {
              if (j === iColor) {
                return {
                  ...color,
                  image: {
                    name: file.name,
                    originFileObj: file,
                  },
                };
              }
              return color;
            }),
          };
        }
        return variant;
      })
    );
    setStorageimgcolor((prev: File[]) => [...prev, file]);
    return false;
  };

  const beforeUpload = (file: File) => {
    const newfile: UploadFile = {
      uid: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
      originFileObj: file as RcFile,
    };
    setImages((prev) => [...prev, newfile]);
    setTimeout(() => {
      setImages((prev) =>
        prev.map((item) =>
          item.uid === newfile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);
    return false;
  };
  const removeimagecolor = (iVariant: number, iColor: number) => {
    setVariants((prev: IProductVariant[]) =>
      prev.map((variant, i) => {
        if (i === iVariant) {
          return {
            ...variant,
            colors: variant.colors.map((color, j) => {
              if (j === iColor) {
                return {
                  ...color,
                  image: null,
                };
              }
              return color;
            }),
          };
        }
        return variant;
      })
    );

    setStorageimgcolor((prev) => prev.filter((_, index) => index !== iColor));
  };

  const removeimage = (file: UploadFile) => {
    setImages((prev) => prev.filter((item) => item.uid !== file.uid));
  };

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
    setExpandedVariants((prev) => [...prev, true]);
  }

  function handleAddColor(iVariant: number) {
    setVariants((prev: any) =>
      prev.map((item: any, index: number) => {
        if (index === iVariant) {
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
    setExpandedColors((prev) => [...prev, true]);
  }
  function handleToggleVariant(iVariant: number) {
    setExpandedVariants((prev) =>
      prev.map((isOpen, index) => (index === iVariant ? !isOpen : isOpen))
    );
  }
  function handleToggleColor(iColor: number) {
    setExpandedColors((prev) =>
      prev.map((isOpen, index) => (index === iColor ? !isOpen : isOpen))
    );
  }
  function handleRemoveVariant(iVariant: number) {
    setVariants((prev: { colors: any[] }[]) =>
      prev.filter((_, index: number) => index !== iVariant)
    );
    setExpandedVariants((prev: boolean[]) =>
      prev.filter((_, index: number) => index !== iVariant)
    );
  }
  function handleRemoveColor(iVariant: number, iColor: number) {
    setVariants((prevVariants: { colors: any[] }[]) =>
      prevVariants.map((variant, vIndex) => {
        if (vIndex === iVariant) {
          return {
            ...variant,
            colors: variant.colors.filter(
              (_: any, cIndex: number) => cIndex !== iColor
            ),
          };
        }
        return variant;
      })
    );
  }

  useEffect(() => {
    const query: any = {};
    brandServices.getQuery(query).then((res) => setBrands(res.data));
  }, []);
  useEffect(() => {
    const query: any = {};
    categoryServices.getQuery(query).then((res) => {
      setCategories(res.data);

      setSelectedcategory((prev) => {
        // Nếu chưa chọn category nào và đã có storageidcategory thì cập nhật
        if (!prev && storageidcategory) {
          return (
            res.data.find((cat: any) => cat.id === storageidcategory) || null
          );
        }
        return prev; // Giữ nguyên nếu đã chọn trước đó
      });
    });
  }, []); // ❗ Chạy một lần khi component mount, không phụ thuộc vào `storageidcategory`

  

  return (
    <>
      <TitleAdmin title="Quản sản phẩm/ Sửa sản phẩm" />
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Sản Phẩm"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Loại sản phẩm <span className="text-primary">*</span>
              </div>
              <Select
                className="shadow-md"
                style={{ width: 268, height: 44 }}
                onChange={(value, options: any) => setSelectedcategory(options)}
                value={selectedcategory?.id}
                options={categories}
                fieldNames={{ value: "id", label: "name" }}
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Thương hiệu <span className="text-primary">*</span>
              </div>
              <Select
                className="shadow-md"
                style={{ width: 268, height: 44 }}
                value={selectedbrand?.id}
                onChange={(value) => {
                  const brand = brands.find((b) => b.id === value);
                  setSelectedbrand(brand || null);
                }}
                options={brands.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                }))}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center ">
            <p className="text-sm font-bold">
              Loại <span className="text-primary">*</span>
            </p>
            <div
              onClick={handleAddVariant}
              className="px-5 py-2 bg-green-100 rounded cursor-pointer"
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
                    <div
                      className="w-[18px] h-[18px] bg-orange-400 cursor-pointer"
                      onClick={() => handleToggleVariant(iVariant)}
                    >
                      <GrFormNext
                        className={`text-white transition-transform  ${
                          expandedVariants[iVariant] ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <div
                      className="w-[18px] h-[18px] bg-red-600 cursor-pointer"
                      onClick={() => handleRemoveVariant(iVariant)}
                    >
                      <IoIosClose className="text-white flex justify-center items-center" />
                    </div>
                  </div>
                </div>
                {expandedVariants[iVariant] && (
                  <div className="flex flex-col gap-6 ">
                    <div className="flex flex-wrap gap-4">
                      <Input
                        className="w-[268px] h-11 shadow-md"
                        placeholder="Nhập giá"
                        value={variants[iVariant].price}
                        onChange={(e) =>
                          setVariants((prev: IProductVariant[]) =>
                            prev.map((variant: IProductVariant, i: number) => {
                              if (i === iVariant) {
                                return {
                                  ...variant,
                                  price: e.target.value,
                                };
                              }
                              return variant;
                            })
                          )
                        }
                      />
                      <Input
                        className="w-[268px] h-11 shadow-md"
                        placeholder="Nhập giá giảm"
                        value={variants[iVariant].price_sale}
                        onChange={(e) =>
                          setVariants((prev: IProductVariant[]) =>
                            prev.map((variant: IProductVariant, i: number) => {
                              if (i === iVariant) {
                                return {
                                  ...variant,
                                  price_sale: e.target.value,
                                };
                              }
                              return variant;
                            })
                          )
                        }
                      />
                      {selectedcategory?.proptypes.map((item, iItem) => (
                        <div key={iItem} className="flex flex-wrap gap-2">
                          <Select
                            className="shadow-md flex flex-wrap"
                            defaultValue={item.name}
                            style={{ width: 268, height: 44 }}
                            onChange={(value, option) => {
                              setVariants((prev: IProductVariant[]) =>
                                prev.map((variant: any, i: number) => {
                                  if (i === iVariant) {
                                    return {
                                      ...variant,
                                      property_ids: variant.property_ids.map(
                                        (
                                          proptype_id: any,
                                          iProptype_id: number
                                        ) => {
                                          if (iItem === iProptype_id) {
                                            return value;
                                          }
                                          return proptype_id;
                                        }
                                      ),
                                    };
                                  }
                                  return variant;
                                })
                              );
                            }}
                            fieldNames={{ value: "id", label: "name" }}
                            options={properties[item.name]}
                          />
                        </div>
                      ))}
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
                              <div
                                className="w-[18px] h-[18px] bg-orange-400 flex justify-center items-center"
                                onClick={() => handleToggleColor(iColor)}
                              >
                                <GrFormNext
                                  className={`text-white transition-transform ${
                                    expandedColors[iColor] ? "rotate-90" : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={() =>
                                  handleRemoveColor(iVariant, iColor)
                                }
                                className="w-[18px] h-[18px] bg-red-600"
                              >
                                <IoIosClose className="text-white flex justify-center items-center" />
                              </div>
                            </div>
                            {expandedColors[iColor] && (
                              <div className="flex flex-col gap-2.5">
                                <div className="flex flex-wrap gap-4">
                                  <Input
                                    className="w-[268px] h-11 shadow-md"
                                    placeholder="Nhập tên màu"
                                    value={
                                      variants[iVariant].colors[iColor]?.name
                                    }
                                    onChange={(e) =>
                                      setVariants((prev: IProductVariant[]) =>
                                        prev.map(
                                          (
                                            variant: IProductVariant,
                                            i: number
                                          ) => {
                                            if (i === iVariant) {
                                              return {
                                                ...variant,
                                                colors: variant.colors.map(
                                                  (
                                                    eColor: IProductColor,
                                                    eIColor: number
                                                  ) => {
                                                    if (eIColor === iColor) {
                                                      return {
                                                        ...eColor,
                                                        name: e.target.value,
                                                      };
                                                    }
                                                    return eColor;
                                                  }
                                                ),
                                              };
                                            }
                                            return variant;
                                          }
                                        )
                                      )
                                    }
                                  />
                                  <Input
                                    className="w-[268px] h-11 shadow-md"
                                    placeholder="Nhập giá thêm"
                                    value={
                                      variants[iVariant].colors[iColor]
                                        ?.price_extra
                                    }
                                    onChange={(e) =>
                                      setVariants((prev: IProductVariant[]) =>
                                        prev.map(
                                          (
                                            variant: IProductVariant,
                                            i: number
                                          ) => {
                                            if (i === iVariant) {
                                              return {
                                                ...variant,
                                                colors: variant.colors.map(
                                                  (
                                                    eColor: IProductColor,
                                                    eIColor: number
                                                  ) => {
                                                    if (eIColor === iColor) {
                                                      return {
                                                        ...eColor,
                                                        price_extra:
                                                          e.target.value,
                                                      };
                                                    }
                                                    return eColor;
                                                  }
                                                ),
                                              };
                                            }
                                            return variant;
                                          }
                                        )
                                      )
                                    }
                                  />
                                  <Input
                                    className="w-[268px] h-11 shadow-md"
                                    placeholder="Nhập số lượng"
                                    value={
                                      variants[iVariant].colors[iColor]
                                        ?.quantity
                                    }
                                    onChange={(e) =>
                                      setVariants((prev: IProductVariant[]) =>
                                        prev.map(
                                          (
                                            variant: IProductVariant,
                                            i: number
                                          ) => {
                                            if (i === iVariant) {
                                              return {
                                                ...variant,
                                                colors: variant.colors.map(
                                                  (
                                                    eColor: IProductColor,
                                                    eIColor: number
                                                  ) => {
                                                    if (eIColor === iColor) {
                                                      return {
                                                        ...eColor,
                                                        quantity:
                                                          e.target.value,
                                                      };
                                                    }
                                                    return eColor;
                                                  }
                                                ),
                                              };
                                            }
                                            return variant;
                                          }
                                        )
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                  <Upload
                                    multiple={false}
                                    maxCount={1}
                                    listType="picture"
                                    fileList={imagescolor}
                                    beforeUpload={(file) =>
                                      beforeUploadcolor(file, iVariant, iColor)
                                    }
                                    onRemove={() =>
                                      removeimagecolor(iVariant, iColor)
                                    }
                                    showUploadList={false}
                                  >
                                    <style jsx>{`
                                      :global(.ant-upload-select) {
                                        width: 100% !important;
                                      }
                                    `}</style>
                                    <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                                      <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                                        Chọn tệp
                                      </div>
                                      <div className="w-full text-sm font-normal">
                                        <span>{imagescolor.length}</span> Tệp
                                      </div>
                                    </div>
                                  </Upload>

                                  {/* Hiển thị danh sách ảnh đã chọn */}
                                  <div className="flex items-center flex-wrap gap-3">
                                    {variants[iVariant]?.colors[iColor]
                                      ?.image && (
                                      <div className="w-20 h-20 relative">
                                        <img
                                          src={
                                            variants[iVariant].colors[iColor]
                                              .image.originFileObj
                                              ? URL.createObjectURL(
                                                  variants[iVariant].colors[
                                                    iColor
                                                  ].image.originFileObj
                                                )
                                              : variants[iVariant].colors[
                                                  iColor
                                                ].image.url // Sửa lại từ `name` thành `url`
                                          }
                                          alt="Color Preview"
                                          className="w-full h-full object-cover rounded"
                                        />
                                        <div
                                          className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                                          onClick={() =>
                                            removeimagecolor(iVariant, iColor)
                                          }
                                        >
                                          <IoCloseSharp className="text-red-500" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">
              Hình Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Upload
                multiple
                listType="picture"
                fileList={images}
                beforeUpload={beforeUpload}
                onRemove={removeimage}
                showUploadList={false}
              >
                <style jsx>{`
                  :global(.ant-upload-select) {
                    width: 100% !important;
                  }
                `}</style>
                <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                  <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                    Chọn tệp
                  </div>
                  <div className="w-full text-sm font-normal">
                    <span>{images.length}</span> Tệp
                  </div>
                </div>
              </Upload>

              {/* Hiển thị danh sách ảnh đã chọn */}
              <div className="flex items-center flex-wrap gap-3">
                {images.map((file) => {
                  const imageSrc = file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : file.url;

                  return (
                    <div key={file.uid} className="w-20 h-20 relative">
                      {file.status === "uploading" ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                        </div>
                      ) : (
                        <img
                          src={imageSrc}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                      <div
                        className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                        onClick={() => removeimage(file)}
                      >
                        <IoCloseSharp className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">
                Mô tả thương hiệu <span className="text-primary">*</span>
                <div
                  ref={quillRef}
                  className="w-full min-h-[100px] border border-gray-300 rounded"
                ></div>
              </div>
            </div>
          </div>
          <Button
            back="product/list"
            onClick={async () => {
              if (storageimgcolor) {
                const formDataimgcolor = new FormData();
                storageimgcolor.forEach((file) => {
                  formDataimgcolor.append("images", file);
                });
                uploadServices.uploadMultiple(formDataimgcolor);
              }
              if (images) {
                const formDaraimages = new FormData();
                images.forEach((file) => {
                  if (file.originFileObj) {
                    formDaraimages.append("images", file.originFileObj);
                  }
                });
                uploadServices.uploadMultiple(formDaraimages);
              }
              // console.log(images);

              const formattedVariants = variants.map((variant: any) => ({
                ...variant,
                price: +variant.price,
                price_sale: +variant.price_sale,
                colors: variant.colors.map((color: any) => ({
                  ...color,
                  price_extra: +color.price_extra,
                  quantity: +color.quantity,
                  image: color.image?.name || "",
                  status: 1,
                })),
                property_ids: variant.property_ids.filter(Boolean),
              }));
              // console.log("Dữ liệu gửi lên API:", {
              //   category_id: selectedcategory?.id,
              //   brand_id: selectedbrand,
              //   variants: formattedVariants,
              //   description: editorContent,
              // });
              await productServices
                .addProduct({
                  name: name,
                  images: JSON.stringify(images.map((file) => file.name)),
                  category_id: selectedcategory?.id,
                  brand_id: selectedbrand,
                  variants: JSON.stringify(formattedVariants),
                  description: editorContent,
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("Cập nhật thành công");
                  }
                });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
