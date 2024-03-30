import { InputOptionsType } from "@/app/dashboard/meal-planner/dataAndTypes";
import { FormControllerProps } from "@/lib/dataAndTypes";
import { Box } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { DescriptionText, ErrorText } from "./Text";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type CustomCheckboxProps<T extends FieldValues> = FormControllerProps<T> & {
  options: InputOptionsType[];
};

const CustomCheckbox = <T extends FieldValues>(
  props: CustomCheckboxProps<T>
) => {
  return (
    <Controller
      name={props.id}
      control={props.control}
      render={({ fieldState }) => {
        return (
          <Box className="flex flex-col gap-2">
            <Box className="mb-2">
              <Label>{props.label}</Label>
              <DescriptionText>{props.description}</DescriptionText>
            </Box>
            <Box display="flex" gap="1rem">
              {props.options?.map((option) => {
                return (
                  <Controller
                    name={props.id}
                    key={option.id}
                    control={props.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Box className="flex flex-row items-start space-x-3 space-y-0">
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked: boolean) => {
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (id: string) => id !== option.id
                                    ) ?? []
                                  );
                            }}
                          />
                          <Label>{option.label}</Label>
                        </Box>
                      );
                    }}
                  />
                );
              })}
            </Box>
            <ErrorText>{fieldState.error?.message}</ErrorText>
          </Box>
        );
      }}
    />
  );
};

export default CustomCheckbox;
