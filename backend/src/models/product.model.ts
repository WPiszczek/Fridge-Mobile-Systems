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
