import { useRouter } from "next/navigation";

function Button({back =""}) {
   const router = useRouter();

    return (
     <div className="flex gap-2">
        <button className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2">Lưu lại</button>
        <button onClick={() => router.push(`/admin/${back}`)} className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2">Hủy bỏ</button>
     </div>
    );
  }
  
  export default Button;