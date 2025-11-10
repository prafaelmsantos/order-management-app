import { GridColDef } from "@mui/x-data-grid";
import { IProductTable, ProductKeys } from "../../models/Product";

export default function ProductColumns(): GridColDef<IProductTable>[] {
  return [
    {
      field: ProductKeys.id,
      headerName: "#",
      width: 100
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
      minWidth: 200
    },
    {
      field: ProductKeys.unitPrice,
      headerName: "Preço (€)",
      flex: 1,
      minWidth: 70
    },
    {
      field: ProductKeys.totalOrders,
      headerName: "Nº Encomendas",
      flex: 1,
      minWidth: 70
    }
  ];
}
