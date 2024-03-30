import { InputOptionsType } from "@/app/dashboard/meal-planner/dataAndTypes";
import { FormControllerProps } from "@/lib/dataAndTypes";
import { Box, Stack } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { DescriptionText, ErrorText } from "./Text";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type CustomRadioInputProps<T extends FieldValues> = FormControllerProps<T> & {
  options: InputOptionsType[];
};

const CustomRadioInput = <T extends FieldValues>(
  props: CustomRadioInputProps<T>
) => {
  return (
    <Controller
      control={props.control}
      name={props.id}
      render={({ field, fieldState }) => (
        <Box className="flex flex-col gap-3">
          <Box>
            <Label>{props.label}</Label>
            <DescriptionText>{props.description}</DescriptionText>
          </Box>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
          >
            <Stack direction="row" gap="1rem">
              {props.options?.map((option) => (
                <Box key={option.id} className="flex items-center gap-3">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
          <ErrorText>{fieldState.error?.message}</ErrorText>
        </Box>
      )}
    />
  );
};

export default CustomRadioInput;