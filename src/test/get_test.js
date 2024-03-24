import axios from 'axios';
import {reqSerialize} from './reqSerialize.js';
import {resDeserialize} from './resDeserialize.js';

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  try {
    const buffer = await reqSerialize();
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
       let a = resDeserialize(res.data)
        console.log(a)
    }).then((res) => {
      console.log(JSON.stringify(res));
    })
  } catch (error) {
    console.error(error);
  }
})();

