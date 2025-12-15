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
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createOrder,
  deleteOrders,
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
  const { showError, showWarning } = useModal();

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
    customer: null,
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
          showError(e.message, "Erro ao tentar carregar encomendas");
          stopLoading();
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

  const handleDeleteClick = () => {
    startLoading();
    deleteOrders([orderId ?? 0])
      .then((data) => {
        const allSuccess = data.every((x) => x.success);
        if (allSuccess) {
          notifications.show("Encomenda apagada com sucesso.", {
            severity: "success",
            autoHideDuration: 5000
          });
        } else {
          showError(
            data.map((x) => x.message).join("\n"),
            "Houve um erro ao tentar apagar a encomenda"
          );
        }
        void handleClose();
        stopLoading();
      })
      .catch((e: Error) => {
        showError(e.message, "Houve um erro ao tentar apagar a encomenda");
        stopLoading();
      });
  };

  const handleDeleteModal = () => {
    showWarning(
      "Tem a certeza que pretende apagar a encomenda selecionada?",
      handleDeleteClick
    );
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
          : "Nº" + (order.id ?? 0).toString()
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

          {(mode === IMode.EDIT || mode === IMode.PREVIEW) && (
            <Button
              type={mode === IMode.EDIT ? "submit" : undefined}
              variant="contained"
              color={mode === IMode.PREVIEW ? "error" : "primary"}
              onClick={mode === IMode.EDIT ? handleRollback : handleDeleteModal}
              startIcon={mode === IMode.EDIT ? <CloseIcon /> : <DeleteIcon />}
            >
              {mode === IMode.EDIT ? "Fechar" : "Apagar"}
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
        <OrderForm
          disabled={mode === IMode.PREVIEW}
          productOrders={order.productsOrders}
        />
      </FormProvider>
    </PageContainer>
  );
}
