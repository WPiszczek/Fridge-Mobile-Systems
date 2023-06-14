export interface ApiResponse<T> {
  data: T;
  status: "SUCCESS" | "ERROR";
}
