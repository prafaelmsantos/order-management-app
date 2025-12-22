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
  Tooltip
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
import ProductCell from "./cell/ProductCell";
import ColorCell from "./cell/ColorCell";

export default function ProductForm({
  disabled,
  productOrders,
  setProductOrders
}: {
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
    pageSize: 15
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

  const handleRemoveProduct = (id: number) =>
    setProductOrders((prev) => prev.filter((row) => row.id !== id));

  const rows: IProductOrderTable[] = useMemo(
    () =>
      productOrders.map((productOrder) => ({
        id: productOrder.id ?? 0,
        productId: productOrder.productId,
        productDescription: productOrder.product?.description ?? "",
        color: productOrder.color ?? "",
        unitPrice: productOrder.unitPrice
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
      renderCell: (params: GridRenderCellParams) => (
        <ProductCell
          params={params}
          disabled={disabled}
          products={products}
          setProductOrders={setProductOrders}
        />
      )
    },
    {
      field: "productDescription",
      headerName: "Descrição",
      width: 300,
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
      renderCell: (params: GridRenderCellParams) => (
        <ColorCell
          params={params}
          disabled={disabled}
          setProductOrders={setProductOrders}
        />
      )
    },

    {
      field: "sizes",
      headerName: "",
      width: 100,
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
        return (
          !disabled && (
            <Tooltip title="Remover">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveProduct(params.row.id)}
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
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          density="compact"
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[12]}
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
