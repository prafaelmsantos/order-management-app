import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import PageContainer, { Breadcrumb } from "../../components/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import { useMatch, useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { IMode } from "../../models/Mode";
import useNotifications from "../../context/useNotifications/useNotifications";
import { useLoading } from "../../context/useLoading/useLoading";
import { IOrderSchema, orderSchema } from "./services/OrderSchema";
import { IOrder } from "./models/Order";
import {
  createOrder,
  getOrder,
  getOrderDoc,
  updateOrder
} from "./services/OrderService";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { useModal } from "../../context/useModal/useModal";
import OrderForm from "./components/form/OrderForm";

export default function OrderPage() {
  const baseUrl: string = "/orders";

  const navigate = useNavigate();
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId ? Number(params.orderId) : null;

  const { startLoading, stopLoading } = useLoading();
  const { showError } = useModal();

  const notifications = useNotifications();

  const methods = useForm<IOrderSchema>({
    resolver: zodResolver(orderSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const [order, setOrder] = useState<IOrder>({
    id: 0,
    customerId: 0,
    paymentMethod: null,
    observations: null,
    totalQuantity: 0,
    totalPrice: 0,
    productsOrders: []
  });

  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);

  const matchNew = useMatch({ path: "/orders/new", end: true });
  const matchEdit = useMatch({
    path: "/orders/:orderId/edit",
    end: true
  });
  const matchDetail = useMatch({ path: "/orders/:orderId", end: true });

  useEffect(() => {
    if (matchNew) setMode(IMode.ADD);
    else if (matchEdit) setMode(IMode.EDIT);
    else if (matchDetail) setMode(IMode.PREVIEW);
  }, [matchNew, matchEdit, matchDetail]);

  const loadData = useCallback(async () => {
    if (orderId) {
      startLoading();
      getOrder(orderId)
        .then((data) => {
          setOrder(data);
          stopLoading();
        })
        .catch((e: Error) => {
          void handleClose();
          stopLoading();
          showError(e.message, "Erro ao tentar carregar encomendas");
        });
    } else if (!matchNew) {
      void handleClose();
    }
  }, [orderId]);

  useEffect(() => {
    void loadData();
  }, [orderId]);

  useEffect(() => {
    void reset(order);
  }, [order]);

  const handleClose = () => navigate(baseUrl);

  const handleSumbitEdit = async (order: IOrder) => {
    startLoading();
    updateOrder(order)
      .then(() => {
        notifications.show("Encomenda atualizada com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });

        navigate(`/orders/${order.id}`);
        void loadData();
        stopLoading();
      })
      .catch((e: Error) => {
        showError(e.message, "Erro ao tentar atualizar a encomenda");
        stopLoading();
      });
  };

  const handleSumbitAdd = async (order: IOrder) => {
    startLoading();
    createOrder(order)
      .then(() => {
        notifications.show("Encomenda criada com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });
        void handleClose();
        stopLoading();
      })
      .catch((e: Error) => {
        showError(e.message, "Erro ao tentar criar a encomenda");
        stopLoading();
      });
  };

  const handleEdit = () => {
    navigate(`/orders/${orderId}/edit`);
  };

  const handleRollback = () => {
    navigate(`/orders/${orderId}`);
    void loadData();
  };

  const breadcrumbs: Breadcrumb[] = [
    { title: "Encomendas", path: baseUrl },
    ...(mode === IMode.ADD
      ? [{ title: "Novo" }]
      : mode === IMode.EDIT
      ? [
          {
            title: "Nº" + order.id?.toString(),
            path: `${baseUrl}/${order.id}`
          },
          { title: "Editar" }
        ]
      : [{ title: "Nº" + (order.id ?? 0).toString() }])
  ];

  const handleReportOrder = async () => {
    if (orderId) {
      const blob = await getOrderDoc(orderId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nota_de_encomenda_n_${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <PageContainer
      title={
        mode === IMode.ADD
          ? "Criar Encomenda"
          : mode === IMode.EDIT
          ? "Editar Encomenda"
          : "Nº" + order.id?.toString()
      }
      breadcrumbs={breadcrumbs}
      actions={
        <>
          {mode === IMode.PREVIEW && (
            <Button
              variant="contained"
              startIcon={<SimCardDownloadIcon />}
              onClick={handleReportOrder}
            >
              Descarregar
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
        <OrderForm disabled={mode === IMode.PREVIEW} />
      </FormProvider>
    </PageContainer>
  );
}
