import Link from "next/link";
import config from "./config";

export default function NotFound() {
  return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 center-flex flex-col gap-5 p-24 ">
        <h1 className="text-9xl text-primary font-bold">404</h1>
        <Link
          className="text-white font-bold px-10 rounded-lg py-2 bg-blue-500"
          href={config.routes.client.home}
        >
          Quay Lại Trang Chủ
        </Link>
      </div>
  );
}
