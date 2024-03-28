import {Button, Textarea} from "@nextui-org/react";
import {Form} from "react-router-dom";
import {useState} from "react";

function Config () {

  const [BUDSS, setBUDSS] = useState<string>(localStorage.getItem('BDUSS')||'');
  return (
    <div className="flex flex-col text-center place-content-center">
      <h1>设置</h1>
      <Form className="place-item-center">
      <Textarea
          label="BUDSS"
          value={BUDSS}
          onChange={(e) => {
            setBUDSS(e.target.value);
          }}
          placeholder="输入BDUSS"
          className="max-w-xs mx-auto py-3"
      />
      <Button
        color="primary"
        onClick={() => {
          localStorage.setItem('BDUSS', BUDSS);
        }}
      >
          保存
      </Button>
      </Form>
    </div>
  )
}

export default Config;