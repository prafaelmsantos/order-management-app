import { GridRenderCellParams } from "@mui/x-data-grid";
import { IProduct } from "../../../../products/models/Product";
import { Autocomplete, TextField } from "@mui/material";
import { IProductOrder } from "../../../models/Order";

export default function ProductCell({
  params,
  disabled,
  products,
  setProductOrders
}: {
  params: GridRenderCellParams;
  disabled: boolean;
  products: IProduct[];
  setProductOrders: React.Dispatch<React.SetStateAction<IProductOrder[]>>;
}) {
  return disabled ? (
    products.find((p) => p.id === params.row.productId)?.reference ?? ""
  ) : (
    <Autocomplete
      value={products.find((p) => p.id === params.value) || null}
      options={products}
      getOptionLabel={(option) => option.reference}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="Sem produtos disponíveis"
      onChange={(_, value) => {
        setProductOrders((prev) =>
          prev.map((row) =>
            row.id === params.id
              ? {
                  ...row,
                  productId: value?.id ?? 0,
                  product: value
                    ? {
                        id: value.id,
                        reference: value.reference,
                        description: value.description,
                        unitPrice: value.unitPrice
                      }
                    : null,
                  color: null,
                  unitPrice: value?.unitPrice ?? 0
                }
              : row
          )
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ mt: 0.5 }}
          size="small"
          variant="standard"
        />
      )}
    />
  );
}
