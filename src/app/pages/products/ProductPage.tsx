import { useForm, FormProvider } from "react-hook-form";
import { Button, Paper } from "@mui/material";
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
  getProductReport,
  updateProduct
} from "./services/ProductService";
import { IMode } from "../../models/Mode";
import useNotifications from "../../context/useNotifications/useNotifications";
import { useLoading } from "../../context/useLoading/useLoading";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { useModal } from "../../context/useModal/useModal";

export default function ProductPage() {
  const baseUrl: string = "/products";

  const navigate = useNavigate();
  const params = useParams<{ productId: string }>();
  const productId = params.productId ? Number(params.productId) : null;

  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useModal();

  const methods = useForm<IProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    reference: "",
    description: null,
    unitPrice: 0
  });

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
        showError(e.message, "Erro ao tentar atualizar o cliente");
        stopLoading();
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
        showError(e.message, "Erro ao tentar criar o cliente");
        stopLoading();
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

  const handleReportProduct = async () => {
    if (productId) {
      const blob = await getProductReport(productId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio_produto_${productId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
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
      breadcrumbs={breadcrumbs}
      actions={
        <>
          {mode !== IMode.ADD && (
            <Button
              variant="contained"
              startIcon={<SimCardDownloadIcon />}
              onClick={handleReportProduct}
            >
              Relatório
            </Button>
          )}

          {mode === IMode.EDIT && (
            <Button
              type="submit"
              variant="contained"
              onClick={handleRollback}
              startIcon={<CloseIcon />}
            >
              Fechar
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
        <Paper elevation={3} sx={{ p: 3 }}>
          <ProductForm disabled={mode === IMode.PREVIEW} />
        </Paper>
      </FormProvider>
    </PageContainer>
  );
}
