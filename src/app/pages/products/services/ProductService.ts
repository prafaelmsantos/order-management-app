import { BASE_API_URL } from "../../../config/variables";
import { IBaseResponse } from "../../../models/BaseResponse";
import {
  getData,
  getPdfData,
  postData,
  postDeleteData,
  putData
} from "../../../services/BaseService";
import { IProduct, IProductTable } from "../models/Product";

const getProductsTable = async (): Promise<IProductTable[]> =>
  await getData<IProductTable[]>(`${BASE_API_URL}products/table`);

const getProducts = async (): Promise<IProduct[]> =>
  await getData<IProduct[]>(`${BASE_API_URL}products`);

const getProduct = async (id: number): Promise<IProduct> =>
  await getData<IProduct>(`${BASE_API_URL}products/${id}`);

const getProductReport = async (id: number): Promise<Blob> =>
  await getPdfData(`${BASE_API_URL}products/report/${id}`);

const createProduct = async (product: IProduct): Promise<IProduct> =>
  await postData(`${BASE_API_URL}products`, product);

const updateProduct = async (product: IProduct): Promise<IProduct> =>
  await putData(`${BASE_API_URL}products/${product.id}`, product);

const deleteProducts = async (ids: number[]): Promise<IBaseResponse[]> =>
  await postDeleteData(`${BASE_API_URL}products/delete`, ids);

export {
  getProducts,
  getProductsTable,
  getProduct,
  getProductReport,
  createProduct,
  updateProduct,
  deleteProducts
};
