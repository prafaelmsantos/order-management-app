import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomerKeys, ICustomer } from "../../models/Customer";

export default function columns(
  handleRowEdit: (id: number) => void,
  handleRowDelete: (client: ICustomer) => void
): GridColDef<ICustomer>[] {
  return [
    {
      field: CustomerKeys.id,
      headerName: "#",
      width: 70
    },
    {
      field: CustomerKeys.fullName,
      headerName: "Nome Completo",
      flex: 1,
      minWidth: 100
    },
    {
      field: CustomerKeys.taxIdentificationNumber,
      headerName: "NIF",
      width: 100
    },
    {
      field: CustomerKeys.contact,
      headerName: "Contacto",
      width: 100
    },
    {
      field: CustomerKeys.fullAddress,
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
      renderCell: (params: GridRenderCellParams<ICustomer>) => (
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
