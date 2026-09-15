# Clarify fragility, improve mobile branding, and polish project documentation

## What will change
- Keep the fragility indicator because it is a useful warning about recommendation stability, but make its meaning explicit at the point of use.
- Add a concise explanation showing that **High** means the current recommendation can change easily because of a hard-constraint veto, a low scenario win rate, a narrow expected-value gap, or a near-balanced robustness score. Include the current reason(s), so the label is actionable rather than vague.
- Adjust the mobile header so **Decision Intelligence Suite** is not clipped. Use **DIS** as the compact mobile label only where space is genuinely constrained, while retaining the full product name in accessible text and at larger widths.
- Add a GitHub icon link beside LinkedIn in the creator area, pointing to the supplied repository.
- Rewrite the README around the actual product: purpose, decision model, fragility definition, features, local setup, scripts, architecture, data handling, and project links.

## Technical details
- Preserve the existing fragility thresholds and calculation; expose the contributing reason(s) from the same calculation to prevent documentation and UI drift.
- Use an accessible disclosure/tooltip with keyboard support and clear labels for the fragility explanation.
- Verify the updated header and creator links at the current mobile viewport and on desktop, then check the latest build diagnostics.
