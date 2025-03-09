'use client'

import {animate, inView, stagger} from "motion";
import {useEffect} from "react";
import {MousePointerClick, PocketKnife, SearchCheck, UserRoundCheck} from "lucide-react";
import styles from './InViewPopItem.module.css'
import clsx from "clsx";

function Item({icon, title, description}: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className={clsx(styles.item, "data-item")}>
      <div className={styles.icon}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}


function InViewPopItem() {
  useEffect(() => {
    inView("div.data-list", (element) => {
      animate(element, { opacity: [0, 1] }, { duration: 1 })
      animate(".data-item", { opacity: [0, 1], y: [100, 0] }, { delay: stagger(0.15, { from: "first" }) })
    })
  }, []);

  return (
    <div className={clsx(styles.list, "data-list")}>
      <Item icon={<MousePointerClick color='#1D8AE7' />} title='90+' description='人次日均访问量'/>
      <Item icon={<SearchCheck color='#F76B15' />} title='2nd' description='Bing搜索关键词中曾排行第二'/>
      <Item icon={<PocketKnife color='#E75054' />} title='6+' description='常用功能并持续更新中'/>
      <Item icon={<UserRoundCheck color='#D6409F' />} title='3000+' description='累计独立使用者'/>
    </div>
  )
}

export default InViewPopItem;
