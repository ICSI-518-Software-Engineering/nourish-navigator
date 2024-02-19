"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type LoadingLayoutProps = {
  children: React.ReactNode;
};

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
