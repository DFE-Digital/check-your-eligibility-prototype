# FSM v7 Local Authority User Journey Documentation

**Version:** v7  
**User Type:** Local Authority  
**Journey:** LA individual check  
**Scope:** Historical snapshot based on the files present under `app/views/FSM/Private_beta/v7` and `app/routes/fsm/private_beta/v7`.  
**Documentation standard:** based on the newer v8 user-journey documents but read against the actual historical route structure for this version.

---

## Journey Overview

This version represents a historical snapshot of the prototype. The flow, wording, navigation, and decision logic should be read from the files for this version only rather than assumed to match the latest design.

**Entry point:** /FSM/Private_beta/v7/LA/dashboard.html  
**Main route prefix:** `/v7`

---

## Journey 1: Start the service and complete the main check

### Journey steps

| Step | Screen/Page | Route | Key user action | Next screen | Decision/condition |
|---|---|---|---|---|---|
| 1 | Landing page | /FSM/Private_beta/v7/LA/dashboard.html | User starts from the service home or dashboard | /FSM/Private_beta/v7/LA/la-manage/la-soft-check/checker.html | Entry point |
| 2 | Main check form | /FSM/Private_beta/v7/LA/la-manage/la-soft-check/checker.html | Enter parent or guardian details and choose the relevant option | Validation or loader | Submit form |
| 3 | Alternative branch or NASS guidance | /FSM/Private_beta/v7/LA/la-manage/la-soft-check/nass-number.html | User chooses an asylum-seeker, NASS, or alternate support route | Follow-up page or result | Branch condition |
| 4 | Outcome or follow-up result | /FSM/Private_beta/v7/LA/la-manage/la-soft-check/outcomes/check-result.html | Review the outcome, eligibility status, or request for more evidence | Return path | Result branch |
| 5 | Exit | /FSM/Private_beta/v7/LA/dashboard.html | Return to dashboard or another management area | Dashboard | End of flow |

### Main branching decisions
- The user may take the standard NI route or the alternate support route depending on the version’s question set.
- Some historical versions include guidance or a supporting-evidence path instead of a fully merged automated result flow.
- A later version must not be used to infer that an earlier branch existed unless the files for that earlier version explicitly show it.

### Validation and error paths
- Validation is handled in the relevant page and route logic for the version.
- When an answer cannot be resolved automatically, the flow redirects to a more-info or offline guidance state rather than continuing in the main check branch.
- Asylum-support and NPRF paths are historically variable and should be read as part of the version’s actual route structure.

### Outcome / end state
- The end state is a result page, a request for more information, or a return to the dashboard.
- Historical variations include both automated status screens and guidance-led routes depending on the version snapshot.

---

## Journey 2: Record review or management follow-up

Where the version includes a review, appeal, or management journey, that flow sits after the main check page and allows a user to inspect, confirm, or decide on an application or record.

### Typical steps
1. Open dashboard or records area.
2. Review one record or application.
3. Check evidence or status.
4. Choose an action such as approve, decline, or request more information.
5. Complete the action and return to management screens.

### Historical note
This flow varies by version and may be more fully formed in later versions. The exact review steps in earlier snapshots should be read directly from the version’s templates and routes rather than copied from newer designs.

---

## Dependencies and route evidence

The route logic and screens for this version are stored under:
- `app/routes/fsm/private_beta/v7`
- `app/views/FSM/Private_beta/v7`

The docs in this folder provide the historical summary, while the route files remain the source of truth.
