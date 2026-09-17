# Fix failing SEO findings

## Summary
Resolve the three recorded SEO failures while keeping the decision tool's calculations and interactions unchanged.

## Changes
- Add a single visible `h1` for “Decision Intelligence Suite” in the existing header.
- Give icon-only remove buttons explicit accessible names.
- Convert key section labels into meaningful `h2` headings while retaining their current visual styling.
- Add the homepage canonical URL and `og:url` to its existing page metadata.
- Add a router-derived `/sitemap.xml` containing the public homepage, without artificial `lastmod` dates.
- Reference the sitemap from the existing `robots.txt` without changing its crawler permissions.
- Connect Google Search Console, add its verification tag to the server-rendered page head, publish the changes, verify the live property, and submit the sitemap.
- Mark each fully resolved SEO finding as fixed so the next scan can confirm it.

## Technical details
- The sitemap will use TanStack route metadata so future public routes require an explicit include/exclude decision.
- Root and sitemap routes will be excluded from their own inventory; `/` will be included.
- Google Search Console will use the exact published URL `https://disuite.lovable.app/` and META verification.
- The app's decision logic and data will not change.

## Validation
- Check heading hierarchy and accessible button names in the rendered page.
- Confirm `/sitemap.xml` returns valid XML containing `https://disuite.lovable.app/`.
- Confirm `robots.txt` references the live sitemap.
- Confirm the live verification tag after publishing, then verify the Search Console property and submit the sitemap.
