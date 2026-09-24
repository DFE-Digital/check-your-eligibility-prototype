# FSM v8-4 School User Journey Documentation

**Version:** v8-4  
**User Type:** School  
**Source Baseline:** v8-3  
**Scope:** School journey only; intentionally not derived from v8-2

---

## Journey Overview

This v8-4 school iteration is a separate Schools transfer-pupils update built from the v8-3 school flow, without using any v8-2 content or assumptions.

The journey supports school users to:
1. Start a check for one parent or guardian
2. Run a batch check for multiple families
3. Review and finalise applications
4. Search and manage records
5. Access guidance and download an offline form

**Entry point:** [School dashboard](../../app/views/FSM/Private_beta/v8-4/school/dashboard.html)  
**Main route prefix:** `/FSM/Private_beta/v8-4/school/`

---

## Journey 1: Run a check for one parent or guardian

### Overview
School users can complete a single soft check by entering a parent or guardian’s details and reviewing the outcome before continuing with the school’s eligibility workflow.

### Pages
1. **School dashboard** - Entry point to the school service and the main landing page for school actions.
2. **Run a check** - User enters the parent or guardian details and submits the school soft-check form.
3. **Checking loader** - Short loading page while the eligibility result is processed.
4. **Eligibility outcome** - Shows the school’s result for the submitted check, including any next step or evidence guidance.
5. **Return to dashboard** - User exits the check flow and returns to other school management tasks.

### Branching and exits
- **Run a check**: Submits to the school soft-check route and redirects to the appropriate result or error state.
- **Eligibility outcome**: Offers next actions such as returning to the dashboard or moving to related review and decision tasks.

---

## Journey 2: Run a batch check

### Overview
School users can run a batch check for multiple families and then review the submitted results before creating or finalising applications.

### Pages
1. **School dashboard** - Entry to the batch-check journey.
2. **Batch check upload form** - User selects the batch file and submits it for processing.
3. **Submitted / in progress** - A status page while the school’s batch is being processed.
4. **Batch completion summary** - Displays the number of processed, eligible, not eligible, and error records.
5. **Confirmation or next-step screen** - Confirms the batch result and directs the user onward.

### Branching and exits
- **Batch check upload form**: Allows users to continue with a batch, review previous batches, or return to the dashboard.
- **Completion summary**: Leads users to record review, report viewing, or the next necessary school action.

---

## Journey 3: Review and finalise applications

### Overview
The school flow includes review, evidence, and decision pages for applications that require approval or follow-up. This supports school case management and finalisation tasks.

### Pages
1. **School dashboard** - Entry point to decision-making tasks.
2. **Review applications** - View records pending a decision or needing evidence.
3. **Evidence or needs-review screens** - Present the application and any missing evidence or review points.
4. **Decision outcome** - Approve, decline, or request more information depending on the record.
5. **Search records / archive** - Lets the school find and manage historical records.

### Branching and exits
- **Review screens**: Branch to approved, declined, or pending states based on the case.
- **Archive and search pages**: Allow the user to return to management tasks or continue a different workflow.

---

## School files in this version

The school-specific version scaffold is copied from v8-3 and stored at:
- [app/routes/fsm/private_beta/v8-4](../../app/routes/fsm/private_beta/v8-4)
- [app/views/FSM/Private_beta/v8-4/school](../../app/views/FSM/Private_beta/v8-4/school)
- [app/views/layouts/FSM/v8-4](../../app/views/layouts/FSM/v8-4)

### Route files to review for school-specific edits
- [app/routes/fsm/private_beta/v8-4/softcheck.js](../../app/routes/fsm/private_beta/v8-4/softcheck.js)
- [app/routes/fsm/private_beta/v8-4/appeal-decision.js](../../app/routes/fsm/private_beta/v8-4/appeal-decision.js)
- [app/routes/fsm/private_beta/v8-4/appeal-decision-expansion-school.js](../../app/routes/fsm/private_beta/v8-4/appeal-decision-expansion-school.js)
- [app/routes/fsm/private_beta/v8-4/account.js](../../app/routes/fsm/private_beta/v8-4/account.js)
- [app/routes/fsm/private_beta/v8-4/batch-check.js](../../app/routes/fsm/private_beta/v8-4/batch-check.js)

### View files to review for school-specific edits
- [app/views/FSM/Private_beta/v8-4/school/dashboard.html](../../app/views/FSM/Private_beta/v8-4/school/dashboard.html)
- [app/views/FSM/Private_beta/v8-4/school/guidance.html](../../app/views/FSM/Private_beta/v8-4/school/guidance.html)
- [app/views/FSM/Private_beta/v8-4/school/school-manage/school-soft-check/checker.html](../../app/views/FSM/Private_beta/v8-4/school/school-manage/school-soft-check/checker.html)
- [app/views/FSM/Private_beta/v8-4/school/school-manage/batch-checking/june-launch/manual.html](../../app/views/FSM/Private_beta/v8-4/school/school-manage/batch-checking/june-launch/manual.html)
- [app/views/FSM/Private_beta/v8-4/school/school-manage/report/search.html](../../app/views/FSM/Private_beta/v8-4/school/school-manage/report/search.html)
- [app/views/FSM/Private_beta/v8-4/school/school-manage/decision/review/needs-review/pending_44455453.html](../../app/views/FSM/Private_beta/v8-4/school/school-manage/decision/review/needs-review/pending_44455453.html)

### Layouts and include assets for school-specific updates
- [app/views/layouts/FSM/v8-4/layout-dfe-schoolnav.html](../../app/views/layouts/FSM/v8-4/layout-dfe-schoolnav.html)
- [app/views/_includes/school/v8-4/school-table-rows.html](../../app/views/_includes/school/v8-4/school-table-rows.html)
- [app/views/_includes/school/v8-4/filter-panel-school-exp.html](../../app/views/_includes/school/v8-4/filter-panel-school-exp.html)

---

## Notes

- This version is intentionally created from the v8-3 school baseline only.
- No v8-2 content or references were used in the new scaffold.
- The next step is to adapt the school journey screens and route logic to reflect the Schools transfer-pupils iteration for v8-4.
