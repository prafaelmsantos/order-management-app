import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridEventListener,
  GridRowSelectionModel
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { ptPTDataGrid } from "./TranslationGrid";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";

import SearchIcon from "@mui/icons-material/Search";
import React from "react";

type OwnerState = {
  expanded: boolean;
};

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center"
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: "1 / 1",
    width: "min-content",
    height: "min-content",
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? "none" : "auto",
    transition: theme.transitions.create(["opacity"])
  })
);

const StyledTextField = styled(TextField)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: ownerState.expanded ? 260 : "var(--trigger-width)",
  opacity: ownerState.expanded ? 1 : 0,
  transition: theme.transitions.create(["width", "opacity"])
}));

interface ITable {
  rows: any[];
  loading: boolean;
  columns: GridColDef[];
  setIdsToDelete: React.Dispatch<React.SetStateAction<number[]>>;
  handleRowClick: GridEventListener<"rowClick">;
  handleRefresh: () => void;
}

export default function CustomDataGrid({
  rows,
  loading,
  columns,
  setIdsToDelete,
  handleRowClick,
  handleRefresh
}: ITable) {
  function CustomToolbar() {
    return (
      <Toolbar>
        <Tooltip title="Atualizar">
          <ToolbarButton onClick={handleRefresh}>
            <RefreshIcon fontSize="small" />
          </ToolbarButton>
        </Tooltip>

        <Tooltip title="Colunas">
          <ColumnsPanelTrigger render={<ToolbarButton />}>
            <ViewColumnIcon fontSize="small" />
          </ColumnsPanelTrigger>
        </Tooltip>

        <StyledQuickFilter>
          <QuickFilterTrigger
            render={(triggerProps, state) => (
              <Tooltip title="Pesquisar" enterDelay={0}>
                <StyledToolbarButton
                  {...triggerProps}
                  ownerState={{ expanded: state.expanded }}
                  color="default"
                  aria-disabled={state.expanded}
                >
                  <SearchIcon fontSize="small" />
                </StyledToolbarButton>
              </Tooltip>
            )}
          />

          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                aria-label="Search"
                placeholder="Pesquisar..."
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                          material={{ sx: { marginRight: -0.75 } }}
                        >
                          <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input
                  },
                  ...controlProps.slotProps
                }}
              />
            )}
          />
        </StyledQuickFilter>
      </Toolbar>
    );
  }

  return (
    <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        pagination
        loading={loading}
        disableRowSelectionOnClick
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
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress"
          },
          baseIconButton: {
            size: "small"
          }
        }}
        localeText={{
          ...ptPTDataGrid,
          paginationDisplayedRows: (params: {
            from: number;
            to: number;
            count: number;
          }) => `${params.from} de ${params.count}`
        }}
        onRowSelectionModelChange={(data: GridRowSelectionModel) =>
          setIdsToDelete(Array.from(data.ids as Set<number>))
        }
        disableRowSelectionExcludeModel
        pageSizeOptions={[5, 10, 25, 50]}
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
          },
          "& .MuiDataGrid-cellCheckbox": {
            padding: "8px"
          },
          "& .MuiCheckbox-root": {
            transform: "scale(1.4)"
          }
        }}
        disableColumnFilter
        onRowClick={handleRowClick}
        slots={{ toolbar: CustomToolbar }}
      />
    </Box>
  );
}
