import protobuf from 'protobufjs';
import jsonDescriptor from './protobuf.json';
import {Buffer} from "buffer";

const root = protobuf.Root.fromJSON(jsonDescriptor);
export function postReqSerialize(userId:number, pn:number): Promise<Buffer> {
  return new Promise((resolve) => {
    const Proto = root.lookupType("UserPostReqIdl");

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

    const message = Proto.create(payload);
    const buffer = Proto.encode(message).finish();
    // let decoded = Proto.decode(buffer);
    // console.log(`decoded = ${JSON.stringify(decoded)}`);

    resolve(Buffer.from(buffer));
  });
}


export function postResDeserialize(buffer:Uint8Array): Promise<any>{
  return new Promise((resolve) => {
    const Proto = root.lookupType("UserPostResIdl");
    let decoded = Proto.decode(Buffer.from(buffer)) as any;
    console.log(`decoded = ${JSON.stringify(decoded)}`);
    let data = decoded.data.postList;
    resolve(data);
  });
}

export function forumReqSerialize(forumId:number): Promise<Buffer> {
  return new Promise((resolve) => {
    const Proto = root.lookupType("GetForumDetailReqIdl");

    const payload = {
      data: {
        forumId: forumId,
        common: {
          clientversion: "12.57.0.1",
        }
      }
    };

    const message = Proto.create(payload);
    const buffer = Proto.encode(message).finish();
    // console.log(buffer);
    // console.log(`encoded = ${buffer}`);
    resolve(Buffer.from(buffer));
  });
}

export function forumResDeserialize(buffer:Uint8Array) {
  return new Promise((resolve) => {
    const Proto = root.lookupType("GetForumDetailResIdl");

    let decoded = Proto.decode(Buffer.from(buffer)) as any;
    // let decoded = Proto.decode(buffer);
    // console.log(`decoded = ${JSON.stringify(decoded)}`);
    let data = decoded.data.forumInfo;
    let forumName = data.forumName;

    resolve(forumName);
  });
}



