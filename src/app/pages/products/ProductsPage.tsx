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
import CustomDataGrid from "../../components/grid/custom-data-grid";
import { IProduct } from "./models/Product";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "./services/ProductService";
import { GridEventListener } from "@mui/x-data-grid";
import { useLoading } from "../../context/useLoading/useLoading";
import ProductColumns from "./components/grid/ProductColumns";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();

  const handleCreateClick = useCallback(() => {
    navigate("/products/new");
  }, [navigate]);

  const [products, setProducts] = useState<IProduct[]>([]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    startLoading();
    getProducts()
      .then((data) => setProducts(data))
      .catch((e) => {
        notifications.show("O carregamento de produtos falhou.", {
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
      navigate(`/products/${row.id}`);
    },
    [navigate]
  );

  return (
    <PageContainer
      title={"Produtos"}
      breadcrumbs={[{ title: "Produtos" }]}
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
          columns={ProductColumns()}
          rows={products}
          loading={isLoading}
          handleRowClick={handleRowClick}
        />
      </Box>
    </PageContainer>
  );
}
