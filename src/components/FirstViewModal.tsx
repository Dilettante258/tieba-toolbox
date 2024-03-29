import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";

export default function FirstViewModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const hasOpenedBefore = localStorage.getItem("hasOpened");
    if (!hasOpenedBefore) {
      // 第一次打开网站，设置hasOpened为true，并将其存储在本地存储
      localStorage.setItem("hasOpened", "true");
      onOpen(); // 打开弹出窗口
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">初次使用告知</ModalHeader>
              <ModalBody>
                <p>
                  目前还在开发中，可能会有一些问题，如果有任何问题或建议，请在
                  <a href="https://github.com/Dilettante258/tieba-tools" target="_blank"
                     className="text-secondary hover:underline"> TiebaToolbox - Github</a> 中提出 issue 或者直接联系作者。</p>
                <p>
                  查询用户发言的功能第一次用需要多等几秒，之后就正常速度了。因为百度贴吧的API机制原因，通过API获取的回复数据不会携带所在吧的名称，
                  所以需要通过另一个api获取。我已经配置了浏览器缓存来减少请求次数，但是第一次加载可能会比较慢，后面我还会增加其他优化手段。
                </p>
                <p>
                  本站点没有后端，所有数据都是通过百度贴吧的API获取的，不会保存任何用户数据。
                </p>
              </ModalBody>
              <ModalFooter>
                {/*<Button color="danger" variant="light" onPress={onClose}>*/}
                {/*  Close*/}
                {/*</Button>*/}
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
