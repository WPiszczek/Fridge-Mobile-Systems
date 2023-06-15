import { differenceInDays } from "date-fns";
import { Product } from "../api/services/product";

export const maxDate = "9999-99-99";

export const getEarliestExpirationDate = (item: Product) => {
  let exp = item.expirationDate ?? maxDate;
  let open = item.openExpirationDate ?? maxDate;
  if (exp < open) {
    return exp;
  }
  return open;
};

export const daysLeft = (item: Product) => {
  let expDate = getEarliestExpirationDate(item);
  if (expDate === null) {
    return Infinity;
  } else {
    return differenceInDays(new Date(expDate), new Date());
  }
};

export const sortByDate = (itemA: Product, itemB: Product) => {
  let expA = getEarliestExpirationDate(itemA);
  let expB = getEarliestExpirationDate(itemB);
  if (expA > expB) {
    return 1;
  } else {
    return -1;
  }
};
