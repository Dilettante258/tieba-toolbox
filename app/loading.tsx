import {Spinner} from "@nextui-org/react";

export default function Loading() {
  return (
    <div id="unusual-page">
      <Spinner label="数据加载中..." color="primary"/>
    </div>
  )
}