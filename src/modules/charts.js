import { surveyData } from "../data/dashboard-survey-data.js";
import { state } from "./state.js";
import { renderChart } from "./charts/chartEngine.js";

export function renderCharts() {
  const question = surveyData.questions.find(
    (q) => q.id === state.activeQuestionId,
  );

  document.getElementById("chart-title").textContent = question.title;

  renderChart(question);
}
