import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct, ProductKeys } from "../../models/Product";

export default function productColumns(
  handleRowEdit: (id: number) => void,
  handleRowDelete: (product: IProduct) => void
): GridColDef<IProduct>[] {
  return [
    {
      field: ProductKeys.id,
      headerName: "#",
      width: 70
    },
    {
      field: ProductKeys.reference,
      headerName: "Referência",
      flex: 1,
      minWidth: 100
    },
    {
      field: ProductKeys.description,
      headerName: "Descrição",
      flex: 1,
      minWidth: 150
    },
    {
      field: ProductKeys.quantity,
      headerName: "Quantidade",
      width: 100
    },
    {
      field: ProductKeys.color,
      headerName: "Cor",
      width: 100
    },
    {
      field: ProductKeys.price,
      headerName: "Preço",
      width: 100
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<IProduct>) => (
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
