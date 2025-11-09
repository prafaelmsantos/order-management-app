import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, ICustomerSchema } from "../services/CustomerSchema";
import PageContainer from "../../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import CustomerForm from "./form/CustomerForm";

export default function CreateCustomer() {
  const methods = useForm<ICustomerSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(customerSchema)(data, context, options),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const handleSumbitEdit = async (client: ICustomerSchema) => {
    console.log(client);
  };

  return (
    <PageContainer
      title="Novo Cliente"
      breadcrumbs={[
        { title: "Clientes", path: "/customers" },
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
        <CustomerForm />
      </FormProvider>
    </PageContainer>
  );
}
