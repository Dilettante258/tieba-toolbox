var protobuf   = require("protobufjs");


const fs = require('fs');
const path = require('path');


export default function getProtoBuf() {
  let buffer;
  protobuf.load("./protobuf/UserPost/UserPostReqIdl.proto", function(err, root) {
    if (err)
      throw err;

    // Obtain a message type
    var AwesomeMessage = root.lookupType("UserPostReqIdl");

    // Exemplary payload
    var payload = {
      data: {
        needContent: 1,
        userId: 5991323492,
        pn: 3,
        common: {
          clientversion: "8.9.8.5",
        }
      }
    };

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    console.log(payload)
    if (errMsg)
      throw Error(errMsg);

    // Create a new message
    var message = AwesomeMessage.fromObject(payload); // or use .fromObject if conversion is necessary
    console.log(message)
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer
    console.log(buffer)
  });
  return buffer;
};

protobuf.load("./protobuf/UserPost/UserPostReqIdl.proto", function(err, root) {
  if (err)
    throw err;

  // Obtain a message type
  var AwesomeMessage = root.lookupType("UserPostReqIdl");

  // Exemplary payload
  var payload = {
    data: {
      needContent: 1,
      userId: 5991323492,
      pn: 3,
      common: {
        clientversion: "8.9.8.5",
      }}
  };

  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  var errMsg = AwesomeMessage.verify(payload);
  console.log(payload)
  if (errMsg)
    throw Error(errMsg);

  // Create a new message
  var message = AwesomeMessage.fromObject(payload); // or use .fromObject if conversion is necessary
  console.log(message)
  // Encode a message to an Uint8Array (browser) or Buffer (node)
  var buffer = AwesomeMessage.encode(message).finish();
  // ... do something with buffer
  console.log(buffer)

  // Decode an Uint8Array (browser) or Buffer (node) to a message
  var message2 = AwesomeMessage.decode(buffer);
  // ... do something with message
  console.log(message2)
});