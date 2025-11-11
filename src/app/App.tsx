import AppTheme from "./theme/AppTheme";
import NotificationsProvider from "./context/useNotifications/NotificationsProvider";
import DialogsProvider from "./context/useDialogs/DialogsProvider";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./routes/AppRouter";
import { LoadingProvider } from "./context/useLoading/LoadingProvider";
import { ErrorProvider } from "./context/useError/ErrorProvider";

function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <LoadingProvider>
            <ErrorProvider>
              <AppRouter />
            </ErrorProvider>
          </LoadingProvider>
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}

export default App;
