import {Word} from "@cyberblast/react-wordcloud";
import {SimplePost} from "@/utils/type";
import {getForumName} from "@/utils/useSWR";
import {BaseChartDataShape} from "reaviz";

export function countForumOccurrences(data: SimplePost):Word[] {
  const result: Word[] = [];

  for (const item of data.result) {
    const foundItem = result.find((r) => r.text === item.forumName);

    if (foundItem) {
      foundItem.value++;
    } else {
      result.push({ text: item.forumName, value: 1 });
    }
  }

  return result;
}

export function transformData(input: SimplePost, offset = 0): BaseChartDataShape<number>[] {
  const heatmapCalendarData: BaseChartDataShape<number>[] = [];
  const dateCountMap: { [date: string]: number } = {};

  // Calculate the start date based on the current date and the offset
  const now = new Date();
  const startYear = now.getUTCFullYear() - 1;
  const startMonth = (now.getUTCMonth() - offset + 12) % 12;
  const startDate = Date.UTC(startYear, startMonth, 1, 5, 0, 0, 0);

  for (const item of input.result) {
    const date = new Date(item.createTime * 1000);
    if (date.getTime() < startDate) {
      continue;
    }

    if (date.getUTCHours() < 5) {
      date.setUTCDate(date.getUTCDate() - 1);
    }

    date.setUTCHours(5, 0, 0, 0);

    const dateString = date.toISOString().split('T')[0];

    dateCountMap[dateString] = (dateCountMap[dateString] || 0) + 1;
  }

  for (const [dateString, count] of Object.entries(dateCountMap)) {
    heatmapCalendarData.push({
      key: new Date(`${dateString}T05:00:00.000Z`),
      data: count
    });
  }

  return heatmapCalendarData;
}
