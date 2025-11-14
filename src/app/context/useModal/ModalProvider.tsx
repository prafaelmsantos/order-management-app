import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Fade
} from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModalContext from "./ModalContext";

type MessageType = "error" | "warning" | "info";

interface MessageState {
  message?: string;
  title?: string;
  type: MessageType;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [state, setState] = React.useState<MessageState | null>(null);

  // ---------- Funções ----------
  const showError = React.useCallback((message: string, title?: string) => {
    setState({ message, title, type: "error" });
  }, []);

  const showInfo = React.useCallback((message: string, title?: string) => {
    setState({ message, title, type: "info" });
  }, []);

  const showWarning = React.useCallback(
    (title: string, onConfirm?: () => void, onCancel?: () => void) => {
      setState({ title, type: "warning", onConfirm, onCancel });
    },
    []
  );

  const close = React.useCallback(() => {
    setState(null);
  }, []);

  // ---------- UI config ----------
  const typeConfig = {
    error: {
      icon: <ErrorOutlineIcon sx={{ fontSize: 100 }} color="error" />,
      color: "error",
      defaultTitle: "Erro!"
    },
    warning: {
      icon: <WarningAmberIcon sx={{ fontSize: 100 }} color="warning" />,
      color: "warning",
      defaultTitle: "Atenção!"
    },
    info: {
      icon: <InfoOutlinedIcon sx={{ fontSize: 100 }} color="info" />,
      color: "info",
      defaultTitle: "Informação"
    }
  } as const;

  const contextValue = React.useMemo(
    () => ({
      showError,
      showWarning,
      showInfo,
      close,
      error: state
    }),
    [showError, showWarning, showInfo, close, state]
  );

  const activeType = state ? typeConfig[state.type] : null;

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      <Dialog
        open={!!state}
        disableEscapeKeyDown
        TransitionComponent={Fade}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
            textAlign: "center",
            minWidth: 360
          }
        }}
      >
        <DialogContent>
          <Stack alignItems="center" spacing={2}>
            {activeType?.icon}

            <Typography variant="h6" fontWeight={600}>
              {state?.title || activeType?.defaultTitle}
            </Typography>

            {state?.message && (
              <Typography variant="body2" color="text.secondary">
                {state.message}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
          {/* ---------- WARNING: SIM / NAO ---------- */}
          {state?.type === "warning" ? (
            <>
              <Button
                variant="contained"
                color="warning"
                sx={{ px: 4, borderRadius: 2, fontWeight: 600 }}
                onClick={() => {
                  state.onConfirm?.();
                  close();
                }}
              >
                Sim
              </Button>

              <Button
                variant="outlined"
                color="warning"
                sx={{ px: 4, borderRadius: 2, fontWeight: 600 }}
                onClick={() => {
                  state.onCancel?.();
                  close();
                }}
              >
                Não
              </Button>
            </>
          ) : (
            /* ---------- ERROR / INFO: FECHAR ---------- */
            <Button
              onClick={close}
              variant="contained"
              color={activeType?.color}
              sx={{ px: 4, borderRadius: 2, fontWeight: 600 }}
            >
              Fechar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};
