import {client} from "./client.ts";
import {getUserId} from "./cache.ts";
import {Md5} from "ts-md5";
import {FansPage, FollowForumsPage, FollowsPage} from "./type.ts";



export async function fetchUserId(UserName:string) {
  try {
    const res = await client.get(`/tieba/i/sys/user_json?un=${encodeURI(UserName)}&ie=utf-8`);
    console.log('res',res.data);
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
    const data = await packRequest({'pn': Page, 'uid': UserName});
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
    const data = await packRequest({'pn': Page, 'uid': UserName});
    const res = await fetchSignedForm('/tieba/c/u/fans/page',data);
    // @ts-ignore
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchUserFollowForums(UserName:string, Page?:string):Promise<FollowForumsPage> {
  try {
    const data = await packRequest({'friend_uid': UserName,'page_no': Page||1, 'page_size': 400});
    const res = await fetchSignedForm('/tieba/c/f/forum/like',data);
    // @ts-ignore
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function packRequest(params: Record<string, string | number>): Promise<FormData> {
  let data = new FormData();
  let BDUSS = localStorage.getItem('BDUSS') || process.env.BDUSS as string;
  data.append('BDUSS', BDUSS);
  data.append('_client_version', "8.9.8.5");

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      //自动转换用户名为uid
      if (key === 'uid'||key === 'friend_uid') {
        let uid = await getUserId(params[key] as string);
        data.append(key, String(uid));
      } else {
        data.append(key, params[key].toString());
      }
    }
  }

  let string = '';
  data.forEach((value, key)=> {
    string = string +`${key}=${value}`})
  let middle = string+'tiebaclient!!!'
  let sign = Md5.hashStr(middle).toUpperCase();
  data.append('sign', sign);
  return data;
}