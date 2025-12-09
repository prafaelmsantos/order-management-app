import AppTheme from "./theme/AppTheme";
import NotificationsProvider from "./context/useNotifications/NotificationsProvider";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./routes/AppRouter";
import { LoadingProvider } from "./context/useLoading/LoadingProvider";
import { ModalProvider } from "./context/useModal/ModalProvider";

const TRIAL_KEY = "trialStart";
const TRIAL_DAYS = 30;
const TRIAL_START_DATE = new Date("2025-11-20T00:00:00Z");

function App() {
  let start = localStorage.getItem(TRIAL_KEY);
  if (!start) {
    start = TRIAL_START_DATE.toISOString();
    localStorage.setItem(TRIAL_KEY, start);
  }

  const startDate = new Date(start);
  const diffDays = Math.floor(
    (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const isExpired: boolean = diffDays >= TRIAL_DAYS;
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {isExpired ? (
        "Seu período de teste expirou."
      ) : (
        <NotificationsProvider>
          <LoadingProvider>
            <ModalProvider>
              <AppRouter />
            </ModalProvider>
          </LoadingProvider>
        </NotificationsProvider>
      )}
    </AppTheme>
  );
}

export default App;
