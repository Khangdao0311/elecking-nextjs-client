"use client";

import { useRouter } from "next/navigation";

import config from "@/config";

function Page() {
  const router = useRouter();
  router.push(config.routes.client.products);

  return <></>;
}

export default Page;
