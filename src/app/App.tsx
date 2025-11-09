import {
  dataDisplayCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  feedbackCustomizations,
  formInputCustomizations,
  inputsCustomizations,
  sidebarCustomizations,
  surfacesCustomizations
} from "./theme";
import AppTheme from "./theme/AppTheme";
import NotificationsProvider from "./context/useNotifications/NotificationsProvider";
import DialogsProvider from "./context/useDialogs/DialogsProvider";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./routes/AppRouter";
import { LoadingProvider } from "./context/useLoading/LoadingProvider";

const themeComponents = {
  ...dataGridCustomizations
};

function App() {
  return (
    <AppTheme themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <LoadingProvider>
            <AppRouter />
          </LoadingProvider>
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}

export default App;
