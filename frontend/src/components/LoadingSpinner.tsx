import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadingSpinnerProps = {
  isVisible?: boolean;
  className?: string;
};
const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  if (!props.isVisible) {
    return null;
  }
  return (
    <Loader2 className={cn("mr-2 h-4 w-4 animate-spin", props.className)} />
  );
};

export default LoadingSpinner;
