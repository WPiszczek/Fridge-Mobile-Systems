import { ComponentProps } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { TextInput } from "react-native-paper";

export type FormInputProps<T extends FieldValues> = ComponentProps<
  typeof TextInput
> & {
  name: Path<T>;
  control: Control<T>;
};

export const PaperFormInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: FormInputProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      {...restProps}
      mode={restProps.mode || "outlined"}
      style={[{ width: "100%" }, restProps.style]}
    />
  );
};
