export type ActionState = {
  status: "success" | "error";
  message: string;
  data?: any; // Optional data property to hold any additional data
};