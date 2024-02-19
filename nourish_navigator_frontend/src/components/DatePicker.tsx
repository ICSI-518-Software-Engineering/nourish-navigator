"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "./ui/label";

type DatePickerProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  description?: string;
};

const DatePicker = <T extends FieldValues>(props: DatePickerProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Controller
      name={props.id}
      control={props.control}
      rules={{ required: true }}
      render={({ field }) => (
        <>
          <Label htmlFor={props.id}>{props.label}</Label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal py-5",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{props.placeholder ?? "Pick a date"}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(e) => {
                  field.onChange(e);
                  setIsOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
        </>
      )}
    />
  );
};

export default DatePicker;
