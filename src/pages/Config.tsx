import {Textarea} from "@nextui-org/react";
import {Tooltip, Button} from "@nextui-org/react";
import {Form, LoaderFunctionArgs, Outlet, redirect, useLoaderData} from "react-router-dom";

function Config () {
    return (
        <div className="text-center">
            <h1>设置</h1>
            <Form className="place-item-center">
            <Textarea
                label="BUDSS"
                placeholder="输入BDUSS"
                className="max-w-xs"
            />
            <Button color="primary" type="submit">
                保存
            </Button>
            </Form>
            

            
            
        </div>
    )
}

export default Config;