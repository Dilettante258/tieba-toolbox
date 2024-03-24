import pkg from 'protobufjs';
import fs from "fs";
import path from "path";
const { load } = pkg;

export function resDeserialize(buffer) {
  return new Promise((resolve, reject) => {
    load("C:\\Users\\admir\\WebstormProjects\\tieba-tools\\src\\test\\protobuf\\UserPost\\UserPostResIdl.proto", function (err, root) {
      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("UserPostResIdl");

      let decoded = AwesomeMessage.decode(buffer);
      console.log(`decoded = ${JSON.stringify(decoded)}`);
      let data = decoded.data.postList;
      let json = data.toJSON();
      console.log(json);
      //decoded.data.postList[1].toJSON()
      //decoded.data.postList[1].content[0].postContent[0].text
      resolve(json);
    });
  });
}
