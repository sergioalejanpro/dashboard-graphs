import { chartTheme } from "./chartTheme.js";
import { surveyData } from "../../data/dashboard-survey-data.js";

export function renderCandidateBarChart(chart, question) {
  const sortedResults = [...question.results].sort(
    (a, b) => b.percentage - a.percentage,
  );

  const categories = sortedResults.map((result) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === result.candidateId,
    );

    return candidate.name;
  });

  const values = sortedResults.map((result) => result.percentage);

  const colors = sortedResults.map((result) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === result.candidateId,
    );

    return candidate.color;
  });

  chart.clear();

  chart.setOption({
    ...chartTheme,

    grid: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 180,

      containLabel: true,
    },

    xAxis: {
      type: "value",

      max: 100,

      axisLabel: {
        formatter: "{value}%",

        color: "#94a3b8",

        fontSize: 14,
      },
    },

    yAxis: {
      type: "category",

      data: categories,

      inverse: true,

      axisLabel: {
        color: "#f8fafc",

        fontSize: 22,

        fontWeight: 700,
      },
    },

    series: [
      {
        type: "bar",

        data: values,

        barWidth: 42,

        itemStyle: {
          borderRadius: [0, 8, 8, 0],

          color: (params) => colors[params.dataIndex],
        },

        label: {
          show: true,

          position: "right",

          formatter: "{c}%",

          color: "#f8fafc",

          fontSize: 18,

          fontWeight: 700,
        },
      },
    ],
  });
}
