import { GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IProductOrder } from "../../../models/Order";
import { TextField } from "@mui/material";

export default function ColorCellEditor({
  params,
  disabled,
  setProductOrders
}: {
  params: GridRenderCellParams;
  disabled: boolean;
  setProductOrders: React.Dispatch<React.SetStateAction<IProductOrder[]>>;
}) {
  const [value, setValue] = useState(params.value ?? "");

  useEffect(() => {
    setValue(params.value ?? "");
  }, [params.value]);

  return disabled ? (
    (params.row as IProductOrder).color ?? ""
  ) : (
    <TextField
      size="small"
      variant="standard"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        setProductOrders((prev) =>
          prev.map((row) =>
            row.id === Number(params.id) ? { ...row, color: value } : row
          )
        );
      }}
      onKeyDown={(e) => e.stopPropagation()}
      sx={{ mt: 0.5 }}
    />
  );
}
