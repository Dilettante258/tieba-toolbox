import pkg from 'protobufjs';
const { load } = pkg;

import {Buffer} from "buffer/";

export function resDeserialize(buffer) {
  return new Promise((resolve, reject) => {
    load("./protobuf/UserPost/UserPostResIdl.proto", function (err, root) {

      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("UserPostResIdl");

      let decoded = AwesomeMessage.decode(Buffer.from(buffer));
      // console.log(`decoded = ${JSON.stringify(decoded)}`);
      let data = decoded.data.postList;
      // let json = data.toJSON();
      // console.log(data);
      //decoded.data.postList[1].toJSON()
      //decoded.data.postList[1].content[0].postContent[0].text
      resolve(data);
    });
  });
}
