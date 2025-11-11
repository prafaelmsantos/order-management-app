import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IOrderSchema } from "../../services/OrderSchema";
import { OrderStatus, OrderStatusLabel } from "../../models/Order";

interface IDetailsFormProps {
  disabled: boolean;
}

export default function DetailsForm({ disabled }: IDetailsFormProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext<IOrderSchema>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="paymentMethod"
          control={control}
          disabled={disabled}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Método de Pagamento"
              fullWidth
              variant="outlined"
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="status"
          control={control}
          disabled={disabled}
          defaultValue={OrderStatus.Open}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Estado"
              fullWidth
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {Object.values(OrderStatus)
                .filter((v) => typeof v === "number")
                .map((status) => (
                  <MenuItem key={status} value={status}>
                    {OrderStatusLabel[status as OrderStatus]}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="observations"
          control={control}
          disabled={disabled}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Observações"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
