import { BASE_API_URL } from "../../../config/variables";
import { IBaseResponse } from "../../../models/BaseResponse";
import {
  getData,
  getPdfData,
  postData,
  postDeleteData,
  putData
} from "../../../services/BaseService";
import { IOrder, IOrderTable } from "../models/Order";

const getOrders = async (): Promise<IOrderTable[]> =>
  await getData<IOrderTable[]>(`${BASE_API_URL}orders`);

const getOrder = async (id: number): Promise<IOrder> =>
  await getData<IOrder>(`${BASE_API_URL}orders/${id}`);

const getOrderDoc = async (id: number): Promise<Blob> =>
  await getPdfData(`${BASE_API_URL}orders/doc/${id}`);

const createOrder = async (Order: IOrder): Promise<IOrder> =>
  await postData(`${BASE_API_URL}orders`, Order);

const updateOrder = async (Order: IOrder): Promise<IOrder> =>
  await putData(`${BASE_API_URL}orders/${Order.id}`, Order);

const deleteOrders = async (ids: number[]): Promise<IBaseResponse[]> =>
  await postDeleteData(`${BASE_API_URL}orders/delete`, ids);

export {
  getOrders,
  getOrder,
  getOrderDoc,
  createOrder,
  updateOrder,
  deleteOrders
};
