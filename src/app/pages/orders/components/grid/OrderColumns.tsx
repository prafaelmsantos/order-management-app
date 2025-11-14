import { GridColDef } from "@mui/x-data-grid";
import { IOrderTable, OrderKeys } from "../../models/Order";

export default function OrderColumns(): GridColDef<IOrderTable>[] {
  return [
    {
      field: OrderKeys.id,
      headerName: "#",
      width: 80
    },
    {
      field: OrderKeys.customerFullName,
      headerName: "Cliente",
      flex: 1,
      minWidth: 200
    },
    {
      field: OrderKeys.totalQuantity,
      headerName: "Total Produtos (Unid.)",
      flex: 1,
      minWidth: 80
    },
    {
      field: OrderKeys.totalPrice,
      headerName: "Total Produtos (€)",
      flex: 1,
      minWidth: 80
    },
    {
      field: OrderKeys.createdDate,
      headerName: "Data",
      width: 200
    }
  ];
}
