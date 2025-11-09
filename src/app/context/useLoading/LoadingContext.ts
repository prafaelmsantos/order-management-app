import * as React from "react";

export type StartLoading = () => void;
export type StopLoading = () => void;

export interface LoadingContextType {
  startLoading: StartLoading;
  stopLoading: StopLoading;
}

const LoadingContext = React.createContext<LoadingContextType | null>(null);

export default LoadingContext;
