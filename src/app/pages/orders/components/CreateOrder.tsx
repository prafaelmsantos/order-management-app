import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "../../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import { IOrderSchema, orderSchema } from "../services/OrderSchema";
import OrderForm from "./form/OrderForm";

export default function CreateOrder() {
  const methods = useForm<IOrderSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(orderSchema)(data, context, options),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      clientId: 0,
      products: [],
      state: "pendente",
      createdAt: new Date()
    }
  });

  const { reset, handleSubmit } = methods;

  const handleSumbitEdit = async (Product: IOrderSchema) => {
    console.log(Product);
  };

  return (
    <PageContainer
      title="Novo Produto"
      breadcrumbs={[
        { title: "Produtos", path: "/Products" },
        { title: "Novo" }
      ]}
      actions={
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(handleSumbitEdit)}
          startIcon={<AddIcon />}
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
