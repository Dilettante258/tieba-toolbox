import styles from "./ServiceList.module.css"
import clsx from "clsx";
import InViewPopItem from "@custom/InViewPopItem";
import ToolsList from "@custom/ToolsList";



function ServiceList() {
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <PointSvg fill="#CDCED6"/>
        <div className={styles.content}>
          <h2 className={clsx(styles.title, 'text-[#1C2024]')}>一个饱受欢迎的工具箱</h2>
          <InViewPopItem />
        </div>
      </div>
      <div className={styles.container2}>
        <PointSvg fill="#5A6169"/>
        <div className={styles.content}>
          <h2 className={clsx(styles.title, 'text-white')}>功能列表</h2>
          <ToolsList />
        </div>
      </div>


    </div>
  )
}

function PointSvg({fill}: {fill: string}) {
  return (
    <svg className={clsx(styles.svg, `fill-[${fill}]`)} width="100%" height="100%"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="servicesPattern" patternUnits="userSpaceOnUse" width="60" height="60"
                 patternTransform="scale(0.4) rotate(0)">
          <rect x="0" y="0" width="100%" height="100%" fill="transparent"></rect>
          <path
            d="M 4.95 2.7 a 2.25 2.25 90 0 1 -2.25 2.25 a 2.25 2.25 90 0 1 -2.25 -2.25 a 2.25 2.25 90 0 1 2.25 -2.25 a 2.25 2.25 90 0 1 2.25 2.25"
            strokeWidth="1" stroke="none" fill="inherit"></path>
        </pattern>
      </defs>
      <rect width="800%" height="400%" transform="translate(15,20)" fill="url(#servicesPattern)"></rect>
    </svg>
  )
}

export default ServiceList;
