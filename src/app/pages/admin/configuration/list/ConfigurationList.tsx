"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import * as proptypeService from "@/app/services/proptypeService";
import * as propertyService from "@/app/services/propertyService";
import { useEffect, useState } from "react";
import {
  Input,
  Modal,
  notification,
  Pagination,
  Select,
  Space,
  Table,
  type TableProps,
} from "antd";
import { FiEdit } from "react-icons/fi";
import BoxSearchLimit from "@/app/components/admin/boxsearchlimtit";
import { GoPlus } from "react-icons/go";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";

function ConfigurationList() {
  const [proptype, setProptype] = useState<IProptype[]>([]);
  const [property, setProperTy] = useState<IProperty[]>([]);
  const [limitProptype, setLimitProptype] = useState(5);
  const [limitProperty, setLimitProperty] = useState(5);
  const [totalPagesProptype, setTotalPagesProptype] = useState(0);
  const [totalPagesProperty, setTotalPagesProperty] = useState(0);
  const [searchProptype, setSearchProptype] = useState("");
  const [searchProperty, setSearchProperty] = useState("");
  const [pageProptype, setPageProptype] = useState(1);
  const [pageProperty, setPageProperty] = useState(1);
  const [selectedProptype, setSelectedProptype] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>();
  const [nameCatConfiguration, setNameCatConfiguration] = useState("");
  const [idCatConfiguration, setIdCatConfiguration] = useState("");
  const [idConfiguration, setIdConfiguration] = useState("");
  const [showAddCatConfiguration, setShowAddCatConfiguration] = useState(false);
  const [showEditCatConfiguration, setShowEditCatConfiguration] =
    useState(false);
  const [nameConfiguration, setNameConfiguration] = useState("");
  const [showAddConfiguration, setShowAddConfiguration] = useState(false);
  const [showEditConfiguration, setShowEditConfiguration] = useState(false);
  const [state, dispatch] = useStore();

  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: any,
    description: any
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 50, y: 300 };
  };

  useEffect(() => {
    const query: any = {};
    query.limit = limitProptype;
    query.page = pageProptype;
    if (searchProptype != "") {
      query.search = searchProptype;
    }
    proptypeService.getQuery(query).then((res) => {
      setTotalPagesProptype(res.total);
      setProptype(res.data);
    });
  }, [limitProptype, pageProptype, searchProptype]);

  useEffect(() => {
    const query: any = {};
    query.limit = limitProperty;
    query.page = pageProperty;
    if (searchProperty != "") {
      query.search = searchProperty;
    }

    propertyService.getQuery(query).then((res) => {
      setProperTy(res.data);
      setTotalPagesProperty(res.total);
    });
  }, [limitProperty, pageProperty, searchProperty]);

  const columnsProptype: TableProps<IProptype>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 100,
      key: "index",
      render: (_, __, index) => (pageProptype - 1) * limitProptype + index + 1,
    },
    {
      title: "Tên danh mục cấu hình",
      dataIndex: "name",
      width: 450,
      key: "name",
    },
    {
      title: "Chức năng",
      width: 200,
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            key={`edit-${record.id}`}
            onClick={() => handleGetCatConfiguration(record.id)}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];
  const columnsProperty: TableProps<IProperty>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 100,
      key: "index",
      render: (_, __, index) => (pageProperty - 1) * limitProperty + index + 1,
    },
    {
      title: "Tên danh mục cấu hình",
      dataIndex: "proptype",
      width: 450,
      key: "proptype",
      render: (proptype) => proptype?.name,
    },
    {
      title: "Tên cấu hình",
      dataIndex: "name",
      width: 200,
      key: "name",
    },
    {
      title: "Chức năng",
      width: 200,
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleGetConfiguration(record.id)}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];

  function handleshowAddCatConfiguration() {
    setShowAddCatConfiguration(true);
  }

  async function handleAddCatConfiguration() {
    if (!nameCatConfiguration) {
      openNotificationWithIcon("error", "Thất bại", "Thiếu dữ liệu");
    }
    if (nameCatConfiguration) {
      await proptypeService
        .addProptype({ name: nameCatConfiguration })
        .then((res) => {
          if (res.status === 200) {
            openNotificationWithIcon(
              "success",
              "Thành công",
              "Thêm danh mục cấu hình thành công"
            );
            setNameCatConfiguration("");
          }
        });
    }
    await proptypeService
      .getQuery({ limit: limitProptype, page: pageProptype })
      .then((res) => {
        setTotalPagesProptype(res.total);
        setProptype(res.data);
      });
  }

  function handleGetCatConfiguration(id: string) {
    setShowEditCatConfiguration(true);
    proptypeService.getOne(id).then((res) => {
      setNameCatConfiguration(res.data.name);
      setIdCatConfiguration(res.data.id);
    });
  }

  async function handleEditCatConfiguration() {
    await proptypeService
      .editProptype(idCatConfiguration, { name: nameCatConfiguration })
      .then((res) => {
        if (res.status === 200) {
          openNotificationWithIcon(
            "success",
            "Thành công",
            "Sửa danh mục cấu hình thành công"
          );
          setShowEditCatConfiguration(false);
          return proptypeService.getQuery({
            limit: limitProptype,
            page: pageProptype,
          });
        }
      })
      .then((res) => {
        setTotalPagesProptype(res.total);
        setProptype(res.data);
      });
    await propertyService
      .getQuery({ limit: limitProperty, page: pageProperty })
      .then((res) => {
        setTotalPagesProperty(res.total);
        setProperTy(res.data);
      });
  }

  function handleshowAddConfiguration() {
    setShowAddConfiguration(true);
  }

  async function handleAddConfiguration() {
    await proptypeService
      .getQuery({ limit: 0 })
      .then((res) => setProptype(res.data));

    if (nameConfiguration && selectedProptype) {
      await propertyService
        .addProperty({ name: nameConfiguration, proptype_id: selectedProptype })
        .then((res) => {
          if (res.status == 200) {
            openNotificationWithIcon(
              "success",
              "Thành công",
              "Thêm cấu hình thành công"
            );
            setNameConfiguration("");
            setSelectedProptype([]);
          }
          propertyService
            .getQuery({ limit: limitProperty, page: pageProperty })
            .then((res) => {
              setProperTy(res.data);
              setTotalPagesProperty(res.total);
            });
        });
    } else {
      openNotificationWithIcon(
        "error",
        "Thêm dữ liệu thất bại",
        "Thiếu dữ liệu"
      );
    }
  }

  async function handleGetConfiguration(id: string) {
    setShowEditConfiguration(true);
    await proptypeService.getQuery({ limit: 0 }).then((res) => {
      setProptype(res.data);
    });
    await propertyService.getOne(id).then((res) => {
      setNameConfiguration(res.data.name);
      setSelectedProperty(res.data.proptype.id);
      setIdConfiguration(res.data.id);
    });
  }

  async function handleEditConfiguration() {
    await propertyService
      .editProperty(idConfiguration, {
        name: nameConfiguration,
        proptype_id: selectedProperty,
      })
      .then((res) => {
        if (res.status === 200) {
          setShowEditConfiguration(false);
          openNotificationWithIcon(
            "success",
            "Sửa thành công",
            "Sửa tên cấu hình thành công"
          );
        }
        return propertyService.getQuery({
          limit: limitProperty,
          page: pageProperty,
        });
      })
      .then((res) => {
        setTotalPagesProperty(res.total);
        setProperTy(res.data);
      });
  }

  const handleChangeProptype = (value: string[]) => {
    setSelectedProptype(value);
  };

  const handleChangeProperty = (value: string) => {
    setSelectedProperty(value);
  };

  return (
    <>
      {state.load && <Loading />}
      {state.load ? state.load : <>
        <TitleAdmin title="Danh Sách Cấu Hình" />
      <div className="flex w-full gap-4 ">
        <div className="p-5 flex flex-col gap-4 w-1/2 h-[600px] rounded-lg border border-gray-200 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Tên Danh Mục Cấu Hình</p>
            <button
              onClick={handleshowAddCatConfiguration}
              className="w-28 flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
            >
              <GoPlus className="w-6 h-6" />
              <p className="text-sm font-bold">Tạo mới</p>
            </button>
          </div>
          <div className="border border-zinc-300"></div>
          <div className="w-full">
            <BoxSearchLimit
              title="danh mục"
              onLimitChange={(newLimit: any) => {
                setLimitProptype(newLimit);
                setPageProptype(1);
              }}
              onSearch={(value) => {
                setSearchProptype(value);
                setPageProptype(1);
              }}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <Table<IProptype>
              columns={columnsProptype}
              dataSource={proptype}
              rowKey="id"
              scroll={getTableScroll(proptype.length)}
              pagination={false}
              tableLayout="auto"
            />
            {totalPagesProptype > limitProptype && (
              <div className="flex w-full justify-end mt-2">
                <Pagination
                  current={pageProptype}
                  onChange={(e) => {
                    setPageProptype(e);
                  }}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limitProptype}
                  total={totalPagesProptype}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-4 w-1/2 h-[600px] rounded-lg border border-gray-200 shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Tên Các Cấu Hình</p>
            <button
              onClick={handleshowAddConfiguration}
              className="w-28 flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
            >
              <GoPlus className="w-6 h-6" />
              <p className="text-sm font-bold">Tạo mới</p>
            </button>
          </div>
          <div className="border border-zinc-300"></div>
          <div className="w-full">
            <BoxSearchLimit
              title="danh mục"
              onLimitChange={(newLimit: any) => {
                setLimitProperty(newLimit);
                setPageProperty(1);
              }}
              onSearch={(value) => {
                setSearchProperty(value);
                setPageProperty(1);
              }}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <Table<IProperty>
              columns={columnsProperty}
              dataSource={property}
              rowKey="id"
              scroll={getTableScroll(property.length)}
              pagination={false}
              tableLayout="auto"
            />
            {totalPagesProperty > limitProperty && (
              <div className="flex w-full justify-end mt-2">
                <Pagination
                  current={pageProperty}
                  onChange={(e) => setPageProperty(e)}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limitProperty}
                  total={totalPagesProperty}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      </>}
  
      {contextHolder}

      <Modal
        open={showAddCatConfiguration}
        closeIcon={<div className="hidden" />}
        onCancel={() => setShowAddCatConfiguration(false)}
        footer={null}
        title={null}
        centered
      >
        {showAddCatConfiguration && (
          <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <div className="w-full flex flex-col gap-6">
              <div className="w-full">
                <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
                  Tạo Mới Danh Mục Cấu Hình
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Tên Danh Mục Cấu Hình{" "}
                    <span className="text-primary">*</span>
                  </div>
                  <Input
                    value={nameCatConfiguration}
                    onChange={(e: any) =>
                      setNameCatConfiguration(e.target.value)
                    }
                    className="w-[268px] h-11 "
                    placeholder="Nhập Tên Danh Mục"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCatConfiguration}
                className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setShowAddCatConfiguration(false)}
                className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={showEditCatConfiguration}
        closeIcon={<div className="hidden" />}
        onCancel={() => setShowAddCatConfiguration(false)}
        footer={null}
        title={null}
        centered
      >
        {showEditCatConfiguration && (
          <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <div className="w-full flex flex-col gap-6">
              <div className="w-full">
                <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
                  Sửa Mới Danh Mục Cấu Hình
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Tên Danh Mục Cấu Hình{" "}
                    <span className="text-primary">*</span>
                  </div>
                  <Input
                    value={nameCatConfiguration}
                    onChange={(e: any) =>
                      setNameCatConfiguration(e.target.value)
                    }
                    className="w-[268px] h-11 "
                    placeholder="Nhập Tên Danh Mục"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditCatConfiguration}
                className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setShowEditCatConfiguration(false)}
                className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={showAddConfiguration}
        closeIcon={<div className="hidden" />}
        onCancel={() => setShowAddConfiguration(false)}
        footer={null}
        title={null}
        centered
      >
        {showAddConfiguration && (
          <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <div className="w-full flex flex-col gap-6">
              <div className="w-full">
                <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
                  Tạo Mới Cấu Hình
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Tên Danh Mục Cấu Hình{" "}
                    <span className="text-primary">*</span>
                  </div>
                  <Input
                    value={nameConfiguration}
                    onChange={(e: any) => setNameConfiguration(e.target.value)}
                    className="w-[268px] h-11 "
                    placeholder="Nhập Tên Danh Mục"
                  />
                </div>
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium ">
                  Tên cấu hình <span className="text-primary">*</span>
                </div>
                <Select
                  placeholder="Inserted are removed"
                  value={selectedProptype}
                  onChange={handleChangeProptype}
                  className=" min-w-[268px] h-[44px] flex items-center justify-center"
                  options={proptype.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
                <style jsx>{`
                  :global(.ant-select-selection-overflow) {
                    height: 44px !important;
                    padding: 0 5px !important;
                    margin-top: 0 !important;
                  }
                  :global(.ant-select-selection-item) {
                    margin-top: 0 !important;
                  }
                `}</style>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddConfiguration}
                className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setShowAddConfiguration(false)}
                className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={showEditConfiguration}
        closeIcon={<div className="hidden" />}
        onCancel={() => setShowEditConfiguration(false)}
        footer={null}
        title={null}
        centered
      >
        {showEditConfiguration && (
          <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <div className="w-full flex flex-col gap-6">
              <div className="w-full">
                <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
                  Sửa Cấu Hình
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Tên Cấu Hình <span className="text-primary">*</span>
                  </div>
                  <Input
                    value={nameConfiguration}
                    onChange={(e: any) => setNameConfiguration(e.target.value)}
                    className="w-[268px] h-11 "
                    placeholder="Nhập Tên Danh Mục"
                  />
                </div>
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium ">
                  Cấu hình <span className="text-primary">*</span>
                </div>
                <Select
                  placeholder="Inserted are removed"
                  value={selectedProperty}
                  onChange={handleChangeProperty}
                  className=" min-w-[268px] h-[44px] flex items-center justify-center"
                  options={proptype.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
                <style jsx>{`
                  :global(.ant-select-selection-overflow) {
                    height: 44px !important;
                    padding: 0 5px !important;
                    margin-top: 0 !important;
                  }
                  :global(.ant-select-selection-item) {
                    margin-top: 0 !important;
                  }
                `}</style>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditConfiguration}
                className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setShowEditConfiguration(false)}
                className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ConfigurationList;
