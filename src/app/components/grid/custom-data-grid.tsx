import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { ptPTDataGrid } from "./translation-grid";

interface ITable {
  rows: any[];
  loading: boolean;
  columns: GridColDef[];
  setIdsToDelete?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CustomDataGrid({
  rows,
  loading,
  columns,
  setIdsToDelete
}: ITable) {
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <DataGrid
        rows={rows}
        rowCount={rows.length}
        columns={columns}
        pagination
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        showToolbar
        disableColumnMenu
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,

            quickFilterProps: { debounceMs: 250 }
          },
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress"
          },
          baseIconButton: {
            size: "small"
          }
        }}
        localeText={ptPTDataGrid}
        onStateChange={(data) =>
          setIdsToDelete && setIdsToDelete(data.rowSelection as number[])
        }
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent"
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none"
            },
          [`& .${gridClasses.row}:hover`]: {
            cursor: "pointer"
          }
        }}
        disableColumnFilter
      />
    </Box>
  );
}
