echo "generate bundle.js"
pbjs -t json */*.proto  > protobuf.json
echo "done"