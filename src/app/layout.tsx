import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "X Shop",
  description: "Website Thương Mại Điện Tử",
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
