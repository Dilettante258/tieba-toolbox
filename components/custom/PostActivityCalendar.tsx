"use client";

import {
  Activity,
  ActivityCalendar,
  EventHandlerMap,
  Props as CalendarProps,
  ThemeInput,
} from "react-activity-calendar";

import { useTheme } from "next-themes";
import { Suspense } from "react";

const labels = {
  months: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  totalCount: "{{year}}年共发言{{count}}条",
  legend: {
    less: "少",
    more: "多",
  },
} satisfies CalendarProps["labels"];

const githubTheme: ThemeInput = {
  light: ["hsl(0, 0%, 92%)", "#9BE9A8", "#40C463", "#30A14E", "#216E39"],
  dark: ["#21242a", "#0E4429", "#006D32", "#26A641", "#39D353"],
};

function PostActivityCalendar({
  data,
  eventHandlers,
}: {
  data: Activity[];
  eventHandlers: EventHandlerMap;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <ActivityCalendar
    data={data}
    labels={labels}
    showWeekdayLabels
    theme={githubTheme}
    colorScheme={resolvedTheme as "light" | "dark"}
    eventHandlers={eventHandlers}
  />
  );
}

export default PostActivityCalendar;
