# Prototype version review checklist

## Audit summary

The latest verification shows that the v8 family is now clean after the safe, obvious stale-link fixes. The remaining audit risk is concentrated in the older active private-beta versions, especially v7-2 through v8-0.

| Version | Stale cross-version links found | Status |
| --- | ---: | --- |
| v6 | 0 | Clean |
| v7 | 0 | Clean |
| v7-1 | 2 | Needs follow-up |
| v7-2 | 25 | Needs follow-up |
| v7-3 | 34 | Needs follow-up |
| v7-4 | 54 | Needs follow-up |
| v8-0 | 59 | Needs follow-up |
| v8-1 | 0 | Clean and verified |
| v8-3 | 0 | Clean and verified |
| v8-4 | 0 | Clean and verified |

> Note: these counts come from a route-and-template audit that looks for hard-coded versioned links under /FSM/Private_beta/. They are a useful review signal, but they still need human judgement where compatibility aliases were intentionally kept.

## Safe fixes already made

The following issues were corrected where the destination page clearly existed in the same version:

- v7-2 appeal flow redirects were updated to point to v7-2 pages.
- v7-3 appeal flow redirects were updated to point to v7-3 pages.
- v8-0 batch-check redirects were corrected away from v7-1 to v8-0 pages.
- v8-4 batch-check redirects were corrected away from v7-1 to v8-4 pages.
- The remaining v8-1, v8-3 and v8-4 version-drift issues were fixed and re-audited to zero stale results.

These changes were intentionally narrow and limited to obvious stale target mismatches.

## Remaining problem patterns

1. Repeated v7-era links in the older private-beta versions, especially v7-2 to v8-0.
2. Legacy redirect strings still embedded in earlier route and template files.
3. Some route handlers still reference earlier versions for compatibility fallbacks, which may be intentional but should be checked manually.
4. The v8 family is now clean; the remaining high-value work is in v7-2, v7-3, v7-4 and v8-0.

## Manual review checklist by version

### v6
- [ ] Confirm no links target a newer private-beta version unexpectedly.
- [ ] Check all routes still resolve to pages that exist in this version.

### v7
- [ ] Confirm v7 landing routes still resolve to v7 content.
- [ ] Validate no hard-coded redirect points to v6 or v7-1.

### v7-1
- [ ] Inspect the outcome page and batch-check success page for stale v6/v7 links.
- [ ] Check for any hard-coded references to earlier versions under school or family journey pages.
- [ ] Confirm whether any compatibility redirects are intentional.

### v7-2
- [ ] Review batch-check route files for mixed v7-1 and v7-2 targets.
- [ ] Audit LA batch-check and checker templates for same-version links.
- [ ] Verify compatibility aliases are only kept where they were intentionally left for testing.

### v7-3
- [ ] Check the one broken path in the appeal/account flow and confirm whether it is a missing template or a stale redirect.
- [ ] Review all LA batch-check and school-manage URLs for version drift.
- [ ] Confirm whether any remaining v7-1 references are intentional fallback links.

### v7-4
- [ ] Audit all batch-check, history and decision pages for v7-1/v7-3 drift.
- [ ] Verify that dashboard and manual pages point to the correct versioned route.
- [ ] Review any email links that still refer to earlier versions.

### v8-0
- [ ] Review remaining stale links in the older route files and templates.
- [ ] Check whether compatibility fallbacks are still required or should be removed.
- [ ] Revalidate all LA batch-check and decision pages resolve to actual v8-0 content.
- [ ] Recheck the LA recheck pages: update the v8-0 pagination include in recheck copy and recheck-refined.
- [ ] Recheck any v8-0 search pages that still reference older include files, especially Welsh LA and legacy school search variants.
- [ ] Review the remaining v8-0 route and template copies for archived/research files that should be categorised as manual-only follow-up instead of live flow issues.

### v8-1
- [x] Completed: cleaned and re-audited to zero stale cross-version links.
- [ ] Keep as a checked reference for the pattern used in the v8 cleanup pass.

### v8-3
- [x] Completed: cleaned and re-audited to zero stale cross-version links.
- [ ] Keep as a checked reference for the pattern used in the v8 cleanup pass.

### v8-4
- [x] Completed: cleaned and re-audited to zero stale cross-version links.
- [ ] Keep as a checked reference for the pattern used in the v8 cleanup pass.

## Recommended next actions

1. Review the remaining stale files in v7-2, v7-3, v7-4 and v8-0 first, since those versions still show blocked copy-and-paste drift.
2. Remove or update any leftover v7-1/v7-3 URLs where the same-version page exists.
3. Keep compatibility redirects only when they are explicitly required for an older working path.
4. Re-run the same audit after each pass to confirm the count drops and no new stale links appear.
5. Treat v8-1, v8-3 and v8-4 as the verified clean baseline for future version checks.

## Files deliberately left unchanged

These were not changed because the target intention was unclear or the file appeared to be a deliberate compatibility alias rather than a true broken link:

- Legacy compatibility redirects in route files that still delegate to older versions for fallback flows.
- Some template paths deliberately retained for support or archival pages where a direct same-version equivalent was not clearly evidenced.

These should be checked manually before any final cleanup pass.
