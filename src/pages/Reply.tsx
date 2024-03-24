import {Button, Input} from "@nextui-org/react";
import React, {useState} from "react";

import axios from 'axios';

// @ts-ignore
import {reqSerialize} from '../test/reqSerialize.js';
// @ts-ignore
import {resDeserialize} from '../test/resDeserialize.js';




async function GetReply(UserID: string, Page: number) {
  try {
    if (isNaN(Number(UserID))) {
      const res = await axios.get(`/tieba/i/sys/user_json?un=${UserID}&ie=utf-8`);
      UserID = res.data.id;
    }

    console.log(`UserID = ${UserID}`);

    const buffer = await reqSerialize(UserID, Page);
    console.log(`buffer = ${buffer}`);
    let blob = new Blob([buffer]);

    let data = new FormData();
    data.append('data', blob);

    const response = await axios({
      method: 'post',
      url: '/tieba/c/u/feed/userpost?cmd=303002',
      headers: {
        'x_bd_data_type': 'protobuf',
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
      data,
      responseType: 'arraybuffer',
    });

    const responseData = await resDeserialize(response.data);
    console.log(responseData);

    const result = responseData.map((a: any) => {
      return [
        a.title,
        ':',
        a.content[0].postContent[0].text,
        new Date(a.createTime * 1000).toLocaleDateString('zh-CN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })
      ].join('');
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error; // 抛出错误，以便外部代码可以捕获并处理
  }
}




function Reply() {
  const [id, setId] = useState("")
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<string[]>()

  async function HandelSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id === "") {
      return;
    }
    // let data = await GetReply(value, 1);
    // console.log('succ',data);
    await GetReply(id, page).then( (res: string[]) => {
      console.log('succ',res);
      setData(res)
    });
  }

    // @ts-ignore
  return (
      <>
        <div className="text-center">
          <h1>历史发言查询</h1>
          <form
            className="row"
            onSubmit={HandelSubmit}
          >
            <Input
              isClearable
              type="text"
              label="用户名 / ID"
              variant="bordered"
              onClear={() => console.log("input cleared")}
              value={id}
              onValueChange={(value) => setId(value)}
              className="max-w-xs mx-auto py-3"
            />
            <Input
              isClearable
              type="number"
              label="页数"
              variant="bordered"
              onClear={() => console.log("input cleared")}
              value={page.toString()}
              onValueChange={(value) => setPage(+value)}
              className="max-w-xs mx-auto py-3"
            />
            <Button color="primary" type="submit">
              Button
            </Button>
          </form>
        </div>
        <div className="rid grid-cols-1 divide-y divide-gray-400">
          {data?.map((a) => {
            return <div className="g p-1 text-lg">{a}</div>
          })}
        </div>
      </>
    )
}

export default Reply;