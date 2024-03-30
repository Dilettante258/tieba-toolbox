import {Button, Code, Input} from "@nextui-org/react";
import {Form, LoaderFunctionArgs, Outlet, redirect, useLoaderData} from "react-router-dom";

type LoaderParams = {
  un: string;
};


export async function searchFollowsAction({ request }:{ request: Request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (!updates.un) {
    return null;
  }
  let encodeun = encodeURIComponent(updates.un as string);
  return redirect(`/follows/${encodeun}`);
}


export async function UnLoader({params}:LoaderFunctionArgs<LoaderParams>) {
  return params;
}

function Follows() {
  const params = useLoaderData() as LoaderParams;

  return (
    <>
      <div className="text-center">
        <h1 className="p-4">关注查询</h1>
        <Form
          className="row"
          method="post"
          action="/follows"
          id="searchFollowsForm"
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
          <Button color="primary" type="submit">
            查询
          </Button>
        </Form>
      </div>
      <Outlet/>
    </>
  )
}

export default Follows;