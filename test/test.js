import axios from "axios";




let data = new FormData();
data.append('BDUSS', 'BDUSS');
data.append('_client_version', '12.57.4.2');
data.append('pn', '2');
data.append('uid', '5991323492');
data.append('sign', 'AE65FF4F1F41FF6F5AC67D13EDE9DDF6');


export async function fetchData () {
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

let res = await fetchData();

console.log(res);




// let dirname = "C:\\Users\\admir\\Downloads";
// fs.readFile(path.resolve(dirname, 'file'), (err, data) => {
//   fs.writeFile(path.resolve(dirname, './file'), Buffer, (err, data) => {
//     console.log(data);
//   })
// })