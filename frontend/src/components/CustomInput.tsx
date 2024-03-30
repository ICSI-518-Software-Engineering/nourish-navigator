import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { DescriptionText, ErrorText } from "./Text";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CustomInputProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  description?: string;
  className?: string;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
};

const CustomInput = <T extends FieldValues>(props: CustomInputProps<T>) => {
  return (
    <div className={cn("grid gap-1 py-2 h-24", props.className)}>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        {...props.register?.(props.id)}
        className={cn({
          "focus-visible:ring-red-500": props.errors?.[props.id],
        })}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
        {...props.inputProps}
      />
      <DescriptionText>{props.description}</DescriptionText>
      <ErrorText>{props.errors?.[props.id]?.message as string}</ErrorText>
    </div>
  );
};

export default CustomInput;
