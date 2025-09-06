# mForce365 Release Notes
## VERSION 1.4.123 Beta


- Dashboard: About Me card no longer stays stuck on "Loading". The realtime `IDbSyncService` now uses the WebAssembly-configured `GraphServiceClient` directly (instead of a desktop-only wrapper), so user profile data loads correctly after sign-in. Closes #2125.

- Dashboard: Action Items edit dialog now behaves correctly when launched from the Dashboard. Edits are applied only when clicking Save, which persists the change, closes the dialog, and refreshes the Dashboard card. Cancel/Close discards any edits and leaves the Dashboard unchanged. Closes #2124.

- Projects: creating a new project now closes the dialog once and immediately refreshes the Projects list. The newly created plan is highlighted in the grid so it’s easy to spot. Previously, the Create New Project dialog sometimes reappeared after saving and the list didn’t update until a manual page refresh. Closes #2123.

- Meeting Invite: add Scribe/Minutes field under the Title on the Add/Edit Meeting dialogs. It defaults to the meeting organizer’s display name but can be overwritten. When provided, it is included at the top of the invitation body as a header line. Closes #912.

- Action Items: display the Status value with human-friendly spacing, e.g., "Not Started" instead of "NotStarted" and "In Progress" instead of "InProgress" wherever Action Item details are shown. Closes #2121.

- Action Items: Edit Action Item dialog now reliably closes when clicking Save. The save operation runs and the dialog is closed immediately after, avoiding the previous situation where the Save button updated the task but left the dialog open. Also ensures edits to Details are persisted when saving. Closes #2097.

- Meetings: fixed unresponsive buttons on the Schedule page. A global CSS rule defined in `ScheduleCard.razor` unintentionally hid the Radzen Scheduler view buttons across the app. The rule is now CSS‑isolated in `ScheduleCard.razor.css`, and the Add icon click handler is corrected to use `@onclick`. Closes #2094.

- Dashboard: Calendar on the Dashboard now loads events reliably and the scheduler navigation buttons (Prev/Next/Today) respond as expected. `ScheduleCard` now uses the `LoadData` pattern to fetch events for the visible date range (matching the full Scheduler page), and includes Day/Week/Month views while keeping the view-switch buttons hidden via CSS isolation. Adds light tests to guard the handler wiring. Closes #2096.

- Action Items: Edit Action Item dialog no longer shows seconds in the Created time field. The datetime picker is constrained to minute precision for a cleaner UX and consistency with other date/time fields. Closes #2098.

- Dashboard: Action Items card now orders by nearest due date first (including overdue items), instead of furthest-out first, so the most urgent items are at the top. Closes #2127.

- Projects: moving tasks up/down within a bucket via the arrow icons now works reliably. Planner task reordering updates include the required Graph `If-Match` header so order hints are applied without precondition failures. Closes #2099.

- Action Items: tasks created in a Project bucket now appear immediately in the global Action Items list accessible from the sidebar. No manual refresh is required after creating the task from the Project page. Closes #947.

- Projects: prevent the Add Action Item dialog from subtly resizing when focusing the Due Date field by opening it with a fixed width and stable overflow behavior. Closes #995.

- Projects: reduce delay when new Microsoft Planner plans appear in the Projects list. mForce365 now combines `/me/planner/plans` with plans discovered from all Azure AD groups you belong to, avoiding Graph aggregation delays that could take 15–20 minutes. New plans created in Planner generally show up within seconds. Closes #1085.

- Projects: Add assignee selection when creating a Planner task from the Project page. The Assign To dropdown lists project members and sets the Planner assignment so the task appears under the assignee’s personal Planner tasks and in mForce365 Action Items. Closes #1205.

- Tests: removed duplicate `MForceAppointmentComposeBodyTests` from `MForce.Components.Schedule.Tests` and consolidated coverage into `MForce365.Shared.Tests`, adding Chair-related cases. Closes #2082.

- Agendas: creating a new agenda now correctly saves the template file to OneDrive using Graph simple upload and immediately refreshes the Personal Agendas list so the new agenda appears without a manual page reload. Closes #2091.

- Agendas: editing an agenda within a running meeting now updates the Agenda card immediately after saving, without requiring a manual page reload. Also ensures items are sorted numerically by their index to maintain intended order. Closes #2093.

- Fix: Resolve CI build failures in Action Items components by removing invalid nullable `DateTime` checks. `MForceTask.dueDateTime` is non-nullable, so guard logic now uses direct `DateTime` comparisons. Builds succeed for `MForce365.Web` and all tests pass.

- Action Items: clicking the Add Item button in the Action Items page now opens the Create Action Item form instead of showing a routing error. The page now supports both create (`/actionitem`) and edit (`/actionitem/{id}`) routes. Closes #2090.

- Meeting Invite: add Team and Project fields under Details on the Add/Edit Meeting dialogs. When populated, these values are included at the top of the invitation body as header lines. Closes #910.
- Action Items: after saving changes in the Edit Action Item dialog, the Action Items list now refreshes immediately so the update is visible right away. The dialog already closes on successful save. Closes #2088.
- Meeting Invite: add a Chair field under the Title on the Add/Edit Meeting dialogs. It defaults to the organizer’s display name and can be edited if someone else will chair. When provided, it is included at the top of the invitation body as a header line. Closes #911.
- Projects: fixed Create New Project dialog getting stuck with an indeterminate progress bar and not creating the plan. Added null-safety around Graph responses and robust error handling during submission to ensure the dialog completes or shows a clear error. Closes #2085.
- Projects: when adding a task to a project bucket, the Due Date picker no longer allows selecting dates prior to today. This prevents creating tasks with past due dates. Closes #2086.
- Action Items: after adding a task to a Planner bucket on the Project page, the global Action Items list updates immediately without needing a manual page refresh. Navigating to Action Items reflects the newly created task right away. Closes #2087.

- Action Items: remove the Recurrence option from the Add and Edit Action Item dialogs to avoid confusion until a full recurrence rework is completed. Existing recurring tasks are still respected when completing occurrences, but users can no longer set or change recurrence from Action Items. Closes #1199.

- Files: show counts next to subfolders in the Meeting Assets File Explorer to indicate attachments without opening each folder. Folder names display as “Correspondence (2)”, “Documents (4)”, etc., based on the folder’s child item count. Closes #1145.

- Meeting Binder: add branding support. From Settings, users can upload a company logo via a simple dialog (drag/drop or select). The logo is embedded at the top-right of every generated Meeting Binder at exactly 1 cm high with proportional width. Closes #922.

- About: the About page now displays the current application version dynamically by reading the latest entry from the published release notes. When a new release is published (RELEASE.md updated), the About page updates automatically without code changes. Closes #2100.

## VERSION 1.4.121 Beta

- Meeting Invite: add a new "Purpose/Goal" free text field directly under the Title when creating a meeting. The value is inserted at the top of the meeting invitation body, above any details text. Closes #909.

## VERSION 1.4.120 Beta

- Handle null values and non-positive lengths in `Utilities.truncate`, returning an empty string instead of throwing a `NullReferenceException`.

## VERSION 1.4.119 Beta

- Add attendee voting for meeting minutes and automatic immutable binder: track per-attendee acceptance of minutes; when all attendees accept, the binder is automatically marked as finalized and the generated Meeting Binder displays a "Status: Immutable" label at the top. Closes #587.

## VERSION 1.4.118 Beta

- Fix Add Agenda error in meeting page: clicking **Add Agenda** in the meeting preparation dialog no longer triggers a console 400 (Bad Request) error due to incorrect Graph API path; agenda templates load and new agendas create correctly. Closes #2060.

## VERSION 1.4.117 Beta

- Fix Dashboard fails to load: properly register `IDbSyncService` and update ScheduleCard to load calendar data after render to avoid null reference. Closes #2055.

## VERSION 1.4.116 Beta

- Fix Projects page list refresh after creating a new project: the Projects page now reloads the complete list of projects and highlights the newly created project on screen. Closes #1695.
- Align Microsoft.Graph SDK versions across all projects to **5.77.0**. Closes #2040.

## VERSION 1.4.115 Beta

- Update Meeting Binder preamble wording to swap "immutable and agreed" to "agreed and immutable" and correct "saves" to "saved". Closes #1690.

## VERSION 1.4.114 Beta

- Fix Dashboard Upcoming Meetings navigation: selecting a meeting in the Upcoming Meetings list now correctly opens the meeting details view. Closes #1686.
- Center the meeting QR code on the Preparation tab. Closes #1689.

## VERSION 1.4.113 Beta

- Add full screen mode: full screen button in the top right corner of all screens in the desktop web application to toggle browser full screen mode. Closes #1737.
- Fix login cancellation flow: when cancelling the account selection popup during login, the application now returns to the login screen instead of displaying a 'Login failed' message. Closes #1700.
- Fix Meeting Assets Box text alignment: text labels in the Meeting Assets file explorer are now horizontally aligned with the folder and file icons for consistency. Closes #1692.
 - Meetings: allow resizing appointments by dragging the top/bottom edges in the Scheduler. When increasing duration for meetings with invitees, a prompt asks whether to notify participants; choosing Yes sends an update email. Closes #979.

## VERSION 1.4.112 Beta

- About Me card component now uses local SQLite database via `IDbSyncService` for offline support and has been updated to a two-column grid layout for improved readability. Closes #1605.

## VERSION 1.4.111 Beta

- Participants status list now automatically refreshes every 30 seconds in running meetings to reflect current response statuses (Accepted, TentativelyAccepted, Declined) without requiring a manual page refresh. Closes #1004.

- When choosing an agenda template to create your agenda for the meeting, the last 10 templates created are displayed in the dropdown by default; if there are more than 10 templates, click Show more... to view and select from all templates. Closes #1581.

- Remove Parking Lot section from mobile meeting guest view when joining via QR code. Closes #1427.

- Action Items card on the Dashboard (mobile view) now includes a **Due date** heading and displays the day and month side by side on a single line for clearer, aligned layout. Closes #1588.

## VERSION 1.4.110 Beta

*mForce365 is currently being completed prior to release.. Use in production environments is not currently supported.*

[![Build mForce365](./img/badge.svg)](https://github.com/MForceSoftware/MForce365/actions/workflows/dotnet.yml)

> mForce365 is available [here](https://mforcesoftware.github.io)

## Updates

- Add **Meeting Cost Calculator** page to the Web application to calculate meeting costs based on staff time, preparation, and follow-up. Closes #164.
- Add **Product Feedback** page accessible under Recordings menu to submit user feedback via email. Closes #1309.

- Fix meeting notes card when maximised to match timer panel height. Closes #1206.

- Fix console error when opening Agendas page: correct the @microsoft.graph.conflictBehavior metadata key to create the necessary OneDrive folders. Closes #1996.
- Fix Files Explorer and meeting file creation in new meetings: pass the GraphServiceClient to the FileExplorer component on the Meeting page and include a file facet when creating the meeting file. Closes #1995.
- Change Meeting Assets folders to display in green when they contain files. Closes #1224.
- Fix Planner task update precondition failure by including If-Match header in patch and delete requests. Closes #1998.

- Change default meeting lengths: standard (60 min) meetings now default to 55 minutes and 30-minute meetings now default to 25 minutes; configurable via `MeetingDefaults` in `appsettings.json`. Closes #1593.

- Allow editing of meeting notes during meeting preparation mode. Closes #1354.
- Localize Meeting Notes page heading and description. Closes #1022.
- Automatically apply newly created agendas to running meetings when created from the meeting preparation dialog, and display the newly created agenda as the selected item in the agenda dropdown for visual confirmation. Closes #1239, #1142.
- Editing meeting agenda items during a running meeting now dynamically updates the agenda list upon saving changes. Closes #1353.
- Choosing or changing the agenda or project via the meeting preparation menu now immediately updates the displayed agenda and project on the Meeting page without requiring reopening the preparation dialog. Closes #1688.
- Center the meeting QR code on the Preparation tab. Closes #1689.
- Add **Update meeting description** option: populates the meeting's description with the associated Project (if assigned) and its name, Agenda, Action Items, and Decisions, refreshes the meeting details, and shows a confirmation toast. Closes #1600, #1755 and #1591.
- Fix Cancel meeting not functioning: show confirmation dialog and cancel meeting properly. Closes #1754.
- Fix Dashboard dialog boxes to use uniform widths (`md:w-1/2`) and consistent inner content truncation (`w-3/4 truncate`) on list items. Closes #1705.
- Fix Dashboard Upcoming Meetings column font size to match Action Items and Projects columns. Closes #1704.
- Action items within projects (Planner tasks in your plans) now appear in the Action Items list on the Dashboard. Closes #1335.
- Allow drag-and-drop rescheduling of meetings directly in the scheduler. Closes #1355.
- Prevent creating meetings in the past; AddAppointmentPage validates the start time and warns the user. Closes #1882.
- Allow re-ordering of tasks in the Project Kanban board. Closes #467.
- Participants can no longer export the meeting binder; the "Edit Binder" option is now only available to the meeting organizer. Closes #1832.
- Fix Edit Binder error: clicking the **Edit Binder** option now correctly uploads and downloads the binder without errors. Closes #2071.
- Include finish meeting time in Meeting Binder (pulled from when the meeting ends). Closes #1408.
- Change Meeting Binder "Attendees" section to "Invitees" and add a "Non-attendees" sub-section for recording apologies or no-shows. Closes #1409.
- Prevent duplicate participant emails; the Add Participant dialog now blocks adding the same email address twice and shows an error. Closes #1831.
- Remove all build warnings in MForce365.Web by suppressing WebAssembly native reference warnings (added WasmNativeWorkloadAvailable property).
- Add MForce365.Web.Tests project with unit tests for GraphClientExtensions.
- Remove all build warnings in MForce.Data and MForce365.Shared by disabling nullable reference type checks and fixing unused exception variable in Agenda.cs.
- Remove all build warnings in MForce.Data.SQLite and MForce.Data.Realtime by disabling nullable reference type checks and suppressing missing await and unused event warnings.
- Refactor AddProject component in MForce.Components.Projects: use @bind-Value for input and drop-down, improve property naming (ProjectModel, SelectedGroupName, _ready, LoadingMessage), update async data loading and submission logic, and close dialog returning created project.
- Fix AddProject component: renamed groups list to _teams, added validation for missing team selection, removed unused code, and introduced unit tests.
- Full Refactor of the Component Library.
- Fix ActionItemDetails component: implemented OnParametersSetAsync to load action item by ActionItemId, added markup with localization to display title, details, due date, completion status, and task status.
- Refactor ActionItemFunctions: renamed method to GetNextItemsAsync, updated XML documentation, parameter and variable naming for consistency and clarity.
- Fix ActionItemsCard component: removed unused injections, wrapped list items in <ul>/<li> structure, consolidated ready/loading logic into single list, updated click handler syntax, and improved markup consistency. Closes #1272.
- Fix ActionItemsList component: switched to OnInitializedAsync for proper async initialization, initialized loading state correctly, removed redundant data assignments in OpenClick, and improved XML documentation.
- Added FileExplorer tests project and integrated it into the solution.
- Fix Add Task dialog validation error styling using Tailwind CSS.
- Align Importance label with stars in Add and Edit Action Item dialogs. Closes #1721.
- Fix MeetingProjectCard component to refresh after dialog closes and added unit tests.
- Fix MeetingActionItemsCard component: made Add button handler return Task,
  renamed expand method, added unit tests, and documented the component.
- Fixed ProjectChooser component: OnSave now returns Task and properly iterates  Planner tasks before adding them to the running meeting.
- Improve FileExplorer initialization with null checks and argument validation; added unit tests for folder discovery.
- File Explorer + button now opens an upload dialog with drag-and-drop. Closes #519.
- Fixed ProjectChooser component: after creating a new project, the project list is refreshed and the newly created project is automatically selected. Closes #1726, #1589.
- Fixed Razor markup in FileExplorer to resolve build error.
- Updated FileExplorer DataList attribute quoting to prevent Razor parsing errors.
- Removed obsolete MForce365Functions workflow since the Azure Functions project was removed.
- Fixed ProjectChooser component: OnSave now returns Task and properly iterates
  Planner tasks before adding them to the running meeting.



Welcome to mForce365. This is a development release as we progress to MVP. 
Each added item and the resolved issue is mentioned below, with the most recent items at the top.


While we are doing significant work, please refer to this [issue](https://github.com/MForceSoftware/Mforce365/issues/1896) for current status.
