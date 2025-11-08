import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { IOrder, OrderKeys } from "../../models/Order";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function orderColumns(
  handleRowEdit: (id: number) => void,
  handleRowDelete: (product: IOrder) => void
): GridColDef<IOrder>[] {
  return [
    {
      field: OrderKeys.id,
      headerName: "#",
      width: 80
    },
    {
      field: OrderKeys.client,
      headerName: "Cliente",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<IOrder>) =>
        params.row.client?.fullName || "—"
    },
    {
      field: OrderKeys.state,
      headerName: "Estado",
      width: 150,
      renderCell: (params: GridRenderCellParams<IOrder>) => {
        const state = params.row.state;
        const color =
          state === "pendente"
            ? "orange"
            : state === "em processamento"
            ? "blue"
            : "green";
        return (
          <span style={{ color, fontWeight: 500, textTransform: "capitalize" }}>
            {state}
          </span>
        );
      }
    },
    {
      field: OrderKeys.createdAt,
      headerName: "Data",
      width: 150,
      renderCell: (params: GridRenderCellParams<IOrder>) =>
        dayjs(params.row.createdAt).format("DD/MM/YYYY HH:mm")
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IOrder>) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleRowEdit(Number(params.row.id))}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Excluir"
            onClick={() => handleRowDelete(params.row)}
          />
        </>
      )
    }
  ];
}
