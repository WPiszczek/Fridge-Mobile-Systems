export type EAN = string;

export interface Product {
  id: number;
  userId: number;
  productCode?: EAN;
  pictureUrl?: string;
  productName?: string;
  expirationDate?: string;
  openingDate?: string;
  openExpirationDate?: string;
}