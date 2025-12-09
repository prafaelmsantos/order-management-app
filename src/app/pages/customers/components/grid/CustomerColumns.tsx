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
      minWidth: 250
    },
    {
      field: CustomerKeys.taxIdentificationNumber,
      headerName: "NIF",
      flex: 1,
      width: 120
    },
    {
      field: CustomerKeys.contact,
      headerName: "Contacto",
      flex: 1,
      width: 120
    },
    {
      field: CustomerKeys.totalOrders,
      headerName: "Nº Encomendas",
      flex: 1,
      minWidth: 100
    },
    {
      field: CustomerKeys.createdDate,
      headerName: "Data/Hora",
      width: 200
    }
  ];
}
