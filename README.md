# Decision Intelligence Suite (DIS)

A browser-based decision support workspace for comparing strategic options under uncertainty. DIS combines scenario economics, hard constraints, qualitative evidence, and risk posture to show not only which option leads financially, but how robust that recommendation is.

**Live app:** [decision-intelligence-suite.lovable.app](https://decision-intelligence-suite.lovable.app)

## What the suite does

- **Situation Board** - summarizes the financial optimum, robustness-adjusted recommendation, scenario win rate, and decision fragility.
- **Scenario Log** - captures scenario probabilities, triggers, and value outcomes for each option.
- **Field Intelligence** - separates hard constraints, soft preferences, and contextual evidence so each affects the recommendation appropriately.
- **Tripwires** - exposes downside thresholds and allocation breakpoints that can change the decision.
- **Command Settings** - adjusts risk posture, strategic weighting, constraints, and option details.
- **Field Manual** - explains the model and its intended interpretation.
- **Portable workspace** - saves state locally and supports JSON import/export for scenario sharing and recovery.

## How the decision model works

DIS first computes expected value, scenario win rate, worst case, and maximum regret for each option. It then blends expected-value preference with worst-case preference according to the selected risk posture. Soft factors can adjust that position; active hard constraints can disqualify an option outright. Contextual factors remain visible for human judgment but do not enter the score.

The result is a **robustness-adjusted position**, not an automated decision. The suite makes assumptions and trade-offs inspectable so decision-makers can challenge them before committing.

### Fragility

Fragility indicates how easily the current recommendation could change when assumptions move. It is not a general measure of business risk.

- **High** - the financial leader is disqualified, wins fewer than 55% of weighted scenarios, has an expected-value advantage below 5%, or the robustness position sits within 5 points of neutral.
- **Medium** - no high-fragility trigger applies, but the leader wins fewer than 70% of weighted scenarios, its expected-value advantage is below 15%, or the robustness position is within 15 points of neutral.
- **Low** - the leader clears all three stability tests and is not blocked by a hard constraint.

The indicator is useful as a review signal: high fragility means the recommendation deserves additional stress-testing, better evidence, or tighter tripwires before commitment.

## Getting started

### Requirements

- Node.js 20 or later
- Bun 1.1 or later

### Local development

```bash
git clone https://github.com/Shubham-Gambhire/decision-intelligence-suite.git
cd decision-intelligence-suite
bun install
bun run dev
```

### Available scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the local development server |
| `bun run build` | Create a production build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run the code quality checks |
| `bun run format` | Format the project files |

## Technology

- React 19
- TanStack Start and TanStack Router
- TypeScript and JavaScript
- Tailwind CSS 4
- Vite

## Data and privacy

Decision data is stored in the browser's local storage. It is not sent to an application database. Clearing browser data removes saved workspace state unless it has first been exported as JSON.

## Project resources

- [Product Development Report](src/assets/report.pdf.asset.json)
- [GitHub repository](https://github.com/Shubham-Gambhire/decision-intelligence-suite)

## Author

Built by [Shubham Gambhire](https://www.linkedin.com/in/shubhambg).