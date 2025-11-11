import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductForm from "./ProductForm";
import CustomerForm from "./CustomerForm";
import DetailsForm from "./DetailsForm";

interface IOrderFormProps {
  disabled: boolean;
}

export default function OrderForm({ disabled }: IOrderFormProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      {/* Cliente */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Cliente</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomerForm disabled={disabled} />
        </AccordionDetails>
      </Accordion>

      {/* Detalhes da Encomenda */}
      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Detalhes da Encomenda</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DetailsForm disabled={disabled} />
        </AccordionDetails>
      </Accordion>

      {/* Produtos */}
      <Accordion defaultExpanded sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Produtos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductForm disabled={disabled} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
