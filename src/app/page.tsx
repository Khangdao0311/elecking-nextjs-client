"use client";
import { useRouter } from "next/navigation";

import config from "@/app/config";

export default function Page() {
  const router = useRouter();
  router.push(config.routes.home);
}
