"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "./ui/label";

type CustomSelectProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  label: string;
  options: SelectOptionType[];
  description?: string;
  errors: FieldErrors<T>;
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
      rules={{ required: true }}
      render={({ field }) => (
        <div className="grid gap-1 py-2">
          <Label>{props.label}</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.description && (
            <p className={cn("text-[0.8rem] text-muted-foreground")}>
              {props.description}
            </p>
          )}
          {props.errors?.[props.id] && (
            <p className="text-sm text-red-500">
              {props.errors?.[props.id]?.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default CustomSelect;
