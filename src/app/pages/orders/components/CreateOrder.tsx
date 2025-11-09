import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "../../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import { IOrderSchema, orderSchema } from "../services/OrderSchema";
import OrderForm from "./form/OrderForm";
import { OrderStatus } from "../models/Order";

export default function CreateOrder() {
  const methods = useForm<IOrderSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(orderSchema)(data, context, options),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      customerId: 0,
      productsOrders: [],
      status: OrderStatus.Open,
      totalQuantity: 0,
      totalPrice: 0
    }
  });

  const { handleSubmit, reset } = methods;

  const handleSubmitEdit = async (order: IOrderSchema) => {
    console.log("Nova encomenda:", order);
  };

  return (
    <PageContainer
      title="Nova Encomenda"
      breadcrumbs={[
        { title: "Encomendas", path: "/orders" },
        { title: "Nova" }
      ]}
      actions={
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleSubmit(handleSubmitEdit)}
        >
          Criar
        </Button>
      }
    >
      <FormProvider {...methods}>
        <OrderForm />
      </FormProvider>
    </PageContainer>
  );
}
