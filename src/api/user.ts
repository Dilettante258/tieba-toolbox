import {client} from "./client.ts";
import {getUserId} from "./cache.ts";
import {Md5} from "ts-md5";
import {FansPage, FollowsPage} from "./type.ts";



export async function fetchUserId(UserName:string|number) {
  try {
    const res = await client.get(`/tieba/i/sys/user_json?un=${UserName}&ie=utf-8`);
    return res.data.id as number;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchSignedForm (target:string,data: FormData): Promise<JSON>{
  return new Promise(resolve => {
    client.post(target,
      data,
      {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.log(err);
    })
  })
}

export async function fetchUserFollows(UserName:string, Page:string):Promise<FollowsPage> {
  try {
    const data = await packRequest(UserName, Page);
    const res = await fetchSignedForm ('/tieba/c/u/follow/followList',data);
    // @ts-ignore
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchUserFans(UserName:string, Page:string):Promise<FansPage> {
  try {
    const data = await packRequest(UserName, Page);
    const res = await fetchSignedForm('/tieba/c/u/fans/page',data);
    // @ts-ignore
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function packRequest(UserName: string, Page: string): Promise<FormData> {
  let uid = await getUserId(UserName) as number;
  let data = new FormData();
  let BDUSS = localStorage.getItem('BDUSS') as string;
  data.append('BDUSS', BDUSS);
  data.append('_client_version', '12.57.4.2');
  data.append('pn', Page);
  data.append('uid', uid.toString());
  let string = '';
  data.forEach((value, key)=> {
    string = string +`${key}=${value}`})
  let middle = string+'tiebaclient!!!'
  let sign = Md5.hashStr(middle).toUpperCase();
  data.append('sign', sign);
  return data;
}