import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import useNotifications from "../../context/useNotifications/useNotifications";
import PageContainer from "../../components/PageContainer";
import CustomDataGrid from "../../components/grid/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { ICustomerTable } from "./models/Customer";
import { deleteCustomers, getCustomersTable } from "./services/CustomerService";
import CustomerColumns from "./components/grid/CustomerColumns";
import { GridEventListener } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading/useLoading";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "../../context/useModal/useModal";

export default function CustomersPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, startLoading, stopLoading } = useLoading();
  const { showError, showWarning } = useModal();

  const [customers, setCustomers] = useState<ICustomerTable[]>([]);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const loadData = useCallback(async () => {
    startLoading();
    getCustomersTable()
      .then((data) => {
        setCustomers(data);
        stopLoading();
      })
      .catch((e: Error) => {
        showError(e.message, "Erro ao tentar carregar os clientes.");
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
      navigate(`/customers/${row.id}`);
    },
    [navigate]
  );

  const handleCreateClick = useCallback(() => {
    navigate("/customers/new");
  }, [navigate]);

  const handleDeleteClick = useCallback(() => {
    startLoading();
    deleteCustomers(idsToDelete)
      .then((data) => {
        const allSuccess = data.every((x) => x.success);
        if (allSuccess) {
          notifications.show(
            `${
              idsToDelete.length === 1 ? "Cliente apagado" : "Clientes apagados"
            } com sucesso.`,
            {
              severity: "success",
              autoHideDuration: 5000
            }
          );
        } else {
          showError(
            data.map((x) => x.message).join("\n"),
            "Houve um erro ao tentar apagar clientes"
          );
        }
        handleRefresh();
      })
      .catch((e: Error) => {
        showError(e.message, "Houve um erro ao tentar apagar clientes");
        stopLoading();
      });
  }, [idsToDelete]);

  const handleDeleteModal = useCallback(() => {
    showWarning(
      `Tem a certeza que pretende apagar ${
        idsToDelete.length === 1
          ? "o cliente selecionado"
          : "os clientes selecionados"
      }?`,
      handleDeleteClick
    );
  }, [idsToDelete]);

  return (
    <PageContainer
      title={"Cientes"}
      breadcrumbs={[{ title: "Cientes" }]}
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
      <CustomDataGrid
        columns={CustomerColumns()}
        rows={customers}
        loading={loading}
        handleRowClick={handleRowClick}
        handleRefresh={handleRefresh}
        setIdsToDelete={setIdsToDelete}
      />
    </PageContainer>
  );
}
