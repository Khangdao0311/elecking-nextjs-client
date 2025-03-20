import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StoreProvider } from "@/app/store";

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
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
