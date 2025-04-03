import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Suspense } from "react";

import { StoreProvider } from "@/app/store";
import Loading from "@/app/components/client/Loading";

export const metadata: Metadata = {
  title: "ElecKing",
  description: "Website Bán Hàng Chuyên Bán Các Thiết Bị Điện Tử",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
