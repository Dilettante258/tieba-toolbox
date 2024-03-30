import {Button, Code, Input} from "@nextui-org/react";
import {Form, Outlet, useLoaderData} from "react-router-dom";

type LoaderParams = {
  un: string;
};

function Friends() {
  const params = useLoaderData() as LoaderParams;
  return (
    <>
      <div className="text-center">
        <h1 className="p-4">关联查询</h1>
        <Form
          className="row"
          method="post"
          action="/friends"
          id="searchFansForm"
        >
          <Input
            name="un"
            defaultValue={params.un}
            isClearable
            type="text"
            label="用户名 / ID"
            variant="bordered"
            onClear={() => console.log("input cleared")}
            className="max-w-xs mx-auto py-3"
          />
          <p className="text-default-600/90 text-center">注意！使用此功能需要在右上角的设置中设定<Code>BDUSS</Code>。</p>
          <p
            className="text-default-600/90 text-center">该功能用于筛选所搜索用户的粉丝列表中是否存在与你的关联（关注、粉丝、互关）。</p>
          <p
            className="text-default-600/90 text-center">对自己搜索则为导出互关列表。</p>
          <Button color="primary" type="submit">
            查询
          </Button>
        </Form>
      </div>
      <Outlet/>
    </>
  )
}

export default Friends;