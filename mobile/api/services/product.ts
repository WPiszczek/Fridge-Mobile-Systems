import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../clients";
import Toast from "react-native-root-toast";

export type EAN = string;
export interface Product {
  id?: number;
  userId: number;
  productCode?: EAN;
  pictureUrl?: string;
  productName?: string;
  quantity?: string;
  status: string;
  usagePercentage?: string;
  expirationDate?: string;
  openingDate?: string;
  openExpirationDate?: string;
}

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.get("/products"),
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
