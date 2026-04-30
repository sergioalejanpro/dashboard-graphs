import { surveyData } from "../data/dashboard-survey-data.js";
import { state, setActiveQuestion } from "./state.js";
import { renderKpis } from "./kpi.js";
import { renderCharts } from "./charts.js";

const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("sidebar-overlay");
const toggleBtn = document.getElementById("menu-toggle");

function isMobile() {
  return window.innerWidth <= 768;
}

export function initSidebarToggle() {
  toggleBtn.addEventListener("click", () => {
    if (!isMobile()) return;

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  });

  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    });
  }
}

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

      if (isMobile()) {
        closeSidebar();
      }

      renderSidebar();
      renderKpis();
      renderCharts();
    });

    container.appendChild(item);
  });
}

function toggleSidebar() {
  const isOpen = sidebar.classList.toggle("open");

  overlay.classList.toggle("open");

  document.body.style.overflow = isOpen ? "hidden" : "auto";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  sidebar.classList.remove("open");
  overlay?.classList.remove("open");

  document.body.style.overflow = "";
}
