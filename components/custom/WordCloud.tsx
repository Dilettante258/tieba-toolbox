import "echarts-wordcloud";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import styles from "@custom/BaPieChart.module.css";

function WordCloud() {
  const option = {
    series: [
      {
        mainType: "series",
        type: "wordCloud",
      },
    ],
  } satisfies EChartsOption;

  return (
    <ReactEcharts
      className={styles.Comp}
      style={{ height: "600px", left: "12px", top: "-8px" }}
      option={option}
    />
  );
}

export default WordCloud;
