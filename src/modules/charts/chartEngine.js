import { renderGroupedBarChart } from "./groupedBarChart.js";

import { renderLabelCards } from "./labelCards.js";

let chartInstance = null;

window.addEventListener("resize", () => {
  chartInstance?.resize();
});

export function renderChart(question) {
  const container = document.getElementById("main-chart");

  if (question.type === "label-only") {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }

    container.innerHTML = "";

    renderLabelCards(container, question);

    return;
  }

  if (!chartInstance) {
    container.innerHTML = "";

    chartInstance = echarts.init(container);
  }

  renderGroupedBarChart(chartInstance, question);
}
