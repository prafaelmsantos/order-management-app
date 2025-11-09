import * as React from "react";

export type ShowError = (message: string, title?: string) => void;
export type CloseError = () => void;

export interface ErrorContextType {
  showError: ShowError;
  closeError: CloseError;
  error: { message: string; title?: string } | null;
}

const ErrorContext = React.createContext<ErrorContextType | null>(null);

export default ErrorContext;
