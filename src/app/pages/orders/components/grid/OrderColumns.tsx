import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  IOrderTable,
  OrderKeys,
  OrderStatus,
  OrderStatusColor,
  OrderStatusLabel
} from "../../models/Order";

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
      field: OrderKeys.status,
      headerName: "Estado",
      width: 140,
      renderCell: (params: GridRenderCellParams<IOrderTable>) => {
        const status = params.row.status as OrderStatus;
        const label = OrderStatusLabel[status] ?? String(status);
        const color = OrderStatusColor[status] ?? "#9e9e9e";

        return (
          <span
            key={params.row.id}
            style={{
              color,
              fontWeight: 600,
              textTransform: "capitalize"
            }}
          >
            {label}
          </span>
        );
      }
    },
    {
      field: OrderKeys.totalQuantity,
      headerName: "Quantidade Total",
      flex: 1,
      minWidth: 80
    },
    {
      field: OrderKeys.totalPrice,
      headerName: "Preço Total (€)",
      flex: 1,
      minWidth: 80
    },
    {
      field: OrderKeys.createdDate,
      headerName: "Data",
      width: 200,
      renderCell: (params: GridRenderCellParams<IOrderTable>) =>
        dayjs(params.row.createdDate).format("DD/MM/YYYY HH:mm")
    }
  ];
}
