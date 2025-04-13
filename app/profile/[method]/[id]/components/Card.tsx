"use client";

import SimpleTabs from "@/components/custom/tabs/simple-tabs";
import ColorfulProfileCard from "./colorful";
import SidebarProfileCard from "./sidebar";
import DarkProfileCard from "./dark";
import MinimalistProfileCard from "./minimalist";
import type { ProfileUserData } from "@/utils/getUserData";
import styles from "./Cards.module.css";

export default function ProfileCards(data: ProfileUserData) {
  const tabs = [
    {
      label: "多彩风格",
      content: <ColorfulProfileCard {...data} />,
    },
    {
      label: "侧边栏风格",
      content: <SidebarProfileCard {...data} />,
    },
    {
      label: "暗黑风格",
      content: <DarkProfileCard {...data} />,
    },
    {
      label: "简约风格",
      content: <MinimalistProfileCard {...data} />,
    },
  ];

  return <SimpleTabs tabs={tabs} className={styles.container} />;
}
