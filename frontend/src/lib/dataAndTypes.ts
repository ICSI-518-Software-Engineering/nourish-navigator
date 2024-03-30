import { Control, FieldValues, Path } from "react-hook-form";

export type FormControllerProps<T extends FieldValues> = {
  id: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
};
