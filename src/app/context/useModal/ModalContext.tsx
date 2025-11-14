import { createContext } from "react";

export type ShowError = (message: string, title?: string) => void;
export type ShowInfo = (message: string, title?: string) => void;

export type ShowWarning = (
  title: string,
  onConfirm?: () => void,
  onCancel?: () => void
) => void;

export type CloseMessage = () => void;

export type MessageType = "error" | "warning" | "info";

export interface MessageState {
  message?: string;
  title?: string;
  type: MessageType;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ModalContextType {
  showError: ShowError;
  showInfo: ShowInfo;
  showWarning: ShowWarning;
  close: CloseMessage;
  error: MessageState | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
