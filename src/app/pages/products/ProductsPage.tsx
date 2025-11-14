import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import useNotifications from "../../context/useNotifications/useNotifications";
import PageContainer from "../../components/PageContainer";
import CustomDataGrid from "../../components/grid/CustomDataGrid";
import { IProductTable } from "./models/Product";
import { useCallback, useEffect, useState } from "react";
import { deleteProducts, getProductsTable } from "./services/ProductService";
import { GridEventListener } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading/useLoading";
import ProductColumns from "./components/grid/ProductColumns";
import { useModal } from "../../context/useModal/useModal";

export default function ProductsPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, startLoading, stopLoading } = useLoading();
  const { showError, showWarning } = useModal();

  const [products, setProducts] = useState<IProductTable[]>([]);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const loadData = useCallback(async () => {
    startLoading();
    getProductsTable()
      .then((data) => {
        setProducts(data);
        stopLoading();
      })
      .catch((e) => {
        showError(e.message, "Houve um erro ao tentar carregar os produtos.");
        stopLoading();
      });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = useCallback(
    () => loadData(),
    [startLoading, stopLoading, loadData]
  );

  const handleRowClick = useCallback<GridEventListener<"rowClick">>(
    ({ row }) => {
      navigate(`/products/${row.id}`);
    },
    [navigate]
  );

  const handleCreateClick = useCallback(() => {
    navigate("/products/new");
  }, [navigate]);

  const handleDeleteClick = useCallback(() => {
    startLoading();
    deleteProducts(idsToDelete)
      .then((data) => {
        const allSuccess = data.every((x) => x.success);
        if (allSuccess) {
          notifications.show(
            `${
              idsToDelete.length === 1 ? "Produto apagado" : "Produtos apagados"
            } com sucesso.`,
            {
              severity: "success",
              autoHideDuration: 5000
            }
          );
        } else {
          showError(
            data.map((x) => x.message).join("\n"),
            "Houve um erro ao tentar apagar produtos"
          );
        }
        handleRefresh();
      })
      .catch((e: Error) => {
        showError(e.message, "Houve um erro ao tentar apagar produtos");
        stopLoading();
      });
  }, [idsToDelete]);

  const handleDeleteModal = useCallback(() => {
    showWarning(
      `Tem a certeza que pretende apagar ${
        idsToDelete.length === 1
          ? "o produto selecionado"
          : "os produtos selecionados"
      }?`,
      handleDeleteClick
    );
  }, [idsToDelete]);

  return (
    <PageContainer
      title={"Produtos"}
      breadcrumbs={[{ title: "Produtos" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={2}>
          {idsToDelete.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteModal}
              startIcon={<DeleteIcon />}
            >
              Apagar
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Adicionar
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <CustomDataGrid
          columns={ProductColumns()}
          rows={products}
          loading={loading}
          handleRowClick={handleRowClick}
          handleRefresh={handleRefresh}
          setIdsToDelete={setIdsToDelete}
        />
      </Box>
    </PageContainer>
  );
}
