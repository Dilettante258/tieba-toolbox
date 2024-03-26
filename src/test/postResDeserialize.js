import pkg from 'protobufjs';
const { load } = pkg;

import {Buffer} from "buffer/";

export function postResDeserialize(buffer) {
  return new Promise((resolve, reject) => {
    load("./protobuf/UserPost/UserPostResIdl.proto", function (err, root) {

      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("UserPostResIdl");
      let decoded = AwesomeMessage.decode(Buffer.from(buffer));
      // console.log(`decoded = ${JSON.stringify(decoded)}`);
      let data = decoded.data.postList;
      resolve(data);
    });
  });
}
