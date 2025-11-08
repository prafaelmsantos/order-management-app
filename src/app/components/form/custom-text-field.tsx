import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type IAutoMoreiraTextFieldFormValidation = {
  error?: boolean;
  helperText?: string;
  label?: string;
  defaultValue?: string | number | null;
  name: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  rows?: number;
  variant?: "outlined" | "standard" | "filled";
  disableUnderline?: boolean;
  disabled?: boolean;
};

export default function CustomTextField({
  error,
  helperText,
  label,
  defaultValue,
  name,
  required,
  multiline,
  rows,
  variant,
  disabled
}: IAutoMoreiraTextFieldFormValidation) {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          {...field}
          required={required}
          label={label}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          fullWidth
          margin="dense"
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
          variant={variant}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  );
}
