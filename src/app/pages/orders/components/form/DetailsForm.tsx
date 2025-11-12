import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IOrderSchema } from "../../services/OrderSchema";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "../../../../context/useLoading/useLoading";
import { getCustomers } from "../../../customers/services/CustomerService";
import { ICustomer } from "../../../customers/models/Customer";
import { OrderStatus, OrderStatusLabel } from "../../models/Order";

interface ICustomerFormProps {
  disabled: boolean;
}

export default function DetailsForm({ disabled }: ICustomerFormProps) {
  const { startLoading, stopLoading } = useLoading();
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<IOrderSchema>();

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const customer = watch("customer") as ICustomer;

  const loadDataCustomers = useCallback(async () => {
    startLoading();
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((e) => {
        console.error(e);
      });

    stopLoading();
  }, []);

  useEffect(() => {
    loadDataCustomers();
  }, [loadDataCustomers]);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={8}>
          <Controller
            name="customerId"
            control={control}
            disabled={disabled}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                value={customers.find((x) => x.id === value) ?? null}
                options={customers}
                getOptionLabel={(option) => option.fullName ?? ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disabled={disabled}
                onChange={(_, customer) => {
                  if (customer) {
                    onChange(customer.id);
                    setValue("customer", {
                      id: customer.id,
                      fullName: customer.fullName,
                      taxIdentificationNumber: customer.taxIdentificationNumber,
                      contact: customer.contact,
                      address: customer.address,
                      postalCode: customer.postalCode,
                      city: customer.city
                    });
                  } else {
                    onChange(0);
                    setValue("customer", undefined);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Cliente"
                    fullWidth
                    variant="outlined"
                    error={!!errors.customerId}
                    helperText={errors.customerId?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        {customer && (
          <>
            <Grid item xs={12} sm={2}>
              <TextField
                label="NIF"
                fullWidth
                variant="outlined"
                disabled
                value={customer.taxIdentificationNumber ?? ""}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Contacto"
                fullWidth
                variant="outlined"
                disabled
                value={customer.contact ?? ""}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Morada"
                fullWidth
                variant="outlined"
                disabled
                value={customer.address ?? ""}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Código Postal"
                fullWidth
                variant="outlined"
                disabled
                value={customer.postalCode ?? ""}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Cidade"
                fullWidth
                variant="outlined"
                disabled
                value={customer.city ?? ""}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
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
    </>
  );
}
