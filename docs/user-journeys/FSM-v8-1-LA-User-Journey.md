# FSM v8-1 LA User Journey Documentation

**Version:** v8-1  
**User Type:** Local Authority (LA)  
**Last Updated:** 22 July 2026  
**Scope:** Full LA journey - excludes LA_Basic variant and other user types

---

## Journey Overview

The Free School Meals (FSM) v8-1 LA (Local Authority) service enables LA administrators to:
1. Run eligibility checks for individual parents/guardians
2. Run batch checks for multiple records
3. Review applications with supporting evidence
4. Search and manage all pupil records
5. Access guidance on the service

**Entry Point:** [LA Dashboard](app/views/FSM/Private_beta/v8-1/LA/dashboard.html) - `/FSM/Private_beta/v8-1/LA/dashboard`

**Main Navigation Routes:** 
- Provided by [layout-dfe-lanav.html](app/views/layouts/FSM/v8-1/layout-dfe-lanav.html)
  - Run a check
  - Run batch check
  - Review applications
  - Search records
  - Guidance
  - Archived records

---

## Journey 1: Run a Check (Soft Check) for One Parent or Guardian

### Journey Overview
LA users can perform an individual eligibility check by entering parent/guardian details and a National Insurance number. The system performs a real-time lookup and returns an eligibility outcome.

### Journey Steps

| Step | Screen/Page | Route | User Action | Next Screen | Decision/Condition |
|------|-------------|-------|-------------|------------|-------------------|
| 1 | LA Dashboard | `/FSM/Private_beta/v8-1/LA/dashboard` | Click "Run a check for one parent or guardian" card | Run a check form | Entry point |
| 2 | Run a check form | `la-manage/la-soft-check/checker.html` | Enter parent details (first name, last name, email, DOB, National Insurance number) | Checking loader | Form submission via POST to `/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/run-check` |
| 3 | Checking loader (hidden) | `la-manage/la-soft-check/checking-la-loader.html` | Auto-redirect after 1.5 seconds | Check result screen | Automatic redirect via JavaScript |
| 4a | Check result - Eligible Targeted | `la-manage/la-soft-check/outcomes/check-result.html` or `eligible-targeted.html` | View eligibility confirmation | [Decision Point A] | Eligibility type = 'targeted' |
| 4b | Check result - Eligible Expanded | `la-manage/la-soft-check/outcomes/eligible-expanded.html` | View eligibility confirmation | [Decision Point A] | Eligibility type = 'expanded' |
| 4c | Check result - Not Eligible | `la-manage/la-soft-check/outcomes/outcome-not-eligible.html` | View outcome | [Decision Point A] | Eligibility type = 'notEligible' |
| 4d | Check result - Error | `la-manage/la-soft-check/outcomes/outcome-technical-error.html` | View error message | Dashboard (via back link) | Technical error or system issue |

### Decision Points

#### Decision Point A: Eligibility Outcome
From any eligible outcome screen, LA users can:
- **View more details** about eligibility period and next recheck date
- **Return to dashboard** via back link to start another check
- Outcomes show:
  - Status tag with color coding (purple=targeted, green=expanded, red=not eligible)
  - Eligibility message
  - End date (typically 31 August 2027 for eligible, 31 August 2026 for not eligible)
  - Recheck date (Summer term 2027 for eligible)

### Data Flow

**Input Data Captured:**
- Parent first name: `data["parent-firstname"]`
- Parent surname: `data["parent-surname"]`
- Email (optional): `data["email"]`
- Date of birth: `data["dob-day"]`, `data["dob-month"]`, `data["dob-year"]`
- National Insurance number: `data["nationalInsuranceNumber"]` (normalized to uppercase, spaces removed)

**Session Data Set by Route:**
- `data['eligibilityType']` - one of: 'targeted', 'expanded', 'notEligible'
- `data['policyLabel']` - display label for eligibility status
- `data['tagClass']` - CSS class for tag styling
- `data['eligibilityMessage']` - message text shown to user
- `data['endDate']` - eligibility end date
- `data['recheckDate']` - when to recheck eligibility

**Eligibility Lookup Logic** (from [softcheck.js](app/routes/fsm/private_beta/v8-1/softcheck.js)):
```
National Insurance Number → Eligibility Type
AB123456A → Eligible Targeted
CD123456C → Eligible Expanded
PN123456D → Not Eligible
(Any other value) → Not Eligible (default)
```

### User Actions
- **Run check button**: Form POST submission
- **Back link**: JavaScript `window.history.back()`
- **Asylum seeker link**: Opens guidance in new window (target="_blank")
  - Links to: `guidance/guidance-steps/asylum-check.html`

### Integration Points
- Real-time eligibility check via POST route handler
- Session data persistence
- No external API calls evident in prototype

### Error Handling
- **Technical errors**: Directed to error outcome page
- **Page reload handling**: Client-side JavaScript clears input fields on page reload to prevent duplicate submissions
- **Default outcome**: Returns "Not Eligible" if National Insurance number doesn't match known test cases

### Accessibility Notes
- Form includes accessible labels, hints, and aria-describedby attributes
- Input masks for National Insurance number format (QQ 12 34 56 C)
- Date input with day/month/year fields and hint text
- Spinner animation includes role="status" for screen readers

---

## Journey 2: Run a Batch Check

### Journey Overview
LA users can run eligibility checks for multiple parents/guardians at once by uploading a CSV file with standardized data. The system processes the file and creates applications for eligible children.

### Journey Steps

| Step | Screen/Page | Route | User Action | Next Screen | Decision/Condition |
|------|-------------|-------|-------------|------------|-------------------|
| 1 | LA Dashboard | `/FSM/Private_beta/v8-1/LA/dashboard` | Click "Run a batch check" card | Run batch check form | Entry point |
| 2 | Batch check form | `la-manage/batch-checking/june-launch/manual-no-ctf.html` | [Decision Point A] | [Based on selection] | User chooses upload or history |
| 2a | Batch check form | `la-manage/batch-checking/june-launch/manual-no-ctf.html` | Download CSV template from link `/public/csv/Batch-check-template.csv` | Template file | User prepares data |
| 2b | Batch check form | `la-manage/batch-checking/june-launch/manual-no-ctf.html` | Click "Batch checks history" button | Batch checks history | View previous uploads |
| 2c | Batch checks history | `batch-checking/june-launch/submitted-completed.html` | View submitted batch checks with status | History table | Shows: Filename, records count, submitted date, status, actions |
| 2d | Batch checks history | `batch-checking/june-launch/submitted-completed.html` | Click "View results" link | Batch results summary | Access completed check results |
| 2e | Batch checks history | `batch-checking/june-launch/submitted-completed.html` | Click "Create applications" link | Confirm applications | Create applications from results |
| 3 | Batch check form (upload) | `la-manage/batch-checking/june-launch/manual-no-ctf.html` | Select and upload CSV file via file input | [Unclear - awaiting file] | File selected |
| 4 | Upload button | `la-manage/batch-checking/june-launch/manual-no-ctf.html` | Click "Run a batch check" button | File submitted to unknown route | POST to random link from `submitted-completed` |
| 5 | File submitted confirmation | `batch-checking/june-launch/submitted-completed.html` | View success notification | Batch history table | File "Greenwoodprim25.xml" shows status "Checks completed" |
| 6 | Batch results summary | `batch-checking/june-launch/batchcheck-summary.html` (ref only) | View breakdown: Eligible targeted, Eligible expanded, Not eligible, Could not check, System error | [Decision Point B] | View results or create applications |
| 7 | Create applications | `batch-checking/june-launch/batch-confirm-eligible.html` | Confirm creation of applications from batch results | Success notification | Applications created (e.g., 310 applications) |
| 8 | Success notification | `batch-checking/june-launch/batch-confirm-eligible.html` | View summary and link to search records | Dashboard or Search records | Can proceed to manage new applications |

### Decision Points

#### Decision Point A: Batch Check Entry
From the batch check form, user can:
- **Download template**: Download CSV file with correct structure
- **View history**: Check previous batch uploads and their status
- **Upload new file**: Proceed with file upload flow

#### Decision Point B: Batch Results
From results summary, user can:
- **View detailed results**: Download all results as CSV
- **Create applications**: Generate applications from eligible results
- **Return to dashboard**: Go back via navigation

### Required CSV Template Fields
From [manual-no-ctf.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/june-launch/manual-no-ctf.html):
```
- Parent first name
- Parent last name
- Parent date of birth (format: DD/MM/YYYY or YYYY-MM-DD)
- Parent National Insurance number
- Child first name
- Child last name
- Child date of birth (format: DD/MM/YYYY or YYYY-MM-DD)
- URN of school child attends
```

### Validation Rules
- Maximum 5000 rows per file
- CSV file format only
- All fields must match template structure
- File size not specified in UI

### Data Flow

**Batch File Processing:**
- File uploaded to unknown handler (route not visible in prototype)
- System processes file asynchronously
- Status shown in history table: "In progress" → "Checks completed"
- Results include breakdown by eligibility type and error categories

**Application Creation:**
- 310 applications created in example (from [batch-confirm-eligible.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/june-launch/batch-confirm-eligible.html))
- Applications visible in [Search all records](app/views/FSM/Private_beta/v8-1/LA/la-manage/report/search.html)
- End date: 31 August 2027 (for created applications)

**Results Breakdown Categories:**
- Eligible targeted
- Eligible expanded
- Not eligible
- Could not check
- System error

### User Actions
- **Download link**: CSV template file download
- **History button**: Navigation to batch history
- **File upload input**: Click to select file
- **Run batch check button**: Form submission to process file
- **View results link**: Navigate to results page
- **Create applications link**: Confirm and create applications
- **Search records link**: Navigate to search page with new records

### Integration Points
- File upload handling (backend route not documented in visible code)
- Batch processing queue (status shows "In progress" → "Checks completed")
- Application generation system
- CSV template download from `/public/csv/`

### Error Handling
- **File validation errors**: Page [batch-error-data-issue.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/batch-error-data-issue.html) available but not linked in main flow
- **Technical errors**: Page [batch-checking-loader-technical-error.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/batch-checking-loader-technical-error.html) available
- **File format errors**: Page [imported-errors.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/imported-errors.html) available
- Error pages exist but trigger conditions are uncertain - **requires manual verification**

### Notes
- Batch check route handler not found in visible `/app/routes/` files for v8-1 - may use generic file upload handler
- Random link selection for upload button suggests multiple endpoints available
- File format shows .xml example but documentation says CSV - **uncertain - requires manual verification**

---

## Journey 3: Review Applications

### Journey Overview
LA users can review applications submitted by families for FSM eligibility. They can review evidence provided, make eligibility decisions (approve/decline/request more evidence), and manage pupil records.

### Journey Steps

| Step | Screen/Page | Route | User Action | Next Screen | Decision/Condition |
|------|-------------|-------|-------------|------------|-------------------|
| 1 | LA Dashboard | `/FSM/Private_beta/v8-1/LA/dashboard` | Click "Review applications" card | Applications list | Entry point - 29 applications to review |
| 2 | Review applications list | `la-manage/decision/review/applications.html` | View pending applications in table | [Decision Point A] | Shows applications requiring action |
| 2a | Review applications | `la-manage/decision/review/applications.html` | Use search box: Enter name, DOB, school, or National Insurance number | Filtered table | Search filters applications in real-time |
| 2b | Review applications | `la-manage/decision/review/applications.html` | Click on Reference number link (e.g., "44455453") | Manage record | Navigate to specific application |
| 3 | Manage pupil record | `la-manage/decision/review/needs-review/pending_44455453.html` | View application status, parent details, evidence, child details, and decision section | [Decision Point B] | Application status: "Ready for review" |
| 3a | Manage record - Actions | `la-manage/decision/review/needs-review/pending_44455453.html` | Click "Manage child record" button menu | Dropdown options | See actions: Export as CSV, Export as PDF, Archive record |
| 3b | Export record | `la-manage/decision/review/needs-review/pending_44455453.html` | Click "Export record as CSV" | CSV download | Export pupil record |
| 3c | Export record | `la-manage/decision/review/needs-review/pending_44455453.html` | Click "Export record as PDF" | PDF download | Export pupil record |
| 3d | Archive record | `la-manage/decision/review/needs-review/archive-44455453.html` | Navigate to archive confirmation page | Confirmation page | Uncertain - requires manual verification |
| 4 | Review record - Evidence | `la-manage/decision/review/needs-review/pending_44455453.html` | View "Evidence" section with files (e.g., file.001.jpg) | File view | View supporting evidence |
| 4a | View evidence | `la-manage/decision/review/needs-review/evidence/evidence.html` | Click on evidence file link | Evidence detail page | Opens evidence file details |
| 5 | Make decision | `la-manage/decision/review/needs-review/pending_44455453.html` | View "Decision" section | [Decision Point C] | Choose eligibility decision |
| 5a | Approve - Targeted | `la-manage/decision/review/needs-review/approved/targeted/approve-targeted-44455453.html` | Click "Approve - Targeted" button or link | Approval form | Approve for targeted free school meals |
| 5b | Approve - Expanded | `la-manage/decision/review/needs-review/approved/expanded/approve-expanded-44455453.html` | Click "Approve - Expanded" button or link | Approval form | Approve for expanded free school meals |
| 5c | Decline | `la-manage/decision/review/needs-review/declined/decline-44455453.html` | Click "Decline" button or link | Decline form | Decline eligibility |
| 5d | Request more evidence | `la-manage/decision/review/needs-review/request-more/requestmore-johnson1.html` | Click "Request more evidence" button or link | Request form | Request additional supporting evidence |
| 6 | Approval confirmation | `la-manage/decision/review/needs-review/approved/targeted/eligibility-confirmed.html` (or expanded) | View confirmation message with approval details | Dashboard/List | Confirmation page shown |
| 7 | Decline confirmation | `la-manage/decision/review/needs-review/declined/eligibility-declined.html` | View confirmation of declined eligibility | Dashboard/List | Confirmation page shown |
| 8 | Evidence request confirmation | `la-manage/decision/review/needs-review/request-more/eligibility-requested.html` | View confirmation of evidence request | Dashboard/List | Confirmation page shown |

### Decision Points

#### Decision Point A: Applications List
From the applications list, user can:
- **Search**: Use search box to filter by name, DOB, school, or NI number
- **Click reference**: View specific application for detailed review
- **View status**: See "Action required" column for pending items

#### Decision Point B: Manage Pupil Record
From the record detail page, user can:
- **Review evidence**: Click links to view submitted files
- **Make decision**: Approve, decline, or request more evidence
- **Export record**: Download as CSV or PDF
- **Archive record**: Move record to archive

#### Decision Point C: Eligibility Decision
User must choose ONE of:
- **Approve - Targeted**: Child eligible for targeted FSM (color: purple tag)
- **Approve - Expanded**: Child eligible for expanded FSM (color: green tag)
- **Decline**: Child not eligible (color: red tag)
- **Request more evidence**: Pause decision pending additional documentation

### Record Status Indicators
From [pending_44455453.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/decision/review/needs-review/pending_44455453.html):

| Status | Tag Color | Meaning |
|--------|-----------|---------|
| Ready for review | Blue | Evidence received, ready for LA decision |
| Needs review | ? | **Uncertain - requires manual verification** |
| Pending | ? | Awaiting evidence from parent |

### Record Information Displayed
- **Application section**:
  - Reference number (e.g., 44455453)
  - Status badge
  - Status description
  - End date
  - Next review date (if applicable)

- **Parent/guardian section**:
  - First name, surname
  - Date of birth
  - National Insurance number
  - Email address

- **Child section**:
  - Child name
  - Date of birth
  - Child reference

- **School section**:
  - School name
  - School address
  - URN (possibly)

- **Evidence section**:
  - List of supporting documents
  - File names as links (e.g., file.001.jpg, file.002.jpg)

### Data Flow

**Record Navigation:**
- Clicked reference number: `/FSM/Private_beta/v8-1/LA/la-manage/decision/review/needs-review/pending_[CHILD_ID].html`
- Child ID from session data populated in URL

**Decision Routes** (from [appeal-decision.js](app/routes/fsm/private_beta/v8-1/appeal-decision.js)):
```javascript
POST /fsm/private_beta/v8-1/appeal-decision/johnson1
Decision value in session: data['decision']
- 'approve' → /fsm/private_beta/v8-1/LA/la-manage/decision/records/approve-johnson1
- 'decline' → /fsm/private_beta/v8-1/LA/la-manage/decision/records/decline-johnson1
- 'pending' → /fsm/private_beta/v8-1/LA/la-manage/decision/records/requestmore-johnson1
```

### User Actions
- **Search**: Text input with submit button
- **Click reference**: Navigate to record
- **Button menu**: "Manage child record" dropdown with multiple actions
- **Click evidence file**: Opens evidence detail/download
- **Decision buttons**: Click to approve/decline/request evidence
- **Back link**: JavaScript `window.history.back()`

### Integration Points
- Pupil record management system
- Evidence file storage and retrieval
- Decision tracking and workflow
- Email notifications (implied but not visible in prototype)

### Error Handling
- **Record not found**: Page [outcome-could-not-find-pending.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/outcomes/outcome-could-not-find-pending.html) available
- Recovery path uncertain - **requires manual verification**

### Notes
- Archive functionality path exists but details uncertain
- Export functionality file format not shown in prototype
- Decision routing uses generic `johnson1` example ID
- Multiple decision outcome pages exist (targeted, expanded, declined, requested)
- Some status pages not linked in main flow but files exist

---

## Journey 4: Search All Records

### Journey Overview
LA users can search and filter all pupil FSM records across the entire service. They can filter by eligibility status, export results, and view detailed record information.

### Journey Steps

| Step | Screen/Page | Route | User Action | Next Screen | Decision/Condition |
|------|-------------|-------|-------------|------------|-------------------|
| 1 | LA Dashboard | `/FSM/Private_beta/v8-1/LA/dashboard` | Click "Search all records" card | Search page with filters | Entry point |
| 2 | Search all records | `la-manage/report/search.html` | View filter panel and results table | [Decision Point A] | Shows 36 results by default (paginated) |
| 2a | Filter by status | `la-manage/report/search.html` | Use filter panel (left sidebar) to select eligibility status | Filtered table | Filters results by status |
| 2b | Results display | `la-manage/report/search.html` | View paginated table with 0-36 results shown | Table | Pagination shows 3 pages (default 36 shown) |
| 2c | Export results | `la-manage/report/search.html` | Click "Export as CSV" button | CSV download | Download filtered results |
| 3 | Results table | `la-manage/report/search.html` | Click on Reference number link in table | Record detail | Navigate to specific record (if applicable) |
| 4 | Pagination | `la-manage/report/search.html` | Click page number (1, 2, 3, etc.) | Next page of results | Load different results page |

### Decision Points

#### Decision Point A: Search & Filter
From the search page, user can:
- **Apply filters**: Use left panel to filter by status/eligibility type
- **Export results**: Download entire filtered result set as CSV
- **Browse results**: View table with pagination
- **Click record**: Navigate to specific record (uncertain - **requires manual verification**)

### Filter Panel Available
From [filter-panel-la-exp.html](app/views/_includes/la/v8-1/filter-panel-la-exp.html) (referenced):
- Filter options available (specific filters not visible in provided excerpts)
- Likely filters: Status, School, Eligibility type, Date range

### Results Table Columns
From [search.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/report/search.html):
- Reference (sortable, ascending by default)
- Parent name (sortable)
- Child name (sortable)
- Child date of birth (sortable)
- School (sortable)
- Date submitted (sortable)
- End date (sortable)
- Status (sortable)

### Status Values Shown
- Eligible targeted (purple tag)
- Eligible expanded (green tag)
- Not eligible (red tag)
- Pending (blue tag - uncertain)
- Other statuses - **uncertain, requires manual verification**

### Data Flow

**Table Data:**
- Source: [la-table-rows.html](app/views/_includes/la/v8-1/la-table-rows.html)
- Contains example records with links to appeal/record pages
- Links format: `/FSM/Private_beta/v8-1/LA/la-manage/decision/records/appeals/[RECORD_ID].html`

**Pagination:**
- Configuration: 3 pages shown (items: page 1, 2, 3)
- Current page marked
- Click to navigate

**Export:**
- Button ID: `export`
- Format: CSV
- All filtered results included

### User Actions
- **Filter input**: Select filter options to narrow results
- **Export button**: Download CSV file
- **Reference link**: Click to view record (destination uncertain)
- **Sortable headers**: Click to sort by column
- **Pagination numbers**: Click to view different page

### Integration Points
- Results filtering engine
- CSV export functionality
- Record lookup system
- Pagination system

### Notes
- Record click destination not clearly documented in provided files
- Specific filter options not detailed - **uncertain, requires manual verification**
- Export format and file naming not specified
- Table uses MOJ sortable table module
- 36 results shown in example but actual record count may vary

---

## Journey 5: Guidance

### Journey Overview
LA users can access comprehensive guidance about using the service, completing checks, reviewing evidence, and understanding eligibility criteria.

### Journey Steps

| Step | Screen/Page | Route | User Action | Next Screen | Decision/Condition |
|------|-------------|-------|-------------|------------|-------------------|
| 1 | LA Dashboard | `/FSM/Private_beta/v8-1/LA/dashboard` | Click "Guidance" card | Guidance overview | Entry point |
| 2 | Guidance overview | `LA/guidance.html` | View main guidance page | [Decision Point A] | See guidance topics/links |
| 2a | Guidance topic | `guidance/guidance-steps/overview.html` | Click on guidance link | Guidance detail page | View specific topic |
| 2b | Guidance topics | `guidance/guidance-steps/[TOPIC].html` | Navigate through topics | Other topics | Available topics: |
| | | | | | - Overview
| | | | | - Overview2
| | | | | - Individual check
| | | | | - Batch check
| | | | | - Policy guidance
| | | | | - Asylum check
| | | | | - Asylum check part 1
| | | | | - Recheck guidance
| | | | | - Recheck guidance full
| | | | | - Expansion guidance
| 3 | Guidance navigation | `guidance/guidance-steps/[TOPIC].html` | Use back link or topic links | Dashboard or different topic | Navigate between guidance pages |

### Decision Points

#### Decision Point A: Guidance Topics
User can select from available guidance topics to learn about:
- General overview and eligibility
- How to run an individual check
- How to run a batch check
- FSM policy and criteria
- Asylum seeker eligibility
- Recheck procedures
- Eligibility expansion criteria

### Guidance Content
Specific content not detailed in provided excerpts, but file structure shows organized guidance available at:
- [guidance.html](app/views/FSM/Private_beta/v8-1/LA/guidance/guidance.html) - Main guidance page
- `guidance/guidance-steps/[TOPIC].html` - Individual topic pages

### User Actions
- **Click guidance card**: Navigate from dashboard
- **Click topic link**: View guidance topic
- **Back link**: Return to previous page
- **New window link**: Open asylum check guidance in new tab (from soft check form)

---

## Navigation Structure

### Main Navigation Bar
From [layout-dfe-lanav.html](app/views/layouts/FSM/v8-1/layout-dfe-lanav.html):

| Navigation Item | Route | Purpose |
|-----------------|-------|---------|
| Service name | `/FSM/Private_beta/v8-1/LA/dashboard` | Home/dashboard link |
| Run a check | `/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/checker.html` | Quick link to soft check |
| Run batch check | `/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/june-launch/manual-no-ctf.html` | Quick link to batch check |
| Review applications | `/FSM/Private_beta/v8-1/LA/la-manage/decision/pending-list` (or applications.html) | Review queue link |
| Search records | `/FSM/Private_beta/v8-1/LA/la-manage/report/search.html` | Quick link to search |
| Guidance | `/FSM/Private_beta/v8-1/LA/guidance.html` | Help/guidance |
| Archived | `/FSM/Private_beta/v8-1/LA/la-manage/decision/records/archived.html` | View archived records |

### Layouts Used
- **Authenticated LA user layout**: [layout-dfe-lanav.html](app/views/layouts/FSM/v8-1/layout-dfe-lanav.html)
  - Full navigation and phase banner
  - Service name in header
  - Service navigation with 6 main links

- **Logged out layout**: [layout-dfe-logged-out.html](app/views/layouts/FSM/v8-0/layout-dfe-logged-out.html)
  - Used before authentication
  - Basic navigation

---

## System Settings & Configuration

### Version Identifier
Set in layout files:
```nunjucks
{% set ROOT = "/FSM/Private_beta/v8-1" %}
{% set VERSION = "v8-0" %} (in some pages - appears to be legacy)
```

### Service Name
"Manage eligibility for free school meals"

### Phase Banner
Status: Private beta
Message: "This is a Prototype used to test the service."

### Sign Out
Link text: "Sign me out"
Route: `{{ ROOT }}/dsi-account/dsi-startnow`

---

## Session Data Variables

| Variable | Purpose | Example Values |
|----------|---------|-----------------|
| `data['parent-firstname']` | Parent first name | "Alex" |
| `data['parent-surname']` | Parent last name | "Johnson" |
| `data['email']` | Parent email (optional) | "alex@example.com" |
| `data['dob-day']` | Date of birth - day | "15" |
| `data['dob-month']` | Date of birth - month | "03" |
| `data['dob-year']` | Date of birth - year | "1980" |
| `data['nationalInsuranceNumber']` | NI number | "AB123456A" |
| `data['eligibilityType']` | Check result type | "targeted", "expanded", "notEligible" |
| `data['policyLabel']` | Eligibility label | "Eligible targeted" |
| `data['tagClass']` | Tag CSS class | "govuk-tag--purple" |
| `data['eligibilityMessage']` | Result message | "This parent or guardian is eligible..." |
| `data['endDate']` | Eligibility end date | "31 August 2027" |
| `data['recheckDate']` | When to recheck | "Summer term 2027" |
| `data['decision']` | Approval decision | "approve", "decline", "pending" |

---

## Key Files Reference

### Views (UI Templates)
- **Dashboard**: [LA/dashboard.html](app/views/FSM/Private_beta/v8-1/LA/dashboard.html)
- **Soft check**: [la-manage/la-soft-check/checker.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/checker.html)
- **Batch check**: [la-manage/batch-checking/june-launch/manual-no-ctf.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/batch-checking/june-launch/manual-no-ctf.html)
- **Review applications**: [la-manage/decision/review/applications.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/decision/review/applications.html)
- **Search records**: [la-manage/report/search.html](app/views/FSM/Private_beta/v8-1/LA/la-manage/report/search.html)
- **Guidance**: [LA/guidance.html](app/views/FSM/Private_beta/v8-1/LA/guidance.html)

### Route Handlers
- **Soft check**: [app/routes/fsm/private_beta/v8-1/softcheck.js](app/routes/fsm/private_beta/v8-1/softcheck.js)
- **Decisions**: [app/routes/fsm/private_beta/v8-1/appeal-decision.js](app/routes/fsm/private_beta/v8-1/appeal-decision.js)

### Layouts
- **Main LA layout**: [layouts/FSM/v8-1/layout-dfe-lanav.html](app/views/layouts/FSM/v8-1/layout-dfe-lanav.html)
- **Standard layout**: [layouts/FSM/v8-1/layout-dfe.html](app/views/layouts/FSM/v8-1/layout-dfe.html)

---

## Uncertain Items - Manual Verification Required

The following items appear in the prototype but trigger conditions or full flows are not clearly documented in the visible code:

1. **Batch file upload handler**: Route for POST file upload not found in v8-1 routes
2. **Batch error handling**: Error pages exist but when/how they're triggered is unclear
3. **Archive record flow**: Archive page exists but full workflow not documented
4. **Record search click destination**: Unclear if/where clicking a record reference in search results navigates
5. **Pending record status transitions**: How "Pending" status records are handled, when evidence is received
6. **Export file naming**: CSV export filename convention not documented
7. **Filter panel options**: Specific filter options in search results not detailed
8. **Decision route handlers**: POST routes for approval/decline decisions not visible in appeals file
9. **Evidence file storage**: Physical evidence files and how they're managed not documented
10. **Session persistence**: How long session data persists not documented
11. **Notification system**: Email/notification triggers not implemented in prototype
12. **Multi-page application forms**: Application form for manual entry not found

---

## End States

### Successful Completion End States
1. **Soft check completed**: User views eligibility outcome
2. **Batch check completed**: Applications created from batch results
3. **Application reviewed**: Decision made (approved/declined/evidence requested)
4. **Records searched/exported**: Results viewed or downloaded

### Exit Points
1. **Return to dashboard**: Available from most pages via navigation or back links
2. **Sign out**: Link in header `{{ ROOT }}/dsi-account/dsi-startnow`
3. **Close browser**: No "logout" required shown

---

## Accessibility Features Noted

- Form labels and aria-describedby attributes
- Input hints and helper text
- Date input with accessible field structure
- Notification banners with roles (alert, region)
- Sortable table headers with aria-sort
- Screen reader status indicators (e.g., spinner with role="status")
- Visual feedback through tags and status indicators
- Skip links (likely in layout)

---

## Notes for Designers/Researchers

- Version v8-1 LA journey is comprehensive with 4 main user flows (soft check, batch check, review, search)
- Navigation is clear and consistent through layout-dfe-lanav.html
- Session data properly isolated per user
- Eligibility logic uses hardcoded test NI numbers (AB123456A, CD123456C, PN123456D)
- No live database backend is evident - data is mocked/prototyped
- Error handling pages exist but aren't linked in main flows
- Batch check flow shows processing status, but actual upload handler not visible
- Review workflow includes decision routing but confirmation flows not fully documented
- Search results suggest large dataset (36+ records) but filtering details sparse

---

**Document Generated**: 22 July 2026  
**Analysis Scope**: FSM v8-1 LA user journey only  
**Excludes**: LA_Basic variant, school users, other user types
