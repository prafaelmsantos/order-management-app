import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingContext, { LoadingContextType } from "./LoadingContext";

interface LoadingProviderProps {
  children?: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children
}) => {
  const [loading, setLoading] = React.useState(false);

  const startLoading = React.useCallback(() => setLoading(true), []);
  const stopLoading = React.useCallback(() => setLoading(false), []);

  const contextValue: LoadingContextType = React.useMemo(
    () => ({ startLoading, stopLoading }),
    [stopLoading, stopLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
