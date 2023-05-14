import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Input, InputProps } from "./Input";

export type FormInputProps<T extends FieldValues> = InputProps & {
  name: Path<T>;
  control: Control<T>;
};

export const FormInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: FormInputProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <Input
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...restProps}
    />
  );
};
