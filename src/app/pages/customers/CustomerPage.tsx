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
import { ICustomer } from "./models/Customer";
import { customerSchema, ICustomerSchema } from "./services/CustomerSchema";
import {
  createCustomer,
  getCustomer,
  updateCustomer
} from "./services/CustomerService";
import ClientForm from "./components/form/CustomerForm";
import { useModal } from "../../context/useModal/useModal";

export default function CustomerPage() {
  const baseUrl: string = "/customers";

  const navigate = useNavigate();
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId ? Number(params.customerId) : null;

  const notifications = useNotifications();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useModal();

  const methods = useForm<ICustomerSchema>({
    resolver: zodResolver(customerSchema),
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const [customer, setCustomer] = useState<ICustomer>({
    id: 0,
    fullName: "",
    taxIdentificationNumber: "",
    contact: "",
    address: "",
    postalCode: "",
    city: ""
  });

  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);

  const matchNew = useMatch({ path: "/customers/new", end: true });
  const matchEdit = useMatch({
    path: "/customers/:customerId/edit",
    end: true
  });
  const matchDetail = useMatch({ path: "/customers/:customerId", end: true });

  useEffect(() => {
    if (matchNew) setMode(IMode.ADD);
    else if (matchEdit) setMode(IMode.EDIT);
    else if (matchDetail) setMode(IMode.PREVIEW);
  }, [matchNew, matchEdit, matchDetail]);

  const loadData = useCallback(async () => {
    if (customerId) {
      startLoading();
      getCustomer(customerId)
        .then((data) => {
          setCustomer(data);
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
  }, [customerId]);

  useEffect(() => {
    void loadData();
  }, [customerId]);

  useEffect(() => {
    void reset(customer);
  }, [customer]);

  const handleClose = () => navigate(baseUrl);

  const handleSumbitEdit = async (customer: ICustomer) => {
    startLoading();
    updateCustomer(customer)
      .then(() => {
        stopLoading();
        notifications.show("Cliente atualizado com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });

        navigate(`/customers/${customer.id}`);
        void loadData();
      })
      .catch((e: Error) => {
        stopLoading();
        showError(e.message);
      });
  };

  const handleSumbitAdd = async (customer: ICustomer) => {
    startLoading();
    createCustomer(customer)
      .then(() => {
        stopLoading();
        notifications.show("Cliente criado com sucesso!", {
          severity: "success",
          autoHideDuration: 5000
        });
        void handleClose();
      })
      .catch((e: Error) => {
        stopLoading();
        showError(e.message);
      });
  };

  const handleEdit = () => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handleRollback = () => {
    navigate(`/customers/${customerId}`);
  };

  const breadcrumbs: Breadcrumb[] = [
    { title: "Clientes", path: baseUrl },
    ...(mode === IMode.ADD
      ? [{ title: "Novo" }]
      : mode === IMode.EDIT
      ? [
          { title: customer.fullName, path: `${baseUrl}/${customer.id}` },
          { title: "Editar" }
        ]
      : [{ title: customer.fullName }])
  ];

  return (
    <PageContainer
      title={
        mode === IMode.ADD
          ? "Criar Cliente"
          : mode === IMode.EDIT
          ? "Editar Cliente"
          : customer.fullName
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
        <ClientForm disabled={mode === IMode.PREVIEW} />
      </FormProvider>
    </PageContainer>
  );
}
