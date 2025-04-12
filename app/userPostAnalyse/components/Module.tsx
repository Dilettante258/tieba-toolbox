import { Popover } from "@/components/basic/Popover";
import { DialogTrigger } from "react-aria-components";
import { Button } from "@/components/basic/Button";
import styles from "../UserPostAnalyse.module.css";
import { Ellipsis } from "lucide-react";
import { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

function Module({
  notShowPopover = false,
  children,
  onHide,
}: {
  notShowPopover?: boolean;
  children: React.ReactNode;
  onHide?: () => void;
}) {
  return (
    <div className={styles.module}>
      {!notShowPopover && (
        <DialogTrigger>
          <Button variant="icon" className="absolute top-02 right-2">
            <Ellipsis />
          </Button>
          <Popover placement="bottom end" className="flex flex-col gap-2 p-2">
            <Button variant="ghost" onPress={onHide}>隐藏当前项目</Button>
          </Popover>
        </DialogTrigger>
      )}
      {children}
    </div>
  );
}

function Title(props: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return <h2 className={clsx(styles.moduleTitle, props.className)} {...props}>{props.children}</h2>;
}

function Description(props: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={clsx(styles.moduleDescription, props.className)} {...props}>{props.children}</p>;
}
type ModuleType = typeof Module;

interface Modulenterface extends ModuleType {
  Title: typeof Title;
  Description: typeof Description;
}

const ModuleComp = Module as Modulenterface;

ModuleComp.Title = Title;
ModuleComp.Description = Description;

export default ModuleComp;
