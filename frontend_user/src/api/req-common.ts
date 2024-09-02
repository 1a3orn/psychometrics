import axios from "axios";

export const commonClient = axios.create({
  baseURL: "/api/common",
});
