import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { IOrderSchema, IProductOrderSchema } from "../../services/OrderSchema";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "../../../../context/useLoading/useLoading";
import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct } from "../../../products/models/Product";
import { getProducts } from "../../../products/services/ProductService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IProductOrder } from "../../models/Order";

export default function ProductForm({ disabled }: { disabled: boolean }) {
  const { startLoading, stopLoading } = useLoading();

  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<IOrderSchema>();

  const [products, setProducts] = useState<IProduct[]>([]);

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
  }, [loadDataProducts]);

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

      zeroMonths: 0,
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
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        {!disabled && (
          <Button variant="contained" size="small" onClick={handleAddProduct}>
            <AddIcon fontSize="small" />
          </Button>
        )}
      </Grid>

      {errors.productsOrders?.message}

      {!!errors.productsOrders ? (
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="error"
            align="center" // centraliza horizontalmente
            sx={{ mt: 1 }}
          >
            {errors.productsOrders.message ?? "Ocorreu um erro nos produtos."}
          </Typography>
        </Grid>
      ) : (
        fields.map((productOrder, idx) => {
          const product = watch(`productsOrders.${idx}.product`) as
            | IProduct
            | undefined;

          const productOrderWatch = watch(`productsOrders.${idx}`) as
            | IProductOrder
            | undefined;

          const totalQuantity = productOrderWatch
            ? productOrderWatch.oneMonth +
              productOrderWatch.threeMonths +
              productOrderWatch.sixMonths +
              productOrderWatch.twelveMonths +
              productOrderWatch.eighteenMonths +
              productOrderWatch.twentyFourMonths +
              productOrderWatch.thirtySixMonths +
              productOrderWatch.oneYear +
              productOrderWatch.twoYears +
              productOrderWatch.threeYears +
              productOrderWatch.fourYears +
              productOrderWatch.sixYears +
              productOrderWatch.eightYears +
              productOrderWatch.tenYears +
              productOrderWatch.twelveYears
            : 0;

          const unitPrice = product ? product.unitPrice : 0;

          return (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={productOrder.id}
              sx={{ mt: 1, mb: 2 }}
            >
              {/* Referência */}
              <Grid item xs={2}>
                <Controller
                  name={`productsOrders.${idx}.productId`}
                  control={control}
                  disabled={disabled}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      value={products.find((x) => x.id === value) ?? null}
                      options={products}
                      getOptionLabel={(option) => option.reference ?? ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      disabled={disabled}
                      onChange={(_, product) => {
                        if (product) {
                          onChange(product.id);
                          setValue(`productsOrders.${idx}.product`, {
                            id: product.id,
                            reference: product.reference,
                            description: product.description,
                            unitPrice: product.unitPrice
                          });
                        } else {
                          onChange(0);
                          setValue(`productsOrders.${idx}.product`, undefined);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          size="small"
                          label="Produto"
                          fullWidth
                          variant="outlined"
                          error={!!errors.productsOrders?.[idx]?.productId}
                          helperText={
                            errors.productsOrders?.[idx]?.productId?.message
                          }
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Preço */}
              <Grid item xs={4.5}>
                <TextField
                  label="Descrição"
                  fullWidth
                  variant="outlined"
                  disabled
                  size="small"
                  defaultValue={""}
                  value={product?.description ?? ""}
                />
              </Grid>

              {/* Cor */}
              <Grid item xs={1.5}>
                <Controller
                  name={`productsOrders.${idx}.color`}
                  control={control}
                  disabled={disabled}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField {...field} label="Cor" size="small" fullWidth />
                  )}
                />
              </Grid>

              {/* Preço */}
              <Grid item xs={1}>
                <TextField
                  label="Preço Unit. (€)"
                  fullWidth
                  variant="outlined"
                  disabled
                  type="number"
                  size="small"
                  defaultValue={""}
                  value={product?.unitPrice ?? 0}
                />
              </Grid>

              {/* Quantidade */}
              <Grid item xs={1}>
                <TextField
                  label="Qtd. Total"
                  size="small"
                  fullWidth
                  value={totalQuantity}
                  disabled
                />
              </Grid>

              {/* Total */}
              <Grid item xs={1}>
                <TextField
                  label="Total"
                  size="small"
                  value={totalQuantity * unitPrice}
                  disabled
                  fullWidth
                />
              </Grid>

              {/* Remover */}
              <Grid item xs={1} display="flex" justifyContent="center">
                {!disabled && (
                  <IconButton
                    color="error"
                    onClick={() => remove(idx)}
                    aria-label="Remover produto"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
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
                    {/* 0 Meses */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.oneMonth`}
                        control={control}
                        disabled={disabled}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            type="number"
                            label="0 Meses"
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
                              errors.productsOrders?.[idx]?.oneMonth?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 1 Mês */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.oneMonth`}
                        control={control}
                        disabled={disabled}
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
                              errors.productsOrders?.[idx]?.oneMonth?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 3 Meses */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.threeMonths`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.threeMonths}
                            helperText={
                              errors.productsOrders?.[idx]?.threeMonths?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 6 Meses */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.sixMonths`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.sixMonths}
                            helperText={
                              errors.productsOrders?.[idx]?.sixMonths?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 12 Meses */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.twelveMonths`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.twelveMonths}
                            helperText={
                              errors.productsOrders?.[idx]?.twelveMonths
                                ?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 18 Meses */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.eighteenMonths`}
                        control={control}
                        disabled={disabled}
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
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.twentyFourMonths`}
                        control={control}
                        disabled={disabled}
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
                              !!errors.productsOrders?.[idx]?.twentyFourMonths
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
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.thirtySixMonths`}
                        control={control}
                        disabled={disabled}
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
                              !!errors.productsOrders?.[idx]?.thirtySixMonths
                            }
                            helperText={
                              errors.productsOrders?.[idx]?.thirtySixMonths
                                ?.message
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {/* 1 Ano */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.oneYear`}
                        control={control}
                        disabled={disabled}
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
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.twoYears`}
                        control={control}
                        disabled={disabled}
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
                              errors.productsOrders?.[idx]?.twoYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 3 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.threeYears`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.threeYears}
                            helperText={
                              errors.productsOrders?.[idx]?.threeYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 4 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.fourYears`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.fourYears}
                            helperText={
                              errors.productsOrders?.[idx]?.fourYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 6 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.sixYears`}
                        control={control}
                        disabled={disabled}
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
                              errors.productsOrders?.[idx]?.sixYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 8 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.eightYears`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.eightYears}
                            helperText={
                              errors.productsOrders?.[idx]?.eightYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 10 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.tenYears`}
                        control={control}
                        disabled={disabled}
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
                              errors.productsOrders?.[idx]?.tenYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* 12 Anos */}
                    <Grid item xs={3} sm={2} md={1}>
                      <Controller
                        name={`productsOrders.${idx}.twelveYears`}
                        control={control}
                        disabled={disabled}
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
                            error={!!errors.productsOrders?.[idx]?.twelveYears}
                            helperText={
                              errors.productsOrders?.[idx]?.twelveYears?.message
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}
