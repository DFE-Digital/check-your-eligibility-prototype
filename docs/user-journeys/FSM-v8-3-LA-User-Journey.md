# FSM v8-3 LA User Journey Documentation

**Version:** v8-3  
**User Type:** Local Authority (LA)  
**Source Baseline:** v8-1  
**Scope:** LA journey only; intentionally not derived from v8-2

---

## Journey Overview

This v8-3 Local Authority iteration is a separate enhancement based on the v8-1 LA journey, shaped around local authority research findings and the need to keep the LA route independent from v8-2 changes.

The journey supports LA users to:
1. Run eligibility checks for individual parents or guardians
2. Run batch checks for multiple records
3. Review applications and decide outcomes
4. Search and manage records
5. Access guidance and policy information

**Entry point:** [LA Dashboard](../../app/views/FSM/Private_beta/v8-3/LA/dashboard.html)  
**Main route prefix:** `/FSM/Private_beta/v8-3/LA/`

---

## Journey 1: Run a check for one parent or guardian

### Overview
LA users can perform a single soft check by entering a parent or guardian’s details and a National Insurance number. The route runs the check and sends the user to a result page based on the outcome.

### Pages
1. **LA Dashboard** - Entry point for the check journey from the main LA home screen.
2. **Run a check form** - User enters parent details and NI number in the LA soft-check form.
3. **Checking loader** - A brief loading page shown while the eligibility check is processed.
4. **Eligibility outcome** - Displays targeted, expanded, or not eligible result depending on the check logic.
5. **Return to dashboard** - User can leave the check flow and start a new review or manage record tasks.

### Branching and exits
- **Run a check form**: Submits to `/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/run-check` and redirects based on result.
- **Eligibility outcome**: Displays the final status for targeted, expanded, or not eligible cases; users can return to the dashboard or continue to related management tasks.

---

## Journey 2: Run a batch check

### Overview
LA users can upload a CSV file for bulk eligibility checks and then review the submitted results before creating applications from eligible records.

### Pages
1. **LA Dashboard** - Entry to the batch-check journey.
2. **Batch check upload form** - User downloads the template, selects a file, and submits it.
3. **Submitted/in progress page** - Shows a batch is processing.
4. **Completed batch summary** - Displays counts for eligible, not eligible, and error cases.
5. **Create applications step** - Confirms creation of applications from eligible batch results.
6. **Confirmation screen** - Confirms batch outcome and next action.

### Branching and exits
- **Batch check upload form**: Allows a user to download the CSV template, view history, or upload a new file.
- **Completed batch summary**: Options include viewing results or creating applications.
- **Confirmation screen**: Users can proceed to record management or return to the dashboard.

---

## Journey 3: Review and manage applications

### Overview
The LA journey includes decision and review screens for records that may require manual approval or review. This supports the case-management side of the service.

### Pages
1. **Pending reviews / decision list** - Shows records requiring a decision.
2. **Review detail screen** - Presents the application and the relevant decision options.
3. **Approval or decline outcome** - Final state for the application.
4. **Archive / search records** - Allows users to locate and manage historical or current records.

### Branching and exits
- **Review detail screen**: Branches to approve, decline, or request more information depending on the case.
- **Search and archive pages**: Allow the user to return to management tasks, search records, or leave the decision flow.

---

## Key LA files in this version

The LA-specific version scaffold is copied from v8-1 and stored at:
- [app/routes/fsm/private_beta/v8-3](../../app/routes/fsm/private_beta/v8-3)
- [app/views/FSM/Private_beta/v8-3/LA](../../app/views/FSM/Private_beta/v8-3/LA)

### Route files to review for LA-specific edits
- [app/routes/fsm/private_beta/v8-3/softcheck.js](../../app/routes/fsm/private_beta/v8-3/softcheck.js)
- [app/routes/fsm/private_beta/v8-3/batch-check.js](../../app/routes/fsm/private_beta/v8-3/batch-check.js)
- [app/routes/fsm/private_beta/v8-3/appeal-decision.js](../../app/routes/fsm/private_beta/v8-3/appeal-decision.js)
- [app/routes/fsm/private_beta/v8-3/appeal-decision-expansion.js](../../app/routes/fsm/private_beta/v8-3/appeal-decision-expansion.js)
- [app/routes/fsm/private_beta/v8-3/appeal-decision-expansion-school.js](../../app/routes/fsm/private_beta/v8-3/appeal-decision-expansion-school.js)
- [app/routes/fsm/private_beta/v8-3/account.js](../../app/routes/fsm/private_beta/v8-3/account.js)

### View files to review for LA-specific edits
- [app/views/FSM/Private_beta/v8-3/LA/dashboard.html](../../app/views/FSM/Private_beta/v8-3/LA/dashboard.html)
- [app/views/FSM/Private_beta/v8-3/LA/guidance.html](../../app/views/FSM/Private_beta/v8-3/LA/guidance.html)
- [app/views/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/checker.html](../../app/views/FSM/Private_beta/v8-3/LA/la-manage/la-soft-check/checker.html)
- [app/views/FSM/Private_beta/v8-3/LA/la-manage/batch-checking/manual-no-ctf.html](../../app/views/FSM/Private_beta/v8-3/LA/la-manage/batch-checking/manual-no-ctf.html)
- [app/views/FSM/Private_beta/v8-3/LA/la-manage/report/search.html](../../app/views/FSM/Private_beta/v8-3/LA/la-manage/report/search.html)

---

## Notes

- This version is intentionally created from the v8-1 LA baseline only.
- No v8-2 content or references were used in the new scaffold.
- The next step is to adapt the LA journey screens and route logic to reflect the separate LA research findings for v8-3.
