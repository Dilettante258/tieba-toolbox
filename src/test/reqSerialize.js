import pkg from 'protobufjs';
const { load } = pkg;

export function reqSerialize() {
  return new Promise((resolve, reject) => {
    load("./protobuf/UserPost/UserPostReqIdl.proto", function (err, root) {
      if (err)
        reject(err);

      const AwesomeMessage = root.lookupType("UserPostReqIdl");

      const payload = {
        data: {
          needContent: 1,
          userId: 5991323492,
          pn: 3,
          common: {
            clientversion: "8.9.8.5",
          }
        }
      };

      const message = AwesomeMessage.create(payload);
      const Buffer = AwesomeMessage.encode(message).finish();

      // let decoded = AwesomeMessage.decode(buffer);
      // console.log(`decoded = ${JSON.stringify(decoded)}`);

      resolve(Buffer);
    });
  });
}


