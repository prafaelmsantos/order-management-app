import { BASE_API_URL } from "../../../config/variables";
import { IBaseResponse } from "../../../models/BaseResponse";
import {
  getData,
  postData,
  postDeleteData,
  putData
} from "../../../services/BaseService";
import { ICustomer, ICustomerTable } from "../models/Customer";

const getCustomersTable = async (): Promise<ICustomerTable[]> =>
  await getData<ICustomerTable[]>(`${BASE_API_URL}customers/table`);

const getCustomers = async (): Promise<ICustomer[]> =>
  await getData<ICustomer[]>(`${BASE_API_URL}customers`);

const getCustomer = async (id: number): Promise<ICustomer> =>
  await getData<ICustomer>(`${BASE_API_URL}customers/${id}`);

const createCustomer = async (customer: ICustomer): Promise<ICustomer> =>
  await postData(`${BASE_API_URL}customers`, customer);

const updateCustomer = async (customer: ICustomer): Promise<ICustomer> =>
  await putData(`${BASE_API_URL}customers/${customer.id}`, customer);

const deleteCustomers = async (ids: number[]): Promise<IBaseResponse[]> =>
  await postDeleteData(`${BASE_API_URL}customers/delete`, ids);

export {
  getCustomersTable,
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomers
};
