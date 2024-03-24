var protobuf   = require("protobufjs"), // requires the full library
  descriptor = require("protobufjs/ext/descriptor");
const fs = require('fs');
const path = require('path');



protobuf.load("awesome.proto", function(err, root) {
  if (err)
    throw err;

  // Obtain a message type
  var UserPostReqIdl = root.lookupType("AwesomeMessage");

  // Exemplary payload
  var payload = {
    userid: 5991323492,
    needcontent: 1,
    pn: 2,
    common :{
      clientversion: "8.9.8.5"
    }
  };

  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  var errMsg = UserPostReqIdl.verify(payload);
  if (errMsg)
    throw Error(errMsg);

  // Create a new message
  var message = UserPostReqIdl.create(payload); // or use .fromObject if conversion is necessary
  console.log(message)
  // Encode a message to an Uint8Array (browser) or Buffer (node)
  const buffer = UserPostReqIdl.encode(message).finish();
  // ... do something with buffer
  console.log(buffer)


  // Decode an Uint8Array (browser) or Buffer (node) to a message
  var message = UserPostReqIdl.decode(buffer);
  // ... do something with message
  console.log(message)
  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

  // Maybe convert the message back to a plain object
  // var object = UserPostReqIdl.toObject(message, {
  //   user_id: 5991323492,
  //   need_content: 1,
  //   pn: 2,
  //   common :{
  //   _client_version: "8.9.8.5"
  // }
  // });
  // console.log(object)
  // console.log(message)
  let data = buffer

  fs.readFile(path.resolve(__dirname, 'test111'), (err, data) => {
    fs.writeFile(path.resolve(__dirname, './test111'), buffer, (err, data) => {
      console.log(data);
    })
  })
});