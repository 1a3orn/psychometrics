import { commonClient } from "./client";

export const allTasks = async () => {
    const data = await commonClient.get("/common/all-tasks");
    console.log(data);
    return data;
};