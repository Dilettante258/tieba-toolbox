import protobuf, {Type} from 'protobufjs';
import jsonDescriptor from "./bundle.json";
import {Buffer} from "buffer";

export function postReqSerialize(userId:number, pn:number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    protobuf.load(jsonDescriptor, function (err, root) {

      if (err){
        reject(err);
        return;
      }

      const AwesomeMessage = root.lookupType("UserPostReqIdl");

      const payload = {
        data: {
          needContent: 1,
          userId: userId,
          pn: pn,
          common: {
            clientversion: "8.9.8.5",
          }
        }
      };

      const message = AwesomeMessage.create(payload);
      const buffer = AwesomeMessage.encode(message).finish();

      // let decoded = AwesomeMessage.decode(buffer);
      // console.log(`decoded = ${JSON.stringify(decoded)}`);
      resolve(Buffer.from(buffer));
    });
  });
}


