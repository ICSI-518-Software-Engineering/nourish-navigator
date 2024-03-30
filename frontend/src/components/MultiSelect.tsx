import { cn } from "@/lib/utils";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@mui/material";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { SelectOptionType } from "./CustomSelect";
import { DescriptionText, ErrorText } from "./Text";
import { Label } from "./ui/label";

type MultiSelectProps<T extends FieldValues> = {
  options: SelectOptionType[];
  className?: string;
  control: Control<T>;
  id: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
  description?: string;
  containerClassName?: string;
  placeholder?: string;
};

const MultiSelect = <T extends FieldValues>({
  options,
  className,
  ...props
}: MultiSelectProps<T>) => {
  return (
    <Controller
      name={props.id}
      control={props.control}
      render={({ field, fieldState }) => (
        <MultiSelectBase
          id={props.id}
          options={options}
          label={props.label}
          description={props.description}
          selected={field.value}
          className={className}
          containerClassName={props.containerClassName}
          placeholder={props.placeholder}
          {...field}
          {...fieldState}
        />
      )}
    />
  );
};

export { MultiSelect };

type MultiSelectBaseProps<T extends FieldValues> = {
  options: SelectOptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  label?: string;
  description?: string;
  id: Path<T>;
  error?: FieldError;
  containerClassName?: string;
  placeholder?: string;
};

const MultiSelectBaseComp = <T extends FieldValues>(
  {
    options,
    selected,
    onChange,
    className,
    error,
    ...props
  }: MultiSelectBaseProps<T>,
  _ref: unknown
) => {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected?.filter((i) => i !== item));
  };

  return (
    <div className={cn("grid gap-1 min-h-24 py-2", props.containerClassName)}>
      <Label>{props.label}</Label>

      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between h-full dark:bg-transparent dark:border-slate-500",
              { "py-0": selected?.length }
            )}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="flex gap-1 flex-wrap items-center">
              {selected?.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mr-1 my-1"
                  onClick={() => handleUnselect(item)}
                >
                  {item}
                  <div
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}

              {props.placeholder && selected?.length === 0 && (
                <Typography>{props.placeholder}</Typography>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className={className}>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected?.includes(option.value)
                        ? selected?.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <DescriptionText>{props.description}</DescriptionText>
      <ErrorText>{error?.message}</ErrorText>
    </div>
  );
};

const MultiSelectBase = React.forwardRef(MultiSelectBaseComp);
