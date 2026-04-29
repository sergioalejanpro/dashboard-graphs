import { surveyData } from "../data.js";
import { state, setActiveQuestion } from "../state.js";
import { renderKpis } from "./kpi.js";
import { renderChartPlaceholder } from "./charts.js";

export function renderSidebar() {
  const container = document.getElementById("questions-list");

  container.innerHTML = "";

  surveyData.questions.forEach((question) => {
    const item = document.createElement("button");

    item.className = "question-item";

    if (question.id === state.activeQuestionId) {
      item.classList.add("active");
    }

    item.innerHTML = `
      <div class="question-number">
        ${question.number}
      </div>

      <div class="question-title">
        ${question.title}
      </div>
    `;

    item.addEventListener("click", () => {
      setActiveQuestion(question.id);

      renderSidebar();
      renderKpis();
      renderChartPlaceholder();
    });

    container.appendChild(item);
  });
}
