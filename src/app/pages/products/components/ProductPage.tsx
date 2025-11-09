import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer from "../../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./form/ProductForm";
import { IProductSchema, productSchema } from "../services/ProductSchema";
import { useMatch, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { IProduct } from "../models/Product";
import {
  createProduct,
  getProduct,
  updateProduct
} from "../services/ProductService";
import { IMode } from "../../../models/Mode";
import useNotifications from "../../../context/useNotifications/useNotifications";
import { useLoading } from "../../../context/useLoading/useLoading";
import { useDialogs } from "../../../context/useDialogs/useDialogs";
import { useError } from "../../../context/useError/useError";

export default function ProductPage() {
  const baseUrl: string = "/products";

  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const dialogs = useDialogs();

  const methods = useForm<IProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    reference: "",
    description: null,
    unitPrice: 0
  });
  const params = useParams<{ productId: string }>();
  const productId = params.productId ? Number(params.productId) : null;
  const match = useMatch({ path: "/products/new", end: true });
  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);

  console.log(mode);

  useEffect(() => {
    if (productId) {
      startLoading();
      getProduct(productId)
        .then((data) => {
          setProduct(data);
          stopLoading();
        })
        .catch((e: Error) => {
          console.error(e);
          void handleClose();
          stopLoading();
          showError(e.message);
        });
    } else if (!!match) {
      setMode(IMode.ADD);
    } else {
      void handleClose();
    }
  }, [productId]);

  useEffect(() => {
    void reset({
      id: product.id,
      reference: product.reference,
      unitPrice: product.unitPrice,
      description: product.description
    });
  }, [product]);

  const handleClose = () => navigate(baseUrl);

  const handleSumbitEdit = async (product: IProduct) => {
    startLoading();
    updateProduct(product)
      .then(() => {
        stopLoading();
        notifications.show("Produto atualizado com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });

        void handleClose();
      })
      .catch((e: Error) => {
        console.error(e);
        stopLoading();
        showError(e.message);
      });
  };

  const handleSumbitAdd = async (product: IProduct) => {
    startLoading();
    createProduct(product)
      .then(() => {
        stopLoading();
        notifications.show("Produto criado com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });
        void handleClose();
      })
      .catch((e: Error) => {
        console.error(e);
        stopLoading();
        showError(e.message);
      });
  };

  const handleEdit = () => {
    setMode(IMode.EDIT);
  };

  const handleRollback = () => {
    setMode(IMode.PREVIEW);
  };

  return (
    <PageContainer
      title={
        mode === IMode.ADD
          ? "Criar Produto"
          : mode === IMode.EDIT
          ? "Editar Produto"
          : product.reference
      }
      breadcrumbs={[
        { title: "Produtos", path: baseUrl },
        { title: mode === IMode.ADD ? "Novo" : product.reference }
      ]}
      actions={
        <>
          <Button
            type="submit"
            variant="contained"
            onClick={mode === IMode.EDIT ? handleRollback : handleClose}
            startIcon={<AddIcon />}
          >
            Voltar
          </Button>

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(
              mode === IMode.ADD
                ? handleSumbitAdd
                : mode === IMode.PREVIEW
                ? handleEdit
                : handleSumbitEdit
            )}
            startIcon={<AddIcon />}
          >
            {mode === IMode.PREVIEW ? "editar" : "Submeter"}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <ProductForm disabled={mode === IMode.PREVIEW} />
      </FormProvider>
    </PageContainer>
  );
}
