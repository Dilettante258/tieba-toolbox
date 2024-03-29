import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { useState } from "react";
import {CopySimple, DownloadSimple} from "@phosphor-icons/react";





function Archive() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div id="archive">
      <h1 className="p-4">发言留档实例</h1>
      <p className="p-4">还没开发好</p>

      <Card className="max-w-[340px] h-auto m-4" id="content">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md"
                    src="/portrait/tb.1.1e1bb5f8._oTizPuMkZjpdOI6Dr4GDg?t=1658847638"/>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">Test</h4>
              <h5 className="text-small tracking-tight text-default-400">@test</h5>
            </div>
          </div>
          <Button
            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400 h-auto overflow-y-visible">
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
          </p>
          <span className="pt-2">
          #FrontendWithZoey
            <span className="py-2" aria-label="computer" role="img">
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>

      <p className="p-4">按钮是假的，转换为图片有问题，有需要请自己截图。</p>

      <div className="flex gap-4 items-center">
        <Button isIconOnly color="danger" aria-label="Like">
          <DownloadSimple/>
        </Button>
        <Button isIconOnly color="warning" variant="faded">
          <CopySimple/>
        </Button>
      </div>
    </div>
  )
}

export default Archive;