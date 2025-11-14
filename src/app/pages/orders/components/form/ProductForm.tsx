import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Autocomplete,
  Box,
  Tooltip
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
  gridClasses
} from "@mui/x-data-grid";
import { useFormContext, Controller } from "react-hook-form";

import { getProducts } from "../../../products/services/ProductService";
import { IProduct } from "../../../products/models/Product";
import { IProductOrder } from "../../models/Order";
import { IOrderSchema } from "../../services/OrderSchema";
import { ptPTDataGrid } from "../../../../components/grid/TranslationGrid";

export default function ProductForm({ disabled }: { disabled: boolean }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openQuantities, setOpenQuantities] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });

  const { control, setValue, watch } = useFormContext<IOrderSchema>();
  const productOrders = watch("productsOrders") || [];

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = () => {
    const newProduct: IProductOrder = {
      id: productOrders.length
        ? Math.max(...productOrders.map((o) => o.id ?? 0)) + 1
        : 1,
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
    };

    setValue("productsOrders", [...productOrders, newProduct], {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleRemoveProduct = (index: number) => {
    const newOrders = [...productOrders];
    newOrders.splice(index, 1);
    setValue("productsOrders", newOrders, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const quantityFields = [
    { name: "zeroMonths", label: "0 Meses" },
    { name: "oneMonth", label: "1 Mês" },
    { name: "threeMonths", label: "3 Meses" },
    { name: "sixMonths", label: "6 Meses" },
    { name: "twelveMonths", label: "12 Meses" },
    { name: "eighteenMonths", label: "18 Meses" },
    { name: "twentyFourMonths", label: "24 Meses" },
    { name: "thirtySixMonths", label: "36 Meses" },
    { name: "oneYear", label: "1 Ano" },
    { name: "twoYears", label: "2 Anos" },
    { name: "threeYears", label: "3 Anos" },
    { name: "fourYears", label: "4 Anos" },
    { name: "sixYears", label: "6 Anos" },
    { name: "eightYears", label: "8 Anos" },
    { name: "tenYears", label: "10 Anos" },
    { name: "twelveYears", label: "12 Anos" }
  ];

  const rows = useMemo(
    () =>
      productOrders.map((order, idx) => ({
        id: order.id,
        product: order.productId,
        description: order.product?.description,
        color: order.color,
        unitPrice: order.unitPrice,
        index: idx
      })),
    [productOrders]
  );

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Produto",
      width: 250,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          <Controller
            name={`productsOrders.${idx}.productId`}
            control={control}
            render={({ field }) => (
              <Autocomplete
                sx={{ mt: 1 }}
                value={products.find((p) => p.id === field.value) || null}
                options={products}
                getOptionLabel={(option) => option.reference}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disabled={disabled}
                onChange={(_, value) => {
                  field.onChange(value?.id ?? 0);
                  setValue(`productsOrders.${idx}.product`, value || undefined);
                  setValue(
                    `productsOrders.${idx}.unitPrice`,
                    value?.unitPrice ?? 0
                  );
                  setValue(
                    `productsOrders.${idx}.product.description`,
                    value?.description ?? ""
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" variant="outlined" />
                )}
              />
            )}
          />
        );
      }
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 600,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          <Controller
            name={`productsOrders.${idx}.product.description`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                disabled
              />
            )}
          />
        );
      }
    },
    {
      field: "color",
      headerName: "Cor",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          <Controller
            name={`productsOrders.${idx}.color`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                disabled={disabled}
              />
            )}
          />
        );
      }
    },
    {
      field: "unitPrice",
      headerName: "Preço Unit. (€)",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          <Controller
            name={`productsOrders.${idx}.unitPrice`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                disabled
              />
            )}
          />
        );
      }
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          <>
            <Tooltip title="Editar tamanhos">
              <IconButton
                color="primary"
                onClick={() => setOpenQuantities(idx)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
            {!disabled && (
              <Tooltip title="Remover">
                <IconButton
                  color="error"
                  onClick={() => handleRemoveProduct(idx)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      }
    }
  ];

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        {!disabled && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
          >
            Adicionar
          </Button>
        )}
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          localeText={{
            ...ptPTDataGrid,
            paginationDisplayedRows: (params: {
              from: number;
              to: number;
              count: number;
            }) => `${params.from} de ${params.count}`
          }}
          sx={{
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent"
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              { outline: "none" },
            [`& .${gridClasses.row}:hover`]: { cursor: "pointer" }
          }}
        />
      </div>

      <Dialog open={openQuantities !== null} maxWidth="md" fullWidth>
        <DialogTitle>Tamanhos / Quantidades</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {openQuantities !== null &&
              quantityFields.map((field) => {
                const idx = openQuantities!;
                return (
                  <Grid item xs={3}>
                    <Controller
                      key={field.name}
                      name={`productsOrders.${idx}.${field.name}` as any}
                      control={control}
                      render={({ field: f }) => (
                        <TextField
                          {...f}
                          label={field.label}
                          type="number"
                          size="small"
                          onChange={(e) =>
                            f.onChange(Math.max(Number(e.target.value), 0))
                          }
                        />
                      )}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQuantities(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
