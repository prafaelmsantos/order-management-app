import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  Button,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { mockClients } from "../../../clients/data/clients";
import { IOrderSchema } from "../../services/OrderSchema";
import { Products } from "../../../products/Products";

export default function OrderForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<IOrderSchema>();

  return (
    <Grid container spacing={2}>
      {/* Cliente */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Cliente
        </Typography>
        <Controller
          render={({ field: { onChange, ...others } }) => (
            <Autocomplete
              {...others}
              sx={{ mt: 1 }}
              isOptionEqualToValue={(option, value) => option === value}
              options={mockClients.map((x) => x.id)}
              getOptionLabel={(option) =>
                mockClients.find((x) => x.id === option)?.fullName ?? ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  variant="standard"
                  error={!!errors.clientId}
                  helperText={errors.clientId?.message}
                />
              )}
              onChange={(_, data) => onChange(data)}
            />
          )}
          name={"clientId"}
        />
      </Grid>

      {/* Produtos */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Produtos
        </Typography>
        <Controller
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              onChange={(_, value) => field.onChange(value)}
              options={Products}
              getOptionLabel={(option) =>
                `${option.description} (${option.reference})`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecione um ou mais produtos"
                  error={!!errors.products}
                  helperText={
                    errors.products
                      ? "Selecione pelo menos um produto."
                      : undefined
                  }
                />
              )}
            />
          )}
        />
      </Grid>

      {/* Estado */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Estado
        </Typography>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              error={!!errors.state}
              helperText={errors.state?.message}
            >
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="em processamento">Em Processamento</MenuItem>
              <MenuItem value="concluída">Concluída</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
            </TextField>
          )}
        />
      </Grid>

      {/* Data */}
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Data de criação
        </Typography>
        <Controller
          name="createdAt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={
                field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                field.onChange(new Date(e.target.value).toISOString())
              }
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
