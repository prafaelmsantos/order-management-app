import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";

import { IProductOrder, quantityFields } from "../../models/Order";

export default function QuantityDialog({
  disabled,
  openQuantities,
  setOpenQuantities,
  productOrders,
  setProductOrders
}: {
  disabled: boolean;
  openQuantities: number | null;
  setOpenQuantities: React.Dispatch<React.SetStateAction<number | null>>;
  productOrders: IProductOrder[];
  setProductOrders: React.Dispatch<React.SetStateAction<IProductOrder[]>>;
}) {
  return (
    <Dialog open={openQuantities !== null} maxWidth="md" fullWidth>
      <DialogTitle>Tamanhos / Quantidades</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {openQuantities !== null &&
            quantityFields.map((field, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <TextField
                    label={field.label}
                    type="number"
                    size="small"
                    fullWidth
                    disabled={disabled}
                    slotProps={{
                      input: {
                        inputProps: { step: 1, min: 0 }
                      }
                    }}
                    value={
                      productOrders.find((row) => row.id === openQuantities)?.[
                        field.name as keyof IProductOrder
                      ] ?? 0
                    }
                    onChange={(e) => {
                      setProductOrders((prev) =>
                        prev.map((row) =>
                          row.id === openQuantities
                            ? {
                                ...row,
                                [field.name]: Math.max(
                                  Number(e.target.value),
                                  0
                                )
                              }
                            : row
                        )
                      );
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenQuantities(null)}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
