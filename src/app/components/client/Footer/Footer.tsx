import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

import images from "@/app/assets/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4">
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            CHĂM SÓC KHÁCH HÀNG
          </div>
          <div className="flex flex-col gap-3 px-2">
            <p className="w-full text-base text-black ">Trung Tâm Trợ Giúp</p>
            <p className="w-full text-base text-black ">Thanh Toán</p>
            <p className="w-full text-base text-black ">Vận Chuyển</p>
            <p className="w-full text-base text-black ">Chăm Sóc Khách Hàng</p>
            <p className="w-full text-base text-black ">Chính Sách Bảo Hàng</p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            CHĂM SÓC KHÁCH HÀNG
          </div>
          <div className="flex flex-col gap-3 px-2">
            <p className="w-full text-base text-black ">Giới thiệu về ElecKing</p>
            <p className="w-full text-base text-black ">Liên hệ với ElecKing</p>
            <p className="w-full text-base text-black ">Flash Sale</p>
            <p className="w-full text-base text-black flex items-center gap-2">
              <IoMailOutline className="w-5 h-5" />
              <span>elecking.store@gmail.com</span>
            </p>
            <p className="w-full text-base text-black flex items-center gap-2">
              <BsTelephone className="w-5 h-5" />
              <span>0976123456</span>
            </p>
            <p className="w-full text-base text-black flex items-center gap-2">
              <SlLocationPin className="w-5 h-5" />
              <span>elecking.store@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            THANH TOÁN
          </div>
          <div className="flex flex-row gap-2 flex-wrap	">
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.cod} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.vnpay} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.momo} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.zalopay} alt="payment" />
            </div>
          </div>
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            PHƯƠNG THỨC VẬN CHUYỂN
          </div>
          <div className="flex flex-row gap-2 flex-wrap	">
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.grapexpress} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.ninjavan} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.ahamove} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.giaohangnhanh} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.giaohangtietkiem} alt="payment" />
            </div>
            <div className="w-16 h-8 p-1 bg-white border border-thirdaryDark rounded-md">
              <img src={images.jvatexpress} alt="payment" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            CHĂM SÓC KHÁCH HÀNG
          </div>
          <div className="flex flex-col gap-3 px-2">
            <p className="w-full text-base text-black flex items-center gap-2">
              <FaFacebook className="w-5 h-5" />
              <span>Facebook</span>
            </p>
            <p className="w-full text-base text-black flex items-center gap-2">
              <FaInstagram className="w-5 h-5" />
              <span>Instagram</span>
            </p>
            <p className="w-full text-base text-black flex items-center gap-2">
              <FaTiktok className="w-5 h-5" />
              <span>TikTok</span>
            </p>
          </div>
          <div className="text-base font-bold bg-gradient-to-r from-thirdaryDark to-thirdary text-transparent bg-clip-text py-3">
            TẢI ỨNG DỤNG
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-20 h-20 rounded-md overflow-hidden">
              <img
                className="f-full h-full"
                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                alt="QR code"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-32 h-9 rounded-md overflow-hidden">
                <img className="f-full h-full object-contain" src={images.appstore} alt="" />
              </div>
              <div className="w-32 h-9 rounded-md overflow-hidden">
                <img className="f-full h-full object-contain" src={images.googleplay} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="container-custom center-flex flex-col gap-2 pt-3 pb-10">
          <p className="text-white text-sm text-center">
            Địa chỉ: Tòa T Công Viên Phần Mềm Quang Trung, Quang Trung, Q12, Việt Nam. Tổng đài hỗ
            trợ: 19001221 - Email: elecking.store@gmail.com
          </p>
          <p className="text-white text-sm text-center">
            Chịu Trách Nhiệm Quản Lý Nội Dung: Đào Vĩnh Khang - Điện thoại liên hệ: 0933.123.456
          </p>
          <p className="text-white text-sm text-center">
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
            10/02/2015
          </p>
          <p className="text-white text-sm text-center">© 2025 - Bản quyền thuộc về ElecKing</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
