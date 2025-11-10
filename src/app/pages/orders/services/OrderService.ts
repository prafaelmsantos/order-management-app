import { BASE_API_URL } from "../../../config/variables";
import { getData, postData, putData } from "../../../services/BaseService";
import { IOrder, IOrderTable } from "../models/Order";

const getOrders = async (): Promise<IOrderTable[]> =>
  await getData<IOrderTable[]>(`${BASE_API_URL}orders`);

const getOrder = async (id: number): Promise<IOrder> =>
  await getData<IOrder>(`${BASE_API_URL}orders/${id}`);

const createOrder = async (product: IOrder): Promise<IOrder> =>
  await postData(`${BASE_API_URL}orders`, product);

const updateOrder = async (product: IOrder): Promise<IOrder> =>
  await putData(`${BASE_API_URL}orders/${product.id}`, product);

export { getOrders, getOrder, createOrder, updateOrder };
