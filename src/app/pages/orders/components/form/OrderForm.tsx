import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IOrderSchema, IProductOrderSchema } from "../../services/OrderSchema";
import { OrderStatus, OrderStatusLabel } from "../../models/Order";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoading } from "../../../../context/useLoading/useLoading";
import {
  getCustomer,
  getCustomers
} from "../../../customers/services/CustomerService";
import useNotifications from "../../../../context/useNotifications/useNotifications";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICustomer, ICustomerTable } from "../../../customers/models/Customer";
import { IProduct } from "../../../products/models/Product";
import { getProducts } from "../../../products/services/ProductService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ExportPDFButton from "../../../clients/components/ExportPDFButton";

interface IOrderFormProps {
  disabled?: boolean;
}

export function mapProductsForPDF(
  fields: IProductOrderSchema[],
  productsList: IProduct[],
  watch: any
) {
  return fields.map((fieldItem, idx) => {
    const getValue = (key: string) => {
      const value = watch(`productsOrders.${idx}.${key}`) || 0;
      return value === 0 ? "" : value; // se 0, retorna string vazia
    };

    const totalQuantity =
      (watch(`productsOrders.${idx}.oneMonth`) || 0) +
      (watch(`productsOrders.${idx}.threeMonths`) || 0) +
      (watch(`productsOrders.${idx}.sixMonths`) || 0) +
      (watch(`productsOrders.${idx}.twelveMonths`) || 0) +
      (watch(`productsOrders.${idx}.eighteenMonths`) || 0) +
      (watch(`productsOrders.${idx}.twentyFourMonths`) || 0) +
      (watch(`productsOrders.${idx}.thirtySixMonths`) || 0) +
      (watch(`productsOrders.${idx}.oneYear`) || 0) +
      (watch(`productsOrders.${idx}.twoYears`) || 0) +
      (watch(`productsOrders.${idx}.threeYears`) || 0) +
      (watch(`productsOrders.${idx}.fourYears`) || 0) +
      (watch(`productsOrders.${idx}.sixYears`) || 0) +
      (watch(`productsOrders.${idx}.eightYears`) || 0) +
      (watch(`productsOrders.${idx}.tenYears`) || 0) +
      (watch(`productsOrders.${idx}.twelveYears`) || 0);

    const unitPrice = fieldItem.unitPrice;
    const totalPrice = unitPrice * totalQuantity;

    return {
      reference:
        productsList.find((p) => p.id === fieldItem.productId)?.reference ?? "",
      color: fieldItem.color,
      unitPrice,
      totalQuantity,
      totalPrice,
      quantities: {
        "1 Mês": getValue("oneMonth"),
        "3 Meses": getValue("threeMonths"),
        "6 Meses": getValue("sixMonths"),
        "12 Meses": getValue("twelveMonths"),
        "18 Meses": getValue("eighteenMonths"),
        "24 Meses": getValue("twentyFourMonths"),
        "36 Meses": getValue("thirtySixMonths"),
        "1 Ano": getValue("oneYear"),
        "2 Anos": getValue("twoYears"),
        "3 Anos": getValue("threeYears"),
        "4 Anos": getValue("fourYears"),
        "6 Anos": getValue("sixYears"),
        "8 Anos": getValue("eightYears"),
        "10 Anos": getValue("tenYears"),
        "12 Anos": getValue("twelveYears")
      }
    };
  });
}

export default function OrderForm({ disabled }: IOrderFormProps) {
  const { startLoading, stopLoading } = useLoading();

  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<IOrderSchema>();

  console.log(errors);

  const [customers, setCustomers] = useState<ICustomerTable[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [customer, setCustomer] = useState<ICustomer>();

  const customerId = watch("customerId");

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
  }, []);

  const loadDataCustomer = useCallback(async () => {
    if (customerId) {
      startLoading();
      getCustomer(customerId)
        .then((data) => {
          setCustomer(data);
          stopLoading();
        })
        .catch((e: Error) => {
          console.error(e);
          stopLoading();
        });
    } else {
      setCustomer(undefined);
    }
  }, [customerId]);

  useEffect(() => {
    void loadDataCustomer();
  }, [customerId]);

  const loadDataProducts = useCallback(async () => {
    startLoading();
    getProducts()
      .then((data) => setProducts(data))
      .catch((e) => {
        console.error(e);
      });

    stopLoading();
  }, []);

  useEffect(() => {
    loadDataProducts();
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productsOrders"
  });

  const handleAddProduct = () => {
    append({
      id: 0,
      orderId: 0,
      productId: 0,
      unitPrice: 0,
      color: "",

      oneMonth: 0,
      threeMonths: 0,
      sixMonths: 0,
      twelveMonths: 0,
      eighteenMonths: 0,
      twentyFourMonths: 0,
      thirtySixMonths: 0,

      oneYear: 0,
      twoYears: 0,
      threeYears: 0,
      fourYears: 0,
      sixYears: 0,
      eightYears: 0,
      tenYears: 0,
      twelveYears: 0,

      totalQuantity: 0,
      totalPrice: 0
    } as IProductOrderSchema);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detalhes da Encomenda
      </Typography>
      <ExportPDFButton
        logoUrl="/logo.png"
        title="Relatório de Encomenda"
        customer={
          customer && {
            fullName: customer.fullName,
            taxIdentificationNumber: customer.taxIdentificationNumber,
            contact: customer.contact,
            address: customer.address,
            city: customer.city,
            postalCode: customer.postalCode
          }
        }
        products={mapProductsForPDF(fields, products, watch)}
      />
      <Divider sx={{ mb: 5 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Controller
            render={({ field: { onChange, ...others } }) => (
              <Autocomplete
                {...others}
                isOptionEqualToValue={(option, value) => option === value}
                options={customers.map((x) => x.id)}
                getOptionLabel={(option) =>
                  customers.find((x) => x.id === option)?.fullName ?? ""
                }
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
                onChange={(_, data) => onChange(data ?? 0)}
                noOptionsText="Nenhum cliente encontrado."
              />
            )}
            name={"customerId"}
            control={control}
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
                value={customer.taxIdentificationNumber}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Contacto"
                fullWidth
                variant="outlined"
                disabled
                value={customer.contact}
              />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ mt: 2 }}>
              <TextField
                label="Morada"
                fullWidth
                variant="outlined"
                disabled
                value={customer.address}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ mt: 2 }}>
              <TextField
                label="Código Postal"
                fullWidth
                variant="outlined"
                disabled
                value={customer.postalCode}
              />
            </Grid>
            <Grid item xs={12} sm={2} sx={{ mt: 2 }}>
              <TextField
                label="Cidade"
                fullWidth
                variant="outlined"
                disabled
                value={customer.city}
              />
            </Grid>
          </>
        )}

        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Estado
          </Typography>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                disabled={disabled}
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

        <Divider sx={{ mb: 5, mt: 5 }} />

        {/* Produtos */}
        <Grid item xs={12}>
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Produtos"
              action={
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddProduct}
                >
                  Adicionar Produto
                </Button>
              }
            />
            <CardContent>
              {/* Header */}
              <Grid
                container
                spacing={1}
                sx={{ fontWeight: 600, borderBottom: 1, mt: 2, mb: 3 }}
              ></Grid>

              {fields.map((fieldItem, idx) => (
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  key={fieldItem.id}
                  sx={{ mt: 1, mb: 2 }}
                >
                  {/* Referência */}
                  <Grid item xs={3}>
                    <Controller
                      name={`productsOrders.${idx}.productId`}
                      control={control}
                      render={({ field: { onChange, value, ...others } }) => (
                        <Autocomplete
                          {...others}
                          options={products}
                          getOptionLabel={(option) => option.reference ?? ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value?.id
                          }
                          value={products.find((p) => p.id === value) ?? null}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Referência"
                              size="small"
                              variant="outlined"
                              error={!!errors.productsOrders?.[idx]?.productId}
                              helperText={
                                errors.productsOrders?.[idx]?.productId?.message
                              }
                            />
                          )}
                          onChange={(_, selectedProduct) => {
                            if (selectedProduct) {
                              // Atualiza o id
                              onChange(selectedProduct.id ?? 0);

                              // Preenche automaticamente o preço
                              setValue(
                                `productsOrders.${idx}.unitPrice`,
                                selectedProduct.unitPrice ?? 0
                              );

                              // (Opcional) Preenche a descrição
                            } else {
                              // Limpa os campos se o produto for removido
                              onChange(0);
                              setValue(`productsOrders.${idx}.unitPrice`, 0);
                            }
                          }}
                          noOptionsText="Nenhum produto encontrado."
                        />
                      )}
                    />
                  </Grid>

                  {/* Preço */}
                  <Grid item xs={3}>
                    <TextField
                      label="Descrição."
                      size="small"
                      type="number"
                      fullWidth
                      disabled
                    />
                  </Grid>

                  {/* Cor */}
                  <Grid item xs={2}>
                    <Controller
                      name={`productsOrders.${idx}.color`}
                      control={control}
                      defaultValue={fieldItem.color}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Cor"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  {/* Preço */}
                  <Grid item xs={1}>
                    <Controller
                      name={`productsOrders.${idx}.unitPrice`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Preço Unit."
                          size="small"
                          fullWidth
                          disabled
                        />
                      )}
                    />
                  </Grid>

                  {/* Quantidade */}
                  <Grid item xs={1}>
                    <Controller
                      name={`productsOrders.${idx}.totalQuantity`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Qtd. Total"
                          size="small"
                          fullWidth
                          disabled
                          value={
                            (watch(`productsOrders.${idx}.oneMonth`) || 0) +
                            (watch(`productsOrders.${idx}.threeMonths`) || 0) +
                            (watch(`productsOrders.${idx}.sixMonths`) || 0) +
                            (watch(`productsOrders.${idx}.twelveMonths`) || 0) +
                            (watch(`productsOrders.${idx}.eighteenMonths`) ||
                              0) +
                            (watch(`productsOrders.${idx}.twentyFourMonths`) ||
                              0) +
                            (watch(`productsOrders.${idx}.thirtySixMonths`) ||
                              0) +
                            (watch(`productsOrders.${idx}.oneYear`) || 0) +
                            (watch(`productsOrders.${idx}.twoYears`) || 0) +
                            (watch(`productsOrders.${idx}.threeYears`) || 0) +
                            (watch(`productsOrders.${idx}.fourYears`) || 0) +
                            (watch(`productsOrders.${idx}.sixYears`) || 0) +
                            (watch(`productsOrders.${idx}.eightYears`) || 0) +
                            (watch(`productsOrders.${idx}.tenYears`) || 0) +
                            (watch(`productsOrders.${idx}.twelveYears`) || 0)
                          }
                        />
                      )}
                    />
                  </Grid>

                  {/* Total */}
                  <Grid item xs={1}>
                    <TextField
                      label="Total"
                      size="small"
                      value={(
                        (watch(`productsOrders.${idx}.unitPrice`) || 0) *
                        ((watch(`productsOrders.${idx}.oneMonth`) || 0) +
                          (watch(`productsOrders.${idx}.threeMonths`) || 0) +
                          (watch(`productsOrders.${idx}.sixMonths`) || 0) +
                          (watch(`productsOrders.${idx}.twelveMonths`) || 0) +
                          (watch(`productsOrders.${idx}.eighteenMonths`) || 0) +
                          (watch(`productsOrders.${idx}.twentyFourMonths`) ||
                            0) +
                          (watch(`productsOrders.${idx}.thirtySixMonths`) ||
                            0) +
                          (watch(`productsOrders.${idx}.oneYear`) || 0) +
                          (watch(`productsOrders.${idx}.twoYears`) || 0) +
                          (watch(`productsOrders.${idx}.threeYears`) || 0) +
                          (watch(`productsOrders.${idx}.fourYears`) || 0) +
                          (watch(`productsOrders.${idx}.sixYears`) || 0) +
                          (watch(`productsOrders.${idx}.eightYears`) || 0) +
                          (watch(`productsOrders.${idx}.tenYears`) || 0) +
                          (watch(`productsOrders.${idx}.twelveYears`) || 0))
                      ).toFixed(2)}
                      disabled
                      fullWidth
                    />
                  </Grid>

                  {/* Remover */}

                  <Grid item xs={1} display="flex" justifyContent="center">
                    <IconButton
                      color="error"
                      onClick={() => remove(idx)}
                      aria-label="Remover produto"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  {/* Quantidades agrupadas */}
                  <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2">
                        Tamanhos/Quantidades
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {/* 1 Mês */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.oneMonth`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="1 Mês"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={!!errors.productsOrders?.[idx]?.oneMonth}
                                helperText={
                                  errors.productsOrders?.[idx]?.oneMonth
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 3 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.threeMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="3 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.threeMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.threeMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 6 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.sixMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="3 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.sixMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.sixMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 12 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.twelveMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="12 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.twelveMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.twelveMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 18 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.eighteenMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="18 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.eighteenMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.eighteenMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 24 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.twentyFourMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="24 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]
                                    ?.twentyFourMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.twentyFourMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 36 Meses */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.thirtySixMonths`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="36 Meses"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]
                                    ?.thirtySixMonths
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.thirtySixMonths
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 1 Ano */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.oneYear`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="1 Ano"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={!!errors.productsOrders?.[idx]?.oneYear}
                                helperText={
                                  errors.productsOrders?.[idx]?.oneYear?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 2 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.twoYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="2 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={!!errors.productsOrders?.[idx]?.twoYears}
                                helperText={
                                  errors.productsOrders?.[idx]?.twoYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 3 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.threeYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="3 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.threeYears
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.threeYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 4 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.fourYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="3 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.fourYears
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.fourYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 6 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.sixYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="6 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={!!errors.productsOrders?.[idx]?.sixYears}
                                helperText={
                                  errors.productsOrders?.[idx]?.sixYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 8 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.eightYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="8 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.eightYears
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.eightYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 10 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.tenYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="10 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={!!errors.productsOrders?.[idx]?.tenYears}
                                helperText={
                                  errors.productsOrders?.[idx]?.tenYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* 12 Anos */}
                        <Grid item xs={3} sm={2} md={1} sx={{ mt: 2 }}>
                          <Controller
                            name={`productsOrders.${idx}.twelveYears`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="12 Anos"
                                fullWidth
                                onChange={(e) =>
                                  field.onChange(
                                    Number(e.target.value) >= 0
                                      ? Number(e.target.value)
                                      : 0
                                  )
                                }
                                slotProps={{
                                  input: {
                                    inputProps: { step: 1, min: 0 }
                                  }
                                }}
                                error={
                                  !!errors.productsOrders?.[idx]?.twelveYears
                                }
                                helperText={
                                  errors.productsOrders?.[idx]?.twelveYears
                                    ?.message
                                }
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
