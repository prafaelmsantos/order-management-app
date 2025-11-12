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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
  gridClasses
} from "@mui/x-data-grid";
import { getProducts } from "../../../products/services/ProductService";
import { IProduct } from "../../../products/models/Product";
import { IProductOrder } from "../../models/Order";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useFormContext } from "react-hook-form";
import { IOrderSchema } from "../../services/OrderSchema";
import { ptPTDataGrid } from "../../../../components/grid/TranslationGrid";

export default function ProductNewForm({
  disabled,
  productOrders
}: {
  disabled: boolean;
  productOrders: IProductOrder[];
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IProductOrder[]>([]);
  const [openQuantities, setOpenQuantities] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });

  const { control, setValue, watch } = useFormContext<IOrderSchema>();

  useEffect(() => {
    // Atualiza o campo "productsOrders" do React Hook Form
    setValue("productsOrders", orders, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [orders, setValue]);

  // Load products
  const loadDataProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadDataProducts();
  }, [loadDataProducts]);

  useEffect(() => {
    setOrders(productOrders);
  }, [productOrders]);

  const handleAddProduct = () => {
    setOrders((prev) => [
      ...prev,
      {
        id: orders.length ? Math.max(...orders.map((o) => o.id ?? 0)) + 1 : 1,
        productId: 0,
        description: "",
        color: "",
        unitPrice: 0,
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
      }
    ]);
  };

  const handleRemoveProductByIndex = (index: number) => {
    setOrders((prev) => {
      const newOrders = [...prev]; // cria uma cópia do array
      newOrders.splice(index, 1); // remove 1 item na posição `index`
      return newOrders;
    });
  };

  console.log(orders);

  const handleProductChange = (index: number, product: IProduct | null) => {
    setOrders((prev) => {
      const newOrders = [...prev];
      if (product) {
        newOrders[index].productId = product.id ?? 0;
        newOrders[index].product = {
          id: product.id,
          reference: product.reference,
          description: product.description,
          unitPrice: product.unitPrice
        };
        newOrders[index].unitPrice = product.unitPrice;
      } else {
        newOrders[index].productId = 0;
        newOrders[index].product = undefined;
      }
      return newOrders;
    });
  };

  const handleColorChange = (index: number, color: string) => {
    setOrders((prev) => {
      const newOrders = [...prev];
      newOrders[index].color = color;
      return newOrders;
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
      orders.map((order, idx) => ({
        id: order.id,
        product: order.productId,
        description: order.product?.description,
        color: order.color,
        unitPrice: order.unitPrice,
        index: idx
      })),
    [orders]
  );

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: "Produto",
      width: 250,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return !disabled ? (
          <Autocomplete
            sx={{ mt: 1 }}
            value={products.find((p) => p.id === orders[idx].productId) || null}
            options={products}
            getOptionLabel={(option) => option.reference}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={disabled}
            onChange={(_, value) => handleProductChange(idx, value)}
            renderInput={(params) => (
              <TextField {...params} size="small" variant="outlined" />
            )}
          />
        ) : (
          products.find((p) => p.id === orders[idx].productId)?.reference ?? ""
        );
      }
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 600,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      sortable: false
    },
    {
      field: "color",
      headerName: "Cor",
      width: 200,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return !disabled ? (
          <TextField
            sx={{ mt: 1 }}
            size="small"
            fullWidth
            variant="outlined"
            value={orders[idx].color}
            disabled={disabled}
            onChange={(e) => handleColorChange(idx, e.target.value)}
          />
        ) : (
          orders[idx].color
        );
      }
    },
    {
      field: "unitPrice",
      headerName: "Preço Unit. (€)",
      width: 150,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      sortable: false
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
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
            <Tooltip title="Remover">
              <IconButton
                color="error"
                onClick={() => handleRemoveProductByIndex(idx)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  const displayedColumns = disabled ? columns.slice(0, -1) : columns;
  return (
    <>
      <Box
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}
      >
        {!disabled && (
          <Button
            variant="contained"
            onClick={handleAddProduct}
            startIcon={<AddIcon />}
          >
            Adicionar
          </Button>
        )}
      </Box>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          disableAutosize
          disableVirtualization
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          disableColumnSelector
          disableDensitySelector
          disableEval
          disableRowSelectionExcludeModel
          disableMultipleRowSelection
          rows={rows}
          columns={displayedColumns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress"
            },
            baseIconButton: {
              size: "small"
            }
          }}
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
              {
                outline: "none"
              },
            [`& .${gridClasses.row}:hover`]: {
              cursor: "pointer"
            },
            "& .MuiDataGrid-cellCheckbox": {
              padding: "8px" // espaço interno
            },
            "& .MuiCheckbox-root": {
              transform: "scale(1.4)" // aumenta o tamanho da checkbox
            }
          }}
        />
      </div>

      <Dialog
        open={openQuantities !== null}
        onClose={() => setOpenQuantities(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tamanhos / Quantidades</DialogTitle>
        <DialogContent dividers>
          {openQuantities !== null && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {quantityFields.map((field) => {
                const idx = openQuantities!;
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    type="number"
                    size="small"
                    style={{ width: 100 }}
                    value={(orders[idx] as any)[field.name] || 0}
                    onChange={(e) => {
                      const value = Math.max(Number(e.target.value), 0);
                      setOrders((prev) => {
                        const newOrders = [...prev];
                        (newOrders[idx] as any)[field.name] = value;
                        return newOrders;
                      });
                    }}
                  />
                );
              })}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQuantities(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
