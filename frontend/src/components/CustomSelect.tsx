"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { DescriptionText, ErrorText } from "./Text";
import { Label } from "./ui/label";

type CustomSelectProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  label: string;
  options: SelectOptionType[];
  description?: string;
  errors?: FieldErrors<T>;
  control: Control<T>;
};

export type SelectOptionType = {
  label: React.ReactNode;
  value: string;
};

const CustomSelect = <T extends FieldValues>(props: CustomSelectProps<T>) => {
  return (
    <Controller
      name={props.id}
      control={props.control}
      render={({ field, fieldState }) => {
        return (
          <div className="grid gap-1 py-2 h-24">
            <Label>{props.label}</Label>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              name={field.name}
              disabled={field.disabled}
              defaultValue={field.value}
              key={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} {...field} />
              </SelectTrigger>
              <SelectContent>
                {props.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DescriptionText>{props.description}</DescriptionText>
            <ErrorText>{fieldState.error?.message}</ErrorText>
          </div>
        );
      }}
    />
  );
};

export default CustomSelect;
