import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - ported JSX module without type declarations
import DecisionSuite from "@/components/DecisionSuite.jsx";
import report from "@/assets/report.docx.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Decision Intelligence Suite — Thistlewood Foods" },
      {
        name: "description",
        content:
          "A structured decision intelligence suite: scenario modelling, field intel, tripwires and robustness-adjusted recommendations.",
      },
      { property: "og:title", content: "Decision Intelligence Suite — Thistlewood Foods" },
      {
        property: "og:description",
        content:
          "Scenario modelling, constraints and robustness scoring for high-stakes allocation decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <DecisionSuite />
      <div className="credit-bar">
        <span className="credit-text">Built by Shubham Gambhire</span>
        <a
          className="credit-link"
          href="https://www.linkedin.com/in/shubhambg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96C21.4 8.75 22 11.02 22 14.2V21h-4v-6.03c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.19V21h-4V9Z" />
          </svg>
          LinkedIn
        </a>
        <a className="credit-link" href={report.url} download>
          Product Development Report (DOCX)
        </a>
      </div>
    </>
  );
}
