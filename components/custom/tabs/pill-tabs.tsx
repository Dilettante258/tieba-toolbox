"use client"

import { type ReactNode, useState } from "react"
import styles from "./pill-tabs.module.css"

interface TabsProps {
  tabs: {
    label: string
    content: ReactNode
  }[]
  defaultTab?: number
}

export default function PillTabs({ tabs, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className={styles.tabsContainer}>
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
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  )
}
