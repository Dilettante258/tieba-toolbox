import protobuf from 'protobufjs';
import jsonDescriptor from './protobuf.json';
import {Buffer} from "buffer";

const root = protobuf.Root.fromJSON(jsonDescriptor);
export function postReqSerialize(userId:number, pn:number): Promise<Buffer> {
  return new Promise((resolve) => {
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
}


export function postResDeserialize(buffer:Uint8Array): Promise<any>{
  return new Promise((resolve) => {
    const AwesomeMessage = root.lookupType("UserPostResIdl");
    let decoded = AwesomeMessage.decode(Buffer.from(buffer)) as any;
    // console.log(`decoded = ${JSON.stringify(decoded)}`);
    let data = decoded.data.postList;
    resolve(data);
  });
}

export function forumReqSerialize(forumId:number): Promise<Buffer> {
  return new Promise((resolve) => {
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
    const buffer = AwesomeMessage.encode(message).finish();
    console.log(buffer);
    console.log(`encoded = ${buffer}`);

    // let decoded = AwesomeMessage.decode(buffer);
    // console.log(`decoded = ${JSON.stringify(decoded)}`);

    resolve(Buffer.from(buffer));
  });
}

export function forumResDeserialize(buffer:Uint8Array) {
  return new Promise((resolve) => {

    console.log(`resBuffer = `)
    console.log(buffer)

    const AwesomeMessage = root.lookupType("GetForumDetailResIdl");

    let decoded = AwesomeMessage.decode(Buffer.from(buffer)) as any;
    // let decoded = AwesomeMessage.decode(buffer);
    // console.log(`decoded = ${JSON.stringify(decoded)}`);
    let data = decoded.data.forumInfo;
    let forumName = data.forumName;

    resolve(forumName);
  });
}



