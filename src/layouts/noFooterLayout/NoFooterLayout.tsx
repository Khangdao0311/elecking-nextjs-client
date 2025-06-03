import { Fragment } from "react";

import BottomNavigation from "@/components/client/BottomNavigation";
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
      <BottomNavigation />
    </Fragment>
  );
}
