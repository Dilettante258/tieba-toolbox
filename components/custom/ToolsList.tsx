'use client'

import React, {PointerEventHandler, useEffect, useRef, useState} from "react"

import { animate, inView, stagger} from 'motion';
import styles from './ToolsList.module.css'
import {AtSign, ChartArea, Group, IdCard, Rows3, UserPen, UserPlus} from "lucide-react";
import clsx from "clsx";
import { motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";

function useElementDimensions(
  ref: React.RefObject<HTMLDivElement | null>
): [
  { width: number; height: number; top: number; left: number },
  VoidFunction
] {
  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 })

  function measure() {
    if (!ref.current) return
    setSize(ref.current.getBoundingClientRect())
  }

  // Note: This won't accurately reflect viewport size changes
  useEffect(() => {
    measure()
  }, [])

  return [size, measure]
}

function ToolsItem({icon, title, description, href}: { icon: React.ReactNode, title: string, description: string,  href: string}) {
  const ref = useRef<HTMLDivElement>(null)
  const [{top, left }, measure] = useElementDimensions(ref)
  const useHoverBack = useMotionValue(false)
  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)
  const background = useTransform(()=>
    `radial-gradient(200px at ${mouseX.get()-left}px ${mouseY.get()-top}px, rgba(142, 78, 198, 0.125), transparent 80%)`
  )
  const [update, setUpdate] = useState(0)
  function addClassName(node: React.ReactNode,className: string) {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        // @ts-ignore
        className: clsx(node.props.className, className) as string,
      });
    }
  }


  const handelMove: PointerEventHandler<HTMLAnchorElement> = function (e){
    mouseX.set(e.clientX, false);
    mouseY.set(e.clientY, true);
  }


  function handelLeave(){
    useHoverBack.set(false)
    background.set('',true)
    setUpdate((prev)=>prev+1)
  }


  return (
    <Link className={clsx(styles.item, 'feature-item')} href={href}
          onPointerEnter={(e) => {
            mouseX.set(e.clientX, false);
            mouseY.set(e.clientY, true);
            useHoverBack.set(true)
          }}
          onPointerMove={handelMove}
          onPointerLeave={handelLeave}
    >
      {addClassName(icon, styles.bgSvg)}
      <div className={styles.content}>
        {addClassName(icon, styles.icon)}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <motion.div ref={ref}
                  style={{
                    background: useHoverBack.get() ? background.get():'',
                    position: "absolute",
                    inset: -1,
                    width: "100%",
                    height: "100%",
                    transitionDuration: '0.5s',
                  }}
                  onPointerMove={()=>measure()}
                  data-test={useHoverBack.get()}

      />
    </Link>
  )
}

function ToolsList() {

  useEffect(() => {
    inView('.feature-list', (element) => {
      console.log("Element2 has entered the viewport")
      animate(element, { opacity: [0, 1] }, { duration: 1 })
      animate('.feature-item', { opacity: [0, 1], y: [100, 0] }, { delay: stagger(0.15, { from: "first" }) })

    })
  }, []);


  return (
    <div className={clsx(styles.container,'feature-list')}>
      <ToolsItem icon={<Rows3 />} title='发言查询' description='查询用户发言' href='/userpost' />
      <ToolsItem icon={<UserPlus />} title='关注查询' description='查询用户关注了哪些用户' href='/follow' />
      <ToolsItem icon={<AtSign />} title='粉丝查询' description='查询用户的粉丝' href='/fan' />
      <ToolsItem icon={<Group />} title='关注贴吧查询' description='查询用户关注了哪些贴吧' href='/likeForum' />
      <ToolsItem icon={<IdCard />} title='个人资料查询' description='查询用户个人资料' href='/profile' />
      <ToolsItem icon={<ChartArea />} title='用户发帖分析' description='对用户历史发言进行数据分析' href='/userPostAnalyse' />
    </div>
  )
}

export default ToolsList;
