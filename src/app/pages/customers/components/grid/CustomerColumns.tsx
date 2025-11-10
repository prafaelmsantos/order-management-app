import { GridColDef } from "@mui/x-data-grid";
import { CustomerKeys, ICustomerTable } from "../../models/Customer";

export default function CustomerColumns(): GridColDef<ICustomerTable>[] {
  return [
    {
      field: CustomerKeys.id,
      headerName: "#",
      width: 70
    },
    {
      field: CustomerKeys.fullName,
      headerName: "Nome",
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
    }
  ];
}
