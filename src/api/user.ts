import {client} from "./client.ts";


export async function fetchUserId(UserName:string|number) {
  try {
    const res = await client.get(`/tieba/i/sys/user_json?un=${UserName}&ie=utf-8`);
    return res.data.id as number;
  } catch (error) {
    console.error(error);
    throw error;
  }
}