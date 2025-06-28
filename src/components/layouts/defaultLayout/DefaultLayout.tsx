import { Fragment } from "react";

import BottomNavigation from "@/components/client/BottomNavigation";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      {children}
      <div className="sm:block hidden">
        <Footer />
      </div>
      <BottomNavigation />
    </Fragment>
  );
}
