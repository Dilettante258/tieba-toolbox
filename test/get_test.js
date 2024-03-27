import axios from 'axios';
import {postReqSerialize} from './postReqSerialize.js';
import {postResDeserialize} from './postResDeserialize.js';

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  try {
    const buffer = await postReqSerialize();
    console.log(`buffer = ${buffer}`);
    let blob = new Blob([buffer]);
    // await delay(2000);

    let data = new FormData()
    data.append('data', blob)

    axios({
        method: 'post',
        url: '/c/u/feed/userpost?cmd=303002',
        baseURL: 'https://tiebac.baidu.com/',

        headers: {
          'x_bd_data_type': 'protobuf',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
        },
        data,
        responseType: 'arraybuffer',

      }
    ).then((res) => {
       let a = postResDeserialize(res.data)
        console.log(a)
    }).then((res) => {
      console.log(JSON.stringify(res));
    })
  } catch (error) {
    console.error(error);
  }
})();

