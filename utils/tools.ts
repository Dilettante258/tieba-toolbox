import {Word} from "@cyberblast/react-wordcloud";
import {Counter, SimplePost} from "@/utils/type";
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

export function convertCount(data: Counter): Word[] {
  const result = [];

  for (const key in data) {
    result.push({
      text: key,
      value: data[key]
    });
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


export function transformCounter(obj:Counter) {
  const keys = Object.keys(obj);
  const result:any = [];

  keys.forEach((key, index) => {
    const transformedObj = {
      key: key,
      data: obj[key]
    };
    result.push(transformedObj);
  });

  return result;
}

export function splitTimestamps(timeLine: number[]): BaseChartDataShape<number>[] {
  const singleDateData = [];
  const timeDiff = (timeLine[timeLine.length - 1] - timeLine[0]) * 1000;
  const oneMinute = 60 * 1000;
  const fifteenMinutes = 15 * oneMinute;
  const thirtyMinutes = 30 * oneMinute;
  const oneHour = 60 * oneMinute;
  const twoHours = 2 * oneHour;
  const fourHours = 4 * oneHour;
  const oneDay = 24 * oneHour;
  const threeDays = 3 * oneDay;
  const oneWeek = 7 * oneDay;
  const twoWeeks = 2 * oneWeek;
  const threeMonths = 3 * 30 * oneDay;

  let interval;
  if (timeDiff <= 12 * oneHour) {
    interval = fifteenMinutes;
  } else if (timeDiff <= oneDay) {
    interval = thirtyMinutes;
  } else if (timeDiff <= threeDays) {
    interval = oneHour;
  } else if (timeDiff <= oneWeek) {
    interval = twoHours;
  } else if (timeDiff <= twoWeeks) {
    interval = fourHours;
  } else if (timeDiff <= 5 * oneWeek) {
    interval = oneDay;
  } else if (timeDiff <= threeMonths) {
    interval = threeDays;
  } else {
    interval = oneWeek;
  }

  let currentIntervalStart = timeLine[0] * 1000;
  let count = 0;
  for (let i = 0; i < timeLine.length; i++) {
    const timestamp = timeLine[i] * 1000;
    if (timestamp - currentIntervalStart <= interval) {
      count++;
    } else {
      singleDateData.push({
        id: singleDateData.length.toString(),
        key: new Date(currentIntervalStart),
        data: count
      });
      currentIntervalStart = timestamp;
      count = 1;
    }
  }

  singleDateData.push({
    id: singleDateData.length.toString(),
    key: new Date(currentIntervalStart),
    data: count
  });

  return singleDateData;
}

export async function CountWords(text: string|string[]) {
  const formData = new FormData();
  if (typeof text !== 'string') {
    text = text.join('\n');
  }
  formData.append('text', text);
  const res =  await fetch('https://node-jieba.wang1m.tech/cutcount/text', {
    method: 'POST',
    mode: "cors",
    body: formData,
  }).then(res => res.json())
  console.log(res);
  return res.result;
}