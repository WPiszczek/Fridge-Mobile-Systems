import { DatePickerInput } from "react-native-paper-dates";
import { View } from "./Themed";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { ComponentProps } from "react";

export type PaperDateInputProps<T extends FieldValues> = Partial<
  ComponentProps<typeof DatePickerInput>
> & {
  name: Path<T>;
  control: Control<T>;
};

export const PaperDateInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: PaperDateInputProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <View>
      <DatePickerInput
        {...restProps}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        startYear={2000}
        endYear={2050}
        locale="en"
        mode="outlined"
        inputMode="start"
      />
    </View>
  );
};
