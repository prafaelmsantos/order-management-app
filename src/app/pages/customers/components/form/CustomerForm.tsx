import { Controller, useFormContext } from "react-hook-form";
import { Divider, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { ICustomerSchema } from "../../services/CustomerSchema";

interface ICustomerFormProps {
  disabled?: boolean;
}

export default function CustomerForm({ disabled }: ICustomerFormProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext<ICustomerSchema>();

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detalhes do Cliente
      </Typography>
      <Divider sx={{ mb: 5 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Nome Completo"
                fullWidth
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Controller
            name="taxIdentificationNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="NIF"
                fullWidth
                variant="outlined"
                error={!!errors.taxIdentificationNumber}
                helperText={errors.taxIdentificationNumber?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Controller
            name="contact"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Contacto"
                fullWidth
                variant="outlined"
                error={!!errors.contact}
                helperText={errors.contact?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Morada"
                fullWidth
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Código Postal"
                fullWidth
                variant="outlined"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Cidade"
                fullWidth
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
