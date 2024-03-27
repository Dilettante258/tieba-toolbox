import {forumReqSerialize, forumResDeserialize} from './ProtobufParser.ts';
import {client} from "./client.ts";


export async function fetchForumName(fid:number) {
  try {
    const buffer = await forumReqSerialize(fid);
    console.log(`forumBuffer = ${buffer}`);

    let blob = new Blob([buffer]);
    console.log('blob',blob);
    let data = new FormData();
    await data.append('data', blob);
    console.log(data);

    const response = await client.post('/tieba/c/f/forum/getforumdetail?cmd=303021',
      data,{
      headers: {
        'x_bd_data_type': 'protobuf',
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
      responseType: 'arraybuffer',
    });

    const fname = await forumResDeserialize(response.data);
    console.log(fname);

    return fname;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


