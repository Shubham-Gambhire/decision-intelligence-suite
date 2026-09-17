# Refine the suite into a restrained Research Brief UI

## What will change
- Preserve the recommendation-first workflow, light analytical canvas, side-by-side option comparison, and all existing calculations and interactions.
- Reserve bracket corners for the primary recommendation and fragility status. Convert supporting sections, scenario rows, settings, methodology, and factor panels to quiet hairline containers.
- Establish a consistent type system: serif only for the primary recommendation, sans-serif for labels and explanations, and tabular monospace for data.
- Elevate the Position Line into the main decision visual with a clearer continuum, labels, ticks, and distinct financial-optimum and robustness-adjusted markers.
- Give the recommended option a subtle accent tint and stronger border while keeping the alternative neutral.
- Standardize spacing to an 8px rhythm, with 24px section padding and 16px stacked gaps where space allows.
- Restyle form fields with a subtle filled surface, consistent height, and accent focus treatment.
- Reduce the palette to the brand accent plus a red alert color; neutralize former green and amber treatments without changing their meaning or behavior.
- Retain the mobile scrolling tabs and improve the existing continuation cue without changing navigation.

## Technical details
- Add presentation variants to the existing frame component instead of changing data flow or calculations.
- Consolidate visual roles into the existing color constants and shared field/style helpers.
- Keep every input, button, tab, export/import control, threshold, and recommendation rule intact.
- Verify Overview, Scenario Log, Qualitative Factors, Tripwires, Settings, and Methodology on desktop and mobile, then check build and runtime diagnostics.
