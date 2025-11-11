import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router";
import useNotifications from "../../context/useNotifications/useNotifications";
import PageContainer from "../../components/PageContainer";
import CustomDataGrid from "../../components/grid/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { GridEventListener } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading/useLoading";
import { IOrderTable } from "./models/Order";
import { getOrders } from "./services/OrderService";
import OrderColumns from "./components/grid/OrderColumns";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();

  const handleCreateClick = useCallback(() => {
    navigate("/orders/new");
  }, [navigate]);

  const [orders, setOrders] = useState<IOrderTable[]>([]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    startLoading();
    getOrders()
      .then((data) => setOrders(data))
      .catch((e) => {
        notifications.show("O carregamento de encomendas falhou.", {
          severity: "error",
          autoHideDuration: 5000
        });
        console.error(e);
      });

    setIsLoading(false);
    stopLoading();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = useCallback(() => {
    if (!isLoading) {
      loadData();
    }
  }, [isLoading, loadData]);

  const handleRowClick = useCallback<GridEventListener<"rowClick">>(
    ({ row }) => {
      navigate(`/orders/${row.id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title={"Encomendas"}
      breadcrumbs={[{ title: "Encomendas" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Atualizar" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
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
          loading={isLoading}
          handleRowClick={handleRowClick}
        />
      </Box>
    </PageContainer>
  );
}
