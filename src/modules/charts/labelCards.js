import { surveyData } from "../../data/dashboard-survey-data.js";

export function renderLabelCards(container, question) {
  container.innerHTML = `
    <div class="label-cards"></div>
  `;

  const cards = container.querySelector(".label-cards");

  question.results.forEach((result) => {
    const candidate = surveyData.candidates.find(
      (c) => c.id === result.candidateId,
    );

    const card = document.createElement("div");

    card.className = "label-card";

    card.style.setProperty("--candidate-color", candidate.color);

    card.innerHTML = `
      <div class="label-card-name">
        ${candidate.name}
      </div>

      <div class="label-card-value">
        ${result.label}
      </div>
    `;

    cards.appendChild(card);
  });
}
