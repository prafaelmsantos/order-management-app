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
import { ICustomer } from "./models/Customer";
import columns from "./components/grid/CustomerColumns";

export default function CustomersPage() {
  const navigate = useNavigate();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const handleCreateClick = React.useCallback(() => {
    navigate("/customers/new");
  }, [navigate]);

  const handleRowEdit = (id: number) => {
    navigate(`/customers/${id}/edit`);
  };

  const handleRowDelete = async (customer: ICustomer) => {
    const confirmed = await dialogs.confirm(
      `Do you wish to delete ${customer.fullName}?`,
      {
        title: `Delete employee?`,
        severity: "error",
        okText: "Delete",
        cancelText: "Cancel"
      }
    );

    if (confirmed) {
      try {
        //await deleteEmployee(Number(employee.id));

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

  return (
    <PageContainer
      title={"Clientes"}
      breadcrumbs={[{ title: "Clientes" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton size="small" aria-label="refresh">
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
          rows={mockClients}
          loading={false}
        />
      </Box>
    </PageContainer>
  );
}
