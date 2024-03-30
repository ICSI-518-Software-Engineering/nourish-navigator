"use client";

import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { DEFAULTS } from "@/lib/constants";
import { Typography } from "@mui/material";
import { redirect, usePathname } from "next/navigation";
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

  useEffect(() => {
    setIsLoading(() => false);
    if (!user && !authPages.has(pathname)) {
      redirect("/");
    }
  }, [pathname, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-5">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Typography variant="h5" color={DEFAULTS.textColor}>
            Nourish Navigator...
          </Typography>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingLayout;
