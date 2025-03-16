import { Fragment } from "react";

import Sidebar from "@/app/components/admin/Sidebar";
import HeaderAdmin from "@/app/components/admin/HeaderAdmin";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Sidebar />
      <div className="pl-64 h-screen">
        <HeaderAdmin />
        <main className="p-4 flex flex-col gap-4 h-[calc(100%-48px)] bg-orange-200">{children}</main>
      </div>
    </Fragment>
  );
}
