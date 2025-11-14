import { Controller, useFormContext } from "react-hook-form";
import { TextField, Typography, Divider, InputAdornment } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IProductSchema } from "../../services/ProductSchema";
import { Box } from "@mui/system";

export default function ProductForm({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors }
  } = useFormContext<IProductSchema>();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Divider sx={{ mb: 5 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="reference"
            control={control}
            disabled={disabled}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Referência"
                fullWidth
                variant="outlined"
                error={!!errors.reference}
                helperText={errors.reference?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="unitPrice"
            control={control}
            disabled={disabled}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Preço"
                type="number"
                fullWidth
                variant="outlined"
                error={!!errors.unitPrice}
                helperText={errors.unitPrice?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                    inputProps: { step: 1, min: 0 }
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Controller
            name="description"
            control={control}
            disabled={disabled}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Descrição"
                fullWidth
                multiline
                minRows={8}
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
