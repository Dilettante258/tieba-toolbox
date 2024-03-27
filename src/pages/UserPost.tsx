import {Button, Input} from "@nextui-org/react";
import {Form, LoaderFunctionArgs, Outlet, redirect, useLoaderData} from "react-router-dom";

type LoaderParams = {
  un: string;
  page: string;
};


export async function searchPostAction({ request }:{ request: Request }) {
  const formData = await request.formData();
  console.log(formData);
  const updates = Object.fromEntries(formData);
  console.log('updates', updates);
  if (!updates.un || !updates.page) {
    return redirect('/userpost');
  }
  let encodeun = encodeURIComponent(updates.un as string);
  return redirect(`/userpost/${encodeun}/${updates.page}`);
}


export async function UPLoader({params}:LoaderFunctionArgs<LoaderParams>) {
  return params;
}

function UserPost() {
  const params = useLoaderData() as LoaderParams;

  return (
      <>
        <div className="text-center">
          <h1 className="p-2">历史发言查询</h1>
          <Form
            className="row"
            method="post"
            action="/userpost"
            id="searchUserPostForm"
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
            <Input
              name="page"
              defaultValue={params.page}
              type="number"
              label="页数"
              variant="bordered"
              onClear={() => console.log("input cleared")}
              className="max-w-xs mx-auto py-3"
            />
            <Button color="primary" type="submit">
              查询
            </Button>
          </Form>
        </div>
        <Outlet />
      </>
    )
}

export default UserPost;