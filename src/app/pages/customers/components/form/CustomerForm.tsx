import { Controller, useFormContext } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IClientSchema } from "../../services/CustomerSchema";

export default function ClientForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<IClientSchema>();

  return (
    <Grid container spacing={2}>
      {/* Nome completo */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Nome completo
        </Typography>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Digite o nome completo"
              fullWidth
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          )}
        />
      </Grid>

      {/* NIF */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          NIF
        </Typography>
        <Controller
          name="taxIdentificationNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              placeholder="NIF"
              fullWidth
              variant="outlined"
              error={!!errors.taxIdentificationNumber}
              helperText={errors.taxIdentificationNumber?.message}
            />
          )}
        />
      </Grid>

      {/* Contacto */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Telefone
        </Typography>
        <Controller
          name="contact"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Telefone"
              fullWidth
              variant="outlined"
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
          )}
        />
      </Grid>

      {/* Morada */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Morada
        </Typography>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Rua, número, apartamento"
              fullWidth
              variant="outlined"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
      </Grid>

      {/* Código postal */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Código Postal
        </Typography>
        <Controller
          name="postalCode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="1000-000"
              fullWidth
              variant="outlined"
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
            />
          )}
        />
      </Grid>

      {/* Cidade */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Cidade
        </Typography>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Lisboa"
              fullWidth
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
