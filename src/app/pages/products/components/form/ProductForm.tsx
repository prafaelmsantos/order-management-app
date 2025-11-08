import { Controller, useFormContext } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IProductSchema } from "../../services/ProductSchema";

export default function ProductForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<IProductSchema>();

  return (
    <Grid container spacing={2}>
      {/* Referência */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Referência
        </Typography>
        <Controller
          name="reference"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Ex: 316"
              fullWidth
              variant="outlined"
              error={!!errors.reference}
              helperText={errors.reference?.message}
            />
          )}
        />
      </Grid>

      {/* Descrição */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Descrição
        </Typography>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Ex: Camisola"
              fullWidth
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </Grid>

      {/* Quantidade */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Quantidade
        </Typography>
        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              placeholder="Ex: 10"
              fullWidth
              variant="outlined"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />
      </Grid>

      {/* Cor */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Cor
        </Typography>
        <Controller
          name="color"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Ex: Azul"
              fullWidth
              variant="outlined"
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          )}
        />
      </Grid>

      {/* Preço */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Preço (€)
        </Typography>
        <Controller
          name="price"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              placeholder="Ex: 10.50"
              fullWidth
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price?.message}
              inputProps={{ step: "0.01", min: "0" }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
