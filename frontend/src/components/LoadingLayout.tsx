"use client";

import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type LoadingLayoutProps = {
  children: React.ReactNode;
};

const authPages = new Set(["", "/", "/sign-in", "/sign-up", "/sign-up/admin"]);

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pathname = usePathname();
  const user = getLoggedInUserDetails();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);

    if (!user && !authPages.has(pathname)) {
      router.replace("/");
    }
  }, [pathname, router, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-5">
          <Skeleton className="h-20 w-20 rounded-full" />
          <h5 className="text-teal-300 text-xl">Nourish Navigator...</h5>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingLayout;
