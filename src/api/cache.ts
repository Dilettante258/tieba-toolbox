import { fetchForumName } from "./forum.ts";
import {fetchUserId} from "./user.ts";

export async function getForumName(fid:number) {
  let forumPairs = JSON.parse(localStorage.getItem("forumPairs") || "{}");

  if (forumPairs[fid]) {
    return forumPairs[fid];
  }

  let username = await fetchForumName(fid);

  forumPairs[fid] = username;
  localStorage.setItem("forumPairs", JSON.stringify(forumPairs));

  return username;
}

export async function getUserId(UserName:string): Promise<number> {
  let forumPairs = JSON.parse(localStorage.getItem("userPairs") || "{}");

  if (forumPairs[UserName]) {
    return forumPairs[UserName];
  }

  let username = await fetchUserId(UserName);

  forumPairs[UserName] = username;
  localStorage.setItem("userPairs", JSON.stringify(forumPairs));
  return username;
}