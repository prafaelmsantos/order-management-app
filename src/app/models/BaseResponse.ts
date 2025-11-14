export interface IBaseResponse {
  id: number;
  success: boolean;
  taxIdentificationNumber: string;
  message: string | null;
}
