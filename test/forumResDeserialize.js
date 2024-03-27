import pkg from 'protobufjs';
const { load } = pkg;
import {Buffer} from "buffer/";


export default function forumResDeserialize(buffer) {
  return new Promise((resolve, reject) => {
    load("./protobuf/Forum/GetForumDetailResIdl.proto", function (err, root) {
    // load("C:\\Users\\admir\\WebstormProjects\\tieba-tools\\public\\protobuf\\Forum\\GetForumDetailResIdl.proto", function (err, root) {
      console.log(`resBuffer = `)
      console.log(buffer)
      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("GetForumDetailResIdl");

      let decoded = AwesomeMessage.decode(Buffer.from(buffer));
      // let decoded = AwesomeMessage.decode(buffer);
      console.log(`decoded = ${JSON.stringify(decoded)}`);
      let data = decoded.data.forumInfo;
      let forumName = data.forumName;

      resolve(forumName);
    });
  });
}

// let dirname = "C:\\Users\\admir\\Downloads";
// fs.readFile(path.resolve(dirname, 'response'), (err, data) => {
//   forumResDeserialize(data)
// })
