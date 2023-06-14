import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-root-toast";
import { apiClient, handleError } from "../clients";
import { AxiosError } from "axios";
import { extractData } from "../utils";
import { ApiResponse } from "../types";

export type EAN = string;
export interface Product {
  id: number;
  userId: number;
  productCode: EAN | null;
  pictureUrl: string | null;
  productName: string | null;
  quantity: string | null;
  status: string;
  usagePercentage: string | null;
  expirationDate: string | null;
  openingDate: string | null;
  openExpirationDate: string | null;
}

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.get<ApiResponse<Product[]>>("/products"),
    onError: (error) => {
      if ((error as AxiosError).response?.status !== 401) {
        handleError(error);
      }
    },
    select: extractData,
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: ({ queryKey: [, id] }) => apiClient.get(`/products/${id}`),
  });

export const useCreateProduct = () =>
  useMutation({
    mutationKey: ["products"],
    mutationFn: async (data: Product) =>
      await apiClient.post("/products", data),
    onSuccess: () => {
      Toast.show("Product added!", {
        duration: Toast.durations.SHORT,
      });
    },
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationKey: ["products"],
    mutationFn: async (data: Product) =>
      await apiClient.patch(`/products/${data.id}`, data),
    onSuccess: () => {
      Toast.show("Product updated!", {
        duration: Toast.durations.SHORT,
      });
    },
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationKey: ["products"],
    mutationFn: async (id: number) => await apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      Toast.show("Product deleted!", {
        duration: Toast.durations.SHORT,
      });
    },
  });
