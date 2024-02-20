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
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "./ui/label";

export type OptionType = {
  label: string;
  value: string;
};

type MultiSelectProps<T extends FieldValues> = {
  options: OptionType[];
  className?: string;
  control: Control<T>;
  id: Path<T>;
  errors: FieldErrors<T>;
  label?: string;
  description?: string;
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
      render={({ field }) => (
        <MultiSelectBase
          id={props.id}
          options={options}
          label={props.label}
          description={props.description}
          errors={props.errors}
          selected={field.value}
          {...field}
        />
      )}
    />
  );
};

export { MultiSelect };

type MultiSelectBaseProps<T extends FieldValues> = {
  options: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  label?: string;
  description?: string;
  errors: FieldErrors<T>;
  id: Path<T>;
};

const MultiSelectBaseComp = <T extends FieldValues>(
  { options, selected, onChange, className, ...props }: MultiSelectBaseProps<T>,
  _ref: unknown
) => {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected?.filter((i) => i !== item));
  };

  return (
    <div className="grid gap-1 min-h-24 py-2">
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
            <div className="flex gap-1 flex-wrap items-center mt-[0.35rem]">
              {selected?.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mr-1 mb-1"
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
  );
};

const MultiSelectBase = React.forwardRef(MultiSelectBaseComp);
