import { useState } from "react";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { IProductOrder } from "../../models/Order";
import ProductNewForm from "./ProductNewForm";
import DetailsForm from "./DetailsForm";

interface IOrderFormProps {
  disabled: boolean;
  productOrders: IProductOrder[];
}

export default function OrderForm({
  disabled,
  productOrders
}: IOrderFormProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="order form tabs"
      >
        <Tab label="Detalhes" />
        <Tab label="Produtos" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <DetailsForm disabled={disabled} />}
        {tabIndex === 1 && (
          <ProductNewForm disabled={disabled} productOrders={productOrders} />
        )}
      </Box>
    </Paper>
  );
}
