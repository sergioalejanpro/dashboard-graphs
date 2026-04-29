import { surveyData } from "../data/dashboard-survey-data.js";
import { state } from "./state.js";

export function renderKpis() {
  const container = document.getElementById("kpi-bar");

  const question = surveyData.questions.find(
    (q) => q.id === state.activeQuestionId,
  );

  container.innerHTML = "";

  if (!question) {
    return;
  }

  if (question.type === "label-only") {
    renderLabelKpis(container, question);
    return;
  }

  if (question.type !== "grouped-bar") {
    return;
  }

  renderGroupedBarKpis(container, question);
}

function renderGroupedBarKpis(container, question) {
  question.results.forEach((candidateResult) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === candidateResult.candidateId,
    );

    const topAnswer = [...candidateResult.values].sort(
      (a, b) => b.percentage - a.percentage,
    )[0];

    const card = document.createElement("article");

    card.className = "kpi-card";

    card.style.setProperty("--candidate-color", candidate.color);

    card.innerHTML = `
      <div class="kpi-name">
        ${candidate.name}
      </div>

      <div class="kpi-value">
        ${topAnswer.answer}: 
        ${topAnswer.percentage}%
      </div>
    `;

    container.appendChild(card);
  });
}

function renderLabelKpis(container, question) {
  question.results.forEach((result) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === result.candidateId,
    );

    const card = document.createElement("article");

    card.className = "kpi-card";

    card.style.setProperty("--candidate-color", candidate.color);

    card.innerHTML = `
      <div class="kpi-name">
        ${candidate.name}
      </div>

      <div class="kpi-value">
        ${result.label}
      </div>
    `;

    container.appendChild(card);
  });
}
