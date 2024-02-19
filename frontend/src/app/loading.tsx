import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div className="flex items-center space-x-4 h-screen justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default Loading;
