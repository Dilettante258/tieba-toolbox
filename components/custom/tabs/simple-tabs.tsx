"use client"

import { type ReactNode, useState } from "react"
import styles from "./simple-tabs.module.css"
import clsx from "clsx"

interface TabsProps {
  tabs: {
    label: string
    content: ReactNode
  }[]
  defaultTab?: number
  className?: string
}

export default function SimpleTabs({ tabs, defaultTab = 0, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className={clsx(styles.tabsContainer, className)}>
      <div className={styles.tabsList}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={tab.label}
            className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
        <div
          className={styles.indicator}
          style={{
            left: `calc(${activeTab * 100}% / ${tabs.length})`,
            width: `calc(100% / ${tabs.length})`,
          }}
        />
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  )
}
