import { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button
} from "@mui/material";
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
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Detalhes", "Produtos"];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      {disabled ? (
        <>
          {/* VIEW MODE: TABS */}
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
              <ProductNewForm
                disabled={disabled}
                productOrders={productOrders}
              />
            )}
          </Box>
        </>
      ) : (
        <>
          {/* EDIT MODE: STEPPER */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 2, minHeight: 400 }}>
            {activeStep === 0 && <DetailsForm disabled={disabled} />}
            {activeStep === 1 && (
              <ProductNewForm
                disabled={disabled}
                productOrders={productOrders}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Anterior
            </Button>
            <Button
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
            >
              Próximo
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
