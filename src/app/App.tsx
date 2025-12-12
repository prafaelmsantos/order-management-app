import AppTheme from "./theme/AppTheme";
import NotificationsProvider from "./context/useNotifications/NotificationsProvider";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./routes/AppRouter";
import { LoadingProvider } from "./context/useLoading/LoadingProvider";
import { ModalProvider } from "./context/useModal/ModalProvider";

function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <NotificationsProvider>
        <LoadingProvider>
          <ModalProvider>
            <AppRouter />
          </ModalProvider>
        </LoadingProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}

export default App;
