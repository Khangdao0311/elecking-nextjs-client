import { useState } from "react";
import { useRouter } from "next/navigation";

function Button({ back = "", onClick }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isClicked) return;
    setIsClicked(true);
    onClick(e);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleClick}
        className="text-sm font-bold text-green-800 bg-green-100 rounded px-5 py-2"
        disabled={isClicked}
      >
        Lưu lại
      </button>
      <button
        onClick={() => router.push(back)}
        className="text-sm font-bold text-red-800 bg-red-100 rounded px-5 py-2"
      >
        Hủy bỏ
      </button>
    </div>
  );
}

export default Button;
