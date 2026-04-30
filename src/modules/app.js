import { renderSidebar } from "../modules/sidebar.js";
import { renderKpis } from "../modules/kpi.js";
import { renderCharts } from "../modules/charts.js";
import { initSidebarToggle } from "../modules/sidebar.js";

initSidebarToggle();

renderSidebar();
renderKpis();
renderCharts();
