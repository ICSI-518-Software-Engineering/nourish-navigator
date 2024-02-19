import { cn } from "@/lib/utils";

type MaxWidthContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto w-full px-2.5", className)}>{children}</div>
  );
};

export default MaxWidthContainer;
