import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
