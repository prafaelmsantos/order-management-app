import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import { ClientKeys, IClient } from "../../models/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function columns(
  handleRowEdit: (id: number) => void,
  handleRowDelete: (client: IClient) => void
): GridColDef<IClient>[] {
  return [
    {
      field: ClientKeys.id,
      headerName: "#",
      width: 70
    },
    {
      field: ClientKeys.fullName,
      headerName: "Nome Completo",
      flex: 1,
      minWidth: 100
    },
    {
      field: ClientKeys.taxIdentificationNumber,
      headerName: "NIF",
      width: 100
    },
    {
      field: ClientKeys.contact,
      headerName: "Contacto",
      width: 100
    },
    {
      field: ClientKeys.fullAddress,
      headerName: "Morada",
      flex: 1,
      minWidth: 150
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IClient>) => (
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
