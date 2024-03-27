import pkg from 'protobufjs';
import fs from "fs";
import path from "path";
const { load } = pkg;

export default function forumReqSerialize(forumId) {
  return new Promise((resolve, reject) => {
    // load("./protobuf/Forum/GetForumDetailReqIdl.proto", function (err, root) {
    load("C:\\Users\\admir\\WebstormProjects\\tieba-tools\\public\\protobuf\\Forum\\GetForumDetailReqIdl.proto", function (err, root) {

      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("GetForumDetailReqIdl");

      const payload = {
        data: {
          forumId: forumId,
          common: {
            clientversion: "12.57.0.1",
          }
        }
      };

      const message = AwesomeMessage.create(payload);
      const Buffer = AwesomeMessage.encode(message).finish();
      console.log(Buffer);
      console.log(`encoded = ${Buffer}`);

      let decoded = AwesomeMessage.decode(Buffer);
      console.log(`decoded = ${JSON.stringify(decoded)}`);


      let dirname = "C:\\Users\\admir\\Downloads";
      fs.readFile(path.resolve(dirname, 'file'), (err, data) => {
        fs.writeFile(path.resolve(dirname, './file'), Buffer, (err, data) => {
          console.log(data);
        })
      })

      resolve(Buffer);
    });
  });
}

forumReqSerialize(97650)


