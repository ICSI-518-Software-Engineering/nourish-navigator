import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type CustomInputProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
};

const CustomInput = <T extends FieldValues>(props: CustomInputProps<T>) => {
  return (
    <div className="grid gap-1 py-2">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        {...props.register?.(props.id)}
        className={cn({
          "focus-visible:ring-red-500": props.errors?.[props.id],
        })}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
      />
      {props.errors?.[props.id] && (
        <p className="text-sm text-red-500">
          {props.errors?.[props.id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
