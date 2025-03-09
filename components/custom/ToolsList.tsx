'use client'

import {useEffect, useRef, useState} from "react"

import { animate, hover, inView, stagger} from 'motion';
import styles from './ToolsList.module.css'
import {Rows3} from "lucide-react";
import clsx from "clsx";
import { motion, useMotionValue, useTransform } from "motion/react";

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

function ToolsItem({icon, title, description}: { icon: React.ReactNode, title: string, description: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ width, height, top, left }, measure] = useElementDimensions(ref)
  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)
  const background = useTransform(()=>
    `radial-gradient(200px at ${mouseX.get()-left}px ${mouseY.get()-top}px, rgba(142, 78, 198, 0.125), transparent 80%)`
  )


  return (
    <div className={clsx(styles.item, 'feature-item')}
         onPointerMove={(e) => {
           mouseX.set(e.clientX, false)
           mouseY.set(e.clientY, true)
           console.log(mouseX.get(),mouseY.get())
         }}
         onPointerOut={()=>{
           console.log('111')
           mouseX.set(10000000);
           mouseY.set(10000000);
           // background.set('radial-gradient(200px at 0px 0px, rgba(142, 78, 198, 0.125), transparent 80%)')
         }}
    >
      <div className={styles.icon}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{background.get()}</p>
      <motion.div ref={ref}
                  style={{
                    background: background.get(),
                    position: "absolute",
                    inset: -1,
                    width: "100%",
                    height: "100%",
                    transitionDuration: '0.5s',
                  }}
                  onPointerMove={() => measure()}

      />
    </div>
  )
}

function ToolsList() {

  useEffect(() => {
    inView('.feature-list', (element) => {
      console.log("Element2 has entered the viewport")
      animate(element, { opacity: [0, 1] }, { duration: 1 })
      animate('.feature-item', { opacity: [0, 1], y: [100, 0] }, { delay: stagger(0.15, { from: "first" }) })

    })
    hover('.feature-item', (element, startEvent) => {
      console.log("Hover started on", element)
      console.log("At", startEvent.clientX, startEvent.clientY)
    })
  }, []);


  return (
    <div className={clsx(styles.container,'feature-list')}>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
      <ToolsItem icon={<Rows3 />} title='Test' description='Test Test'/>
    </div>
  )
}

export default ToolsList;
