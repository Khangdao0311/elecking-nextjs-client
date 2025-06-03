"use client";

import { useRouter } from "next/navigation";

import config from "@/config";
import { useEffect } from "react";

export default function StartPage() {
  const router = useRouter();
  useEffect(() => {
    router.push(config.routes.client.home);
  });
  return <body></body>;
}
