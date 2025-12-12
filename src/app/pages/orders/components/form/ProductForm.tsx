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
  Tooltip,
  Typography
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
  gridClasses
} from "@mui/x-data-grid";

import { getProducts } from "../../../products/services/ProductService";
import { IProduct } from "../../../products/models/Product";
import {
  IProductOrder,
  IProductOrderTable,
  quantityFields
} from "../../models/Order";
import { ptPTDataGrid } from "../../../../components/grid/TranslationGrid";
import { useLoading } from "../../../../context/useLoading/useLoading";
import { useModal } from "../../../../context/useModal/useModal";

export default function ProductForm({
  validForm,
  disabled,
  productOrders,
  setProductOrders
}: {
  validForm: boolean;
  disabled: boolean;
  productOrders: IProductOrder[];
  setProductOrders: React.Dispatch<React.SetStateAction<IProductOrder[]>>;
}) {
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useModal();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openQuantities, setOpenQuantities] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 8
  });

  const loadData = useCallback(async () => {
    startLoading();
    getProducts()
      .then((data) => {
        setProducts(data);
        stopLoading();
      })
      .catch((e: Error) => {
        stopLoading();
        showError(e.message, "Erro ao tentar carregar produtos");
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRemoveProduct = (index: number) => {
    const newOrders = [...productOrders];
    newOrders.splice(index, 1);

    setProductOrders(newOrders);
  };

  const rows: IProductOrderTable[] = useMemo(
    () =>
      productOrders.map((productOrder, index) => ({
        id: productOrder.id ?? 0,
        productId: productOrder.productId,
        productDescription: productOrder.product?.description ?? "",
        color: productOrder.color ?? "",
        unitPrice: productOrder.unitPrice,
        index: index
      })),
    [productOrders]
  );

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Produto",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        return disabled ? (
          products.find((p) => p.id === params.row.productId)?.reference ?? ""
        ) : (
          <Autocomplete
            sx={{ mt: 1 }}
            value={products.find((p) => p.id === params.row.productId) || null}
            options={products}
            getOptionLabel={(option) => option.reference}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Sem produtos disponíveis"
            onChange={(_, value) => {
              setProductOrders((prev) => {
                const updatedProductOrders = [...prev];
                updatedProductOrders[params.row.index] = {
                  ...updatedProductOrders[params.row.index],
                  productId: value?.id ?? 0,
                  product: {
                    id: value?.id ?? 0,
                    reference: value?.reference ?? "",
                    description: value?.description ?? "",
                    unitPrice: value?.unitPrice ?? 0
                  },
                  color: null,
                  unitPrice: value?.unitPrice ?? 0
                };
                return updatedProductOrders;
              });
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" variant="outlined" />
            )}
          />
        );
      }
    },
    {
      field: "productDescription",
      headerName: "Descrição",
      width: 350,
      sortable: false,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "color",
      headerName: "Cor",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        return disabled ? (
          (params.row as IProductOrder).color ?? ""
        ) : (
          <TextField
            size="small"
            fullWidth
            sx={{ mt: 1 }}
            value={(params.row as IProductOrder).color ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setProductOrders((prev) => {
                const updatedProductOrders = [...prev];
                updatedProductOrders[params.row.index] = {
                  ...updatedProductOrders[params.row.index],
                  color: value
                };
                return updatedProductOrders;
              });
            }}
          />
        );
      }
    },
    {
      field: "sizes",
      headerName: "",
      width: 150,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={disabled ? "Ver" : "Editar"}>
          <IconButton
            color="primary"
            onClick={() => setOpenQuantities(params.row.index)}
          >
            {disabled ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
          </IconButton>
        </Tooltip>
      )
    },
    {
      field: "unitPrice",
      headerName: "Preço Unit. (€)",
      width: 150,
      sortable: false,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        const idx = params.row.index;
        return (
          !disabled && (
            <Tooltip title="Remover">
              <IconButton
                color="error"
                onClick={() => handleRemoveProduct(idx)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )
        );
      }
    }
  ];

  return (
    <>
      {!validForm && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {"Existem produtos invalidos."}
        </Typography>
      )}

      <div style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[11]}
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
          <Grid container spacing={2}>
            {openQuantities !== null &&
              quantityFields.map((field, i) => {
                const idx = openQuantities!;
                return (
                  <Grid item xs={3} key={i}>
                    <TextField
                      label={field.label}
                      type="number"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      value={
                        productOrders[idx][field.name as keyof IProductOrder] ??
                        0
                      }
                      onChange={(e) => {
                        const value = Math.max(Number(e.target.value), 0);

                        setProductOrders((prev) => {
                          const updatedProductOrders = [...prev];
                          updatedProductOrders[idx] = {
                            ...updatedProductOrders[idx],
                            [field.name]: value
                          };
                          return updatedProductOrders;
                        });
                      }}
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
