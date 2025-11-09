import * as React from "react";
import ErrorContext, { ShowError, CloseError } from "./ErrorContext";
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

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = React.useState<{
    message: string;
    title?: string;
  } | null>(null);

  const showError = React.useCallback<ShowError>((message, title) => {
    setError({ message, title });
  }, []);

  const closeError = React.useCallback<CloseError>(() => {
    setError(null);
  }, []);

  const contextValue = React.useMemo(
    () => ({ showError, closeError, error }),
    [showError, closeError, error]
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}

      <Dialog
        open={!!error}
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
            <ErrorOutlineIcon sx={{ fontSize: 100 }} color="error" />

            <Typography variant="h6" fontWeight={600}>
              {error?.title || "Erro interno do servidor!"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {error?.message}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
          <Button
            onClick={closeError}
            variant="contained"
            color="error"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorContext.Provider>
  );
};
