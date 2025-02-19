import { Fragment } from "react";

import BottomNavigation from "@/app/components/client/BottomNavigation";
import Header from "@/app/components/client/Header";

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
