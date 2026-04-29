import { surveyData } from "../data.js";
import { state } from "../state.js";

export function renderKpis() {
  const container = document.getElementById("kpi-bar");

  const question = surveyData.questions.find(
    (q) => q.id === state.activeQuestionId,
  );

  const topAnswer = candidateResult.values.sort(
    (a, b) => b.percentage - a.percentage,
  )[0];

  container.innerHTML = "";

  if (question.type !== "grouped-bar") {
    return;
  }

  question.results.forEach((candidateResult) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === candidateResult.candidateId,
    );

    const total = candidateResult.values.reduce(
      (acc, item) => acc + item.percentage,
      0,
    );

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
