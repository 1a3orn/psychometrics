import { client } from "./client";

export const protectedRoute = async () => {
    const data = await client.get("/protected");
    console.log(data);
};
