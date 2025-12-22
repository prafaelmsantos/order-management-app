import { useEffect, useState, useCallback, useMemo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { getProducts } from "../../../products/services/ProductService";
import { IProduct } from "../../../products/models/Product";
import { IProductOrder, IProductOrderTable } from "../../models/Order";
import { useLoading } from "../../../../context/useLoading/useLoading";
import { useModal } from "../../../../context/useModal/useModal";
import ProductCell from "../table/cell/ProductCell";
import ColorCell from "../table/cell/ColorCell";
import ProductTable from "../table/ProductTable";
import QuantityDialog from "../dialog/QuantityDialog";

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
            onClick={() => setOpenQuantities(params.row.id)}
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
      <ProductTable rows={rows} columns={columns} />

      <QuantityDialog
        disabled={disabled}
        openQuantities={openQuantities}
        setOpenQuantities={setOpenQuantities}
        productOrders={productOrders}
        setProductOrders={setProductOrders}
      />
    </>
  );
}
