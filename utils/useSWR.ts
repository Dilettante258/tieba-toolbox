import useSWR from "swr";
import {
  CutPost,
  FansPage,
  followForumDetail,
  FollowsPage, forumThreadCutPage, getPostPage, Post,
  RelatedPage,
  SimplePost, threadPage
} from "@/utils/type";


const baseURL = "https://tb-api.wang1m.tech";

// const baseURL = 'http://127.0.0.1:8000'

interface FetchParams {
  url: string;
  args: Record<string, any>;
}

const fetcher = async (url: string) => {
  const res = await fetch(baseURL+url);
  if (!res.ok) {
    throw new Error('An error occurred');
  }
  return res.json();
}

const fetchWithParams = async ({url, args}: FetchParams) => {
  const searchParams = new URLSearchParams(args);
  if ((!args['other'])&&localStorage.getItem('BDUSS')){
    searchParams.set('BDUSS', localStorage.getItem('BDUSS') as string);
  }
  const otherBaseUrl = args['other'];
  searchParams.delete('other')
  const res = await fetch(`${otherBaseUrl||baseURL}${url}?${searchParams.toString()}`);
  if (res.status === 404) {
    throw new Error('No Content Found');
  }
  if (!res.ok) {
    throw new Error('An error occurred');
  }
  return res.json();
}

const hardDataOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: true,
  dedupingInterval: 600000,
  focusThrottleInterval: 600000,
  loadingTimeout: 20000,
  errorRetryInterval: 3000,
  errorRetryCount: 5,
}


export function useUid(username:string) {
  const { data, error, isLoading } = useSWR(`/user/getinfo/${username}`, fetcher)
  return {
    data: data,
    isLoading,
    isError: error,
  }
}

export function useUserPost(uid:number,page:number) {
  const {data, isLoading,error } = useSWR({ url: '/user/posts', args: {uid, page: page} }, fetchWithParams) as {data: Post, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useUserFans(uid:number) {
  const {data, isLoading,error } = useSWR({ url: '/user/fans', args: {uid, pn: 1, needAll: true} }, fetchWithParams) as {data: FansPage, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useUserRelated(uid:number) {
  const {data, isLoading,error } = useSWR({ url: '/user/related', args: {uid, pn: 1, needAll: true} }, fetchWithParams) as {data: RelatedPage, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useUserFollows(uid:number) {
  const {data, isLoading,error } = useSWR({ url: '/user/follows', args: {uid, pn: 1, needAll: true} }, fetchWithParams) as {data: FollowsPage, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useLikeForums(uid:number){
  const {data, isLoading,error } = useSWR({ url: '/user/forum', args: {friend_uid: uid} }, fetchWithParams) as {data: followForumDetail[], isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useCutPost(uid:number) {
  const {data, isLoading,error } = useSWR({ url: '/tiebapost', args: {uid, batch: '1,15', other: 'https://node-jieba.wang1m.tech'} }, fetchWithParams, hardDataOptions) as {data: CutPost, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function useSimplePost(uid:number) {
  const {data, isLoading,error } = useSWR({ url: '/user/posts', args: {uid, batch: '1,15',simple: "true"} }, fetchWithParams, hardDataOptions) as {data: SimplePost, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export function usePost(tid:string) {
  const {data, isLoading,error } = useSWR({ url: '/post/getPost', args: {tid, needAll: true,with_comments:true, require: "counter,plainText,timeLine", maxPage: 300} }, fetchWithParams, hardDataOptions) as {data: getPostPage, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}


export function useForumThreadCut(fname: string) {
  const {data, isLoading,error } = useSWR({ url: '/tiebathread', args: {fname, batch: '1,5', other: 'https://node-jieba.wang1m.tech'}}, fetchWithParams, hardDataOptions) as {data: forumThreadCutPage, isLoading: boolean, error: any}
  return {
    data,
    isLoading,
    isError: error,
  }
}

export async function getForumName(fid:number) {
  let forumPairs = JSON.parse(localStorage.getItem("forumPairs") || "{}");

  if (forumPairs[fid]) {
    return forumPairs[fid];
  }

  let forumName = await fetch(baseURL+`/forum/getName?uid=${fid}`).then(res => res.text());
  forumPairs[fid] = forumName;
  localStorage.setItem("forumPairs", JSON.stringify(forumPairs));
  return forumName;
}

