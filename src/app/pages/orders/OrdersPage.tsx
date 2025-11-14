import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import useNotifications from "../../context/useNotifications/useNotifications";
import PageContainer from "../../components/PageContainer";
import CustomDataGrid from "../../components/grid/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { GridEventListener } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading/useLoading";
import { IOrderTable } from "./models/Order";
import { deleteOrders, getOrders } from "./services/OrderService";
import OrderColumns from "./components/grid/OrderColumns";
import { useModal } from "../../context/useModal/useModal";

export default function OrdersPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, startLoading, stopLoading } = useLoading();
  const { showError, showWarning } = useModal();

  const [orders, setOrders] = useState<IOrderTable[]>([]);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const loadData = useCallback(async () => {
    startLoading();
    getOrders()
      .then((data) => setOrders(data))
      .catch((e) =>
        showError(e.message, "Houve um erro ao tentar carregar as encomendas.")
      );
    stopLoading();
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
      navigate(`/orders/${row.id}`);
    },
    [navigate]
  );

  const handleCreateClick = useCallback(() => {
    navigate("/orders/new");
  }, [navigate]);

  const handleDeleteClick = useCallback(() => {
    startLoading();
    deleteOrders(idsToDelete)
      .then((data) => {
        const allSuccess = data.every((x) => x.success);
        if (allSuccess) {
          notifications.show(
            `${
              idsToDelete.length === 1
                ? "Encomenda apagada"
                : "Encomendas apagadas"
            } com sucesso.`,
            {
              severity: "success",
              autoHideDuration: 5000
            }
          );
        } else {
          showError(
            data.map((x) => x.message).join("\n"),
            "Houve um erro ao tentar apagar encomendas"
          );
        }
        handleRefresh();
      })
      .catch((e: Error) =>
        showError(e.message, "Houve um erro ao tentar apagar encomendas")
      );

    stopLoading();
  }, [idsToDelete]);

  const handleDeleteModal = useCallback(() => {
    showWarning(
      `Tem a certeza que pretende apagar ${
        idsToDelete.length === 1
          ? "a encomenda selecionadoa"
          : "as encomendas selecionadas"
      }?`,
      handleDeleteClick
    );
  }, [idsToDelete]);

  return (
    <PageContainer
      title={"Encomendas"}
      breadcrumbs={[{ title: "Encomendas" }]}
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
          columns={OrderColumns()}
          rows={orders}
          loading={loading}
          handleRowClick={handleRowClick}
          setIdsToDelete={setIdsToDelete}
          handleRefresh={handleRefresh}
        />
      </Box>
    </PageContainer>
  );
}
