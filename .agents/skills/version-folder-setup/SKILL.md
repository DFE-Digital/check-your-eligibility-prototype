---
name: version-folder-setup
description: Create a new version folder in the project directory by copying routes and views from a source version, updating internal references and generating markdown journey documentation. Use when starting a new major or minor version.
---
## When to use this skill
Use this skill when you need to create a new version folder in your project directory - either a major version (the journey structure changes for at least one user group) or a minor version (an existing journey pattern is extended to another user group or iterations are made to the existing journey).

## Versioning logic
**Major version** (e.g. v8 to v9): the underlying journey structure changes fundamentally for at least one user group — for example, a flow that bypasses a step the previous version relied on.
**Minor version** (e.g. v8-3 to v8-4): the same journey concept is extended to another user group, or a feature is added that slots into the existing pattern without changing its structure.
Always copy the entire previous version wholesale (all user groups), then only edit the specific user group being worked on. This keeps every version folder demoable and testable as a complete service.
Version numbering does not need to be sequential without gaps. A version can be skipped (e.g. v8-2) if it's unrelated to the current work, as long as it isn't overwritten.

## Step 1 — Copy and rename a version folder
Copy the entire folder app/routes/fsm/private_beta/[source version] into a new folder app/routes/fsm/private_beta/[new version].

Also copy the matching folders for views, layouts, and includes:

views/FSM/Private_beta/[source version] into views/FSM/Private_beta/[new version]
views/layouts/FSM/[source version] into views/layouts/FSM/[new version]
For each of these five user-group subfolders within views/_includes — family, LA, LA_Basic, mat, school — copy [source version] into [new version]

Within all newly copied files only, replace every instance of the source version number with the new version number. This includes file names, route paths, res.render calls, extends statements, ROOT variables, and any internal references to the version number.

Do not modify anything inside views/_includes that sits outside these five named group folders (e.g. back_link.html, footer.html, paths.njk), or any shared header, footer, or navigation partial files. Do not modify anything inside views or routes that are not specific to the new version.

List every file relating to [user group] so I can identify what needs manual editing.

## Step 2 — Generate markdown journey documentation
For each user journey inside the new version folder, create a markdown file summarising that journey: pages in order, what decision or input happens on each page, and where it can branch or exit. Save each one inside a top level documents folder, e.g. documents/journeys/[new version]/[user group].md, using a filename that matches the journey, e.g. schools-journey.md. Use the following format for each journey markdown file:

# [User group] journey
## Overview
A brief description of the journey, including its purpose and any key differences from previous versions.
## Pages
1. **[Page Name]** - [Brief description of the page's purpose and any key interactions or decisions that occur here.]
2. **[Page Name]** - [Brief description of the page's purpose and any key interactions or decisions that occur here.]
...
## Branching and Exits
- **[Page Name]**: [Description of any branching logic or exit points from this page, including where the user may be directed based on their input or decisions.]
- **[Page Name]**: [Description of any branching logic or exit points from this page, including where the user may be directed based on their input or decisions.]
...



Define the functionality provided by this skill, including detailed instructions and examples