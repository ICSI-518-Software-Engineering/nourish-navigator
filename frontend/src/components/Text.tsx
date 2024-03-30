import { cn } from "@/lib/utils";

type TextProps = {
  children: React.ReactNode;
};

export const DescriptionText: React.FC<TextProps> = ({ children }) => {
  if (!children) return null;

  return (
    <p className={cn("text-[0.8rem] text-muted-foreground")}>{children}</p>
  );
};

export const ErrorText: React.FC<TextProps> = ({ children }) => {
  if (!children) return null;

  return <p className="text-sm text-red-500">{children}</p>;
};
