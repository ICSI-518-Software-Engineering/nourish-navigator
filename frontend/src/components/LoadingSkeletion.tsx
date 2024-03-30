import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./ui/skeleton";

type LoadingSkeletionProps = {
  className?: string;
};

const LoadingSkeletion: React.FC<LoadingSkeletionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-4 h-screen justify-center",
        className
      )}
    >
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default LoadingSkeletion;
