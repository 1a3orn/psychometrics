import axios from "axios";
import { Task } from "./base-types";

export const commonClient = axios.create({
  baseURL: "/api/common",
});

export const allTasks = async () => {
  const data = await commonClient.get<Task[]>("/all-tasks");
  return data.data;
};
