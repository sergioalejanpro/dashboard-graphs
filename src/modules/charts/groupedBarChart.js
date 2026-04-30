import { chartTheme } from "./chartTheme.js";
import { surveyData } from "../../data/dashboard-survey-data.js";

export function renderGroupedBarChart(chart, question) {
  const categories = question.answers;

  const series = question.results.map((result) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === result.candidateId,
    );

    return {
      name: candidate.name,

      type: "bar",

      itemStyle: {
        color: candidate.color,
      },

      data: result.values.map((v) => v.percentage),
    };
  });

  chart.clear();

  chart.setOption({
    ...chartTheme,

    legend: {
      top: 0,

      textStyle: {
        color: "#94a3b8",
      },
    },

    xAxis: {
      type: "category",

      data: categories,

      axisLabel: {
        color: "#f8fafc",

        fontSize: 24,

        fontWeight: 700,

        margin: 18,
      },
    },

    yAxis: {
      type: "value",

      max: 100,

      axisLabel: {
        formatter: "{value}%",

        color: "#94a3b8",
      },
    },

    series,
  });
}
