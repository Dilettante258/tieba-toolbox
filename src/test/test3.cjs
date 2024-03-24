var protobuf   = require("protobufjs"), // requires the full library
  descriptor = require("protobufjs/ext/descriptor");

var root = 'file2';

// convert any existing root instance to the corresponding descriptor type
var descriptorMsg = root.toDescriptor("proto3");
// ^ returns a FileDescriptorSet message, see table below

// encode to a descriptor buffer
var buffer = descriptor.FileDescriptorSet.encode(descriptorMsg).finish();

// decode from a descriptor buffer
var decodedDescriptor = descriptor.FileDescriptorSet.decode(buffer);

// convert any existing descriptor to a root instance
root = protobuf.Root.fromDescriptor(decodedDescriptor);