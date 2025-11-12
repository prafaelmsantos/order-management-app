import * as React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IOrderSchema, IProductOrderSchema } from "../../services/OrderSchema";
import { getProducts } from "../../../products/services/ProductService";
import { useLoading } from "../../../../context/useLoading/useLoading";
import Grid from "@mui/material/GridLegacy";

export default function ProductTableForm({ disabled }: { disabled: boolean }) {
  const { control, setValue, watch } = useFormContext<IOrderSchema>();
  const { startLoading, stopLoading } = useLoading();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "productsOrders"
  });

  const [products, setProducts] = React.useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = React.useState<number | null>(null);

  const productsOrders = watch("productsOrders");

  // Carregar produtos
  React.useEffect(() => {
    (async () => {
      startLoading();
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        stopLoading();
      }
    })();
  }, [startLoading, stopLoading]);

  // Adicionar produto
  const handleAdd = () => {
    append({
      id: 1,
      productId: 0,
      color: "",
      unitPrice: 0,
      totalQuantity: 0,
      totalPrice: 0,
      zeroMonths: 0,
      oneMonth: 0,
      threeMonths: 0,
      sixMonths: 0,
      twelveMonths: 0,
      eighteenMonths: 0,
      isNew: true
    } as unknown as IProductOrderSchema);
    setOpenEditModal(fields.length); // abrir modal para novo
  };

  // Abrir modal
  const handleEditClick = (index: number) => {
    setOpenEditModal(index);
  };

  const handleDeleteClick = (index: number) => {
    remove(index);
  };

  const handleSaveModal = (index: number) => {
    const row = productsOrders[index];
    const totalQuantity =
      (row.zeroMonths || 0) +
      (row.oneMonth || 0) +
      (row.threeMonths || 0) +
      (row.sixMonths || 0) +
      (row.twelveMonths || 0) +
      (row.eighteenMonths || 0);
    const totalPrice = (row.unitPrice || 0) * totalQuantity;

    setValue(`productsOrders.${index}.totalQuantity`, totalQuantity);
    setValue(`productsOrders.${index}.totalPrice`, totalPrice);

    setOpenEditModal(null);
  };

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Produto",
      flex: 1,
      valueGetter: (params) => {
        const prod = products.find((p) => p.id === params);
        return prod?.reference ?? "";
      }
    },
    { field: "color", headerName: "Cor", flex: 1 },
    { field: "unitPrice", headerName: "Preço Unit. (€)", flex: 1 },
    { field: "totalQuantity", headerName: "Qtd Total", flex: 1 },
    { field: "totalPrice", headerName: "Preço Total (€)", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      flex: 1,
      getActions: ({ id }) => {
        const index = productsOrders.findIndex((r) => r.id === Number(id));
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEditClick(0)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Remover"
            onClick={() => handleDeleteClick(index)}
          />
        ];
      }
    }
  ];

  const quantityFields = [
    { name: "zeroMonths", label: "0 Meses" },
    { name: "oneMonth", label: "1 Mês" },
    { name: "threeMonths", label: "3 Meses" },
    { name: "sixMonths", label: "6 Meses" },
    { name: "twelveMonths", label: "12 Meses" },
    { name: "eighteenMonths", label: "18 Meses" }
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Tooltip title="Adicionar produto">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={disabled}
          sx={{ mb: 1 }}
        >
          Adicionar
        </Button>
      </Tooltip>

      <DataGrid
        rows={productsOrders}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[10]}
      />

      {/* Modal de edição */}
      <Dialog
        open={openEditModal !== null}
        onClose={() => setOpenEditModal(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent dividers>
          {openEditModal !== null && (
            <Grid container spacing={2}>
              {/* Produto */}
              <Grid item xs={12}>
                <Controller
                  name={`productsOrders.${0}.productId`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      value={products.find((p) => p.id === value) ?? null}
                      options={products}
                      getOptionLabel={(option) => option.reference || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value?.id
                      }
                      onChange={(_, product) => {
                        if (product) {
                          onChange(product.id);
                          setValue(
                            `productsOrders.${0}.unitPrice`,
                            product.unitPrice
                          );
                        } else {
                          onChange(0);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Produto"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Cor e Preço */}
              <Grid item xs={6}>
                <Controller
                  name={`productsOrders.${0}.color` as any}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Cor" fullWidth size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`productsOrders.${0}.unitPrice` as any}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Preço Unit. (€)"
                      type="number"
                      fullWidth
                      size="small"
                    />
                  )}
                />
              </Grid>

              {/* Quantidades */}
              {quantityFields.map((field, idx) => (
                <Grid item xs={4} sm={2} key={idx}>
                  <Controller
                    name={`productsOrders.${0}.${field.name}` as any}
                    control={control}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        label={field.label}
                        type="number"
                        size="small"
                        fullWidth
                        onChange={(e) =>
                          controllerField.onChange(
                            Math.max(Number(e.target.value) || 0, 0)
                          )
                        }
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(null)}>Cancelar</Button>
          <Button variant="contained" onClick={() => handleSaveModal(0!)}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
