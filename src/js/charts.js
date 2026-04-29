import { surveyData } from "../data.js";
import { state } from "../state.js";

export function renderChartPlaceholder() {
  const question = surveyData.questions.find(
    (q) => q.id === state.activeQuestionId,
  );

  document.getElementById("chart-title").textContent = question.title;

  document.getElementById("main-chart").innerHTML = `
    <div class="chart-placeholder">
      Chart renderer próximamente
    </div>
  `;
}
