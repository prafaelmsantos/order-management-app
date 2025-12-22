import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  gridClasses
} from "@mui/x-data-grid";

import { IProductOrderTable } from "../../models/Order";
import { ptPTDataGrid } from "../../../../components/grid/TranslationGrid";

export default function ProductTable({
  rows,
  columns
}: {
  rows: IProductOrderTable[];
  columns: GridColDef[];
}) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15
  });
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[15]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        localeText={{
          ...ptPTDataGrid,
          paginationDisplayedRows: (params: {
            from: number;
            to: number;
            count: number;
          }) => `${params.from} de ${params.count}`
        }}
        sx={{
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent"
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
            { outline: "none" },
          [`& .${gridClasses.row}:hover`]: { cursor: "pointer" }
        }}
      />
    </div>
  );
}
