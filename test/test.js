import axios from "axios";
import { Md5 } from "ts-md5";

// let data1 = new FormData(json);
// console.log(data1);

let data = new FormData();
data.append('BDUSS', BDUSS);
data.append('_client_version', '12.57.4.2');
data.append('pn', '2');
data.append('uid', '5991323492');
let string = '';
data.forEach((value, key,iterable)=> {
    string = string +`${key}=${value}`})
console.log(string)
let middle = string+'tiebaclient!!!'
let sign = Md5.hashStr(middle).toUpperCase();
data.append('sign', sign);
console.log(sign)


export async function fetchFansPage () {
  return new Promise(resolve => {
    axios.post('https://tieba.baidu.com/c/u/fans/page',
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

// let res = await fetchData();
//
// console.log(res);

let key = Md5.hashStr('hello');
console.log(key)

// encodeURIComponent(updates.un as string);

// let pn = 2
// let uid = 5991323492
// let params= `BDUSS=${BDUSS}_client_version=12.57.4.2pn=${pn}uid=${uid}`
// let a = params+'tiebaclient!!!'
// let sign = Md5.hashAsciiStr(a).toUpperCase();
// console.log(sign)


// let dirname = "C:\\Users\\admir\\Downloads";
// fs.readFile(path.resolve(dirname, 'file'), (err, data) => {
//   fs.writeFile(path.resolve(dirname, './file'), Buffer, (err, data) => {
//     console.log(data);
//   })
// })