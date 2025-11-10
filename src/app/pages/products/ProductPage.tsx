import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer, { Breadcrumb } from "../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import ProductForm from "./components/form/ProductForm";
import { IProductSchema, productSchema } from "./services/ProductSchema";
import { useMatch, useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { IProduct } from "./models/Product";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  createProduct,
  getProduct,
  updateProduct
} from "./services/ProductService";
import { IMode } from "../../models/Mode";
import useNotifications from "../../context/useNotifications/useNotifications";
import { useLoading } from "../../context/useLoading/useLoading";
import { useError } from "../../context/useError/useError";

export default function ProductPage() {
  const baseUrl: string = "/products";

  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();

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
  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);

  const matchNew = useMatch({ path: "/products/new", end: true });
  const matchEdit = useMatch({ path: "/products/:productId/edit", end: true });
  const matchDetail = useMatch({ path: "/products/:productId", end: true });

  useEffect(() => {
    if (matchNew) setMode(IMode.ADD);
    else if (matchEdit) setMode(IMode.EDIT);
    else if (matchDetail) setMode(IMode.PREVIEW);
  }, [matchNew, matchEdit, matchDetail]);

  const loadData = useCallback(async () => {
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
    } else if (!matchNew) {
      void handleClose();
    }
  }, [productId]);

  useEffect(() => {
    void loadData();
  }, [productId]);

  useEffect(() => {
    void reset(product);
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

        navigate(`/products/${product.id}`);
        void loadData();
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
    navigate(`/products/${productId}/edit`);
  };

  const handleRollback = () => {
    navigate(`/products/${productId}`);
  };

  const breadcrumbs: Breadcrumb[] = [
    { title: "Produtos", path: baseUrl },
    ...(mode === IMode.ADD
      ? [{ title: "Novo" }]
      : mode === IMode.EDIT
      ? [
          { title: product.reference, path: `${baseUrl}/${product.id}` },
          { title: "Editar" }
        ]
      : [{ title: product.reference }])
  ];

  return (
    <PageContainer
      title={
        mode === IMode.ADD
          ? "Criar Produto"
          : mode === IMode.EDIT
          ? "Editar Produto"
          : product.reference
      }
      breadcrumbs={breadcrumbs}
      actions={
        <>
          {mode === IMode.EDIT && (
            <Button
              type="submit"
              variant="contained"
              onClick={handleRollback}
              startIcon={<CloseIcon />}
            >
              {mode === IMode.EDIT ? "Fechar" : "Voltar a lista"}
            </Button>
          )}

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
            startIcon={
              mode === IMode.ADD ? (
                <AddIcon />
              ) : mode === IMode.PREVIEW ? (
                <EditIcon />
              ) : (
                <SendIcon />
              )
            }
          >
            {mode === IMode.PREVIEW ? "Editar" : "Submeter"}
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
