import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router";
import { useDialogs } from "../../context/useDialogs/useDialogs";
import useNotifications from "../../context/useNotifications/useNotifications";
import PageContainer from "../../components/PageContainer";
import CustomDataGrid from "../../components/grid/custom-data-grid";
import columns from "./components/grid/ProductColumns";
import { IProduct } from "./models/Product";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "./services/ProductService";
import { GridEventListener } from "@mui/x-data-grid";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const handleCreateClick = useCallback(() => {
    navigate("/products/new");
  }, [navigate]);

  const handleRowEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  const handleRowDelete = async (employee: IProduct) => {
    const confirmed = await dialogs.confirm(
      `Do you wish to delete ${employee.reference}?`,
      {
        title: `Delete employee?`,
        severity: "error",
        okText: "Delete",
        cancelText: "Cancel"
      }
    );

    if (confirmed) {
      try {
        notifications.show("Employee deleted successfully.", {
          severity: "success",
          autoHideDuration: 3000
        });
        //loadData();
      } catch (deleteError) {
        notifications.show(
          `Failed to delete employee. Reason:' ${
            (deleteError as Error).message
          }`,
          {
            severity: "error",
            autoHideDuration: 3000
          }
        );
      }
    }
  };

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
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
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
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
            Criar
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <CustomDataGrid
          columns={columns(handleRowEdit, handleRowDelete)}
          rows={products}
          loading={isLoading}
          handleRowClick={handleRowClick}
        />
      </Box>
    </PageContainer>
  );
}
