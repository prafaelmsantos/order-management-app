import { GridColDef } from "@mui/x-data-grid";
import { IProduct, ProductKeys } from "../../models/Product";

export default function ProductColumns(): GridColDef<IProduct>[] {
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
      minWidth: 150
    },
    {
      field: ProductKeys.unitPrice,
      headerName: "Preço (€)",
      width: 100
    }
  ];
}
