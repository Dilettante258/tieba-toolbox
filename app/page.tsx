
import Image from "next/image";

import SelectComp from '@/components/custom/select'


import { ActivityCalendar } from 'react-activity-calendar';
import FeatureCard from "@/components/custom/FeatureCard";

const data = [
  {
    date: '2024-01-01',
    count: 2,
    level: 1,
  },
  {
    date: '2024-06-23',
    count: 2,
    level: 1,
  },
  {
    date: '2024-08-02',
    count: 16,
    level: 4,
  },
  {
    date: '2024-09-29',
    count: 11,
    level: 3,
  },
];


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SelectComp />
      <ActivityCalendar 
      
      theme={{
          light: ['hsl(0, 0%, 92%)', 'firebrick'],
          dark: ['#333', 'rgb(214, 16, 174)'],
         }}
      data={data} />;

      <FeatureCard />
    </div>
  );
}
