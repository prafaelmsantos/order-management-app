import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "../../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./form/ProductForm";
import { IProductSchema, productSchema } from "../services/ProductSchema";

export default function CreateProduct() {
  const methods = useForm<IProductSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(productSchema)(data, context, options),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const handleSumbitEdit = async (Product: IProductSchema) => {
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
        <ProductForm />
      </FormProvider>
    </PageContainer>
  );
}
