import { BASE_API_URL } from "../../../config/variables";
import { getData, postData, putData } from "../../../services/BaseService";
import { ICustomer, ICustomerTable } from "../models/Customer";

const getCustomers = async (): Promise<ICustomerTable[]> =>
  await getData<ICustomerTable[]>(`${BASE_API_URL}customers`);

const getCustomer = async (id: number): Promise<ICustomer> =>
  await getData<ICustomer>(`${BASE_API_URL}customers/${id}`);

const createCustomer = async (customer: ICustomer): Promise<ICustomer> =>
  await postData(`${BASE_API_URL}customers`, customer);

const updateCustomer = async (customer: ICustomer): Promise<ICustomer> =>
  await putData(`${BASE_API_URL}customers/${customer.id}`, customer);

export { getCustomers, getCustomer, createCustomer, updateCustomer };
