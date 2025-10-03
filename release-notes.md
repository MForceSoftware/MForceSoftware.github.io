# mForce365 Release Notes
## VERSION 1.4.158 Beta

- Action Items: Save and Delete now function on the single Action Item page. The Save button submits the form via `OnValidSubmit` and persists changes for both new and existing items, while the Delete button invokes the handler to remove the current item and returns to the list. Added lightweight tests in `MForce365.Web.Tests/ActionItemSaveDeleteButtonsTests.cs` to ensure the submit and delete handlers remain wired. Closes #2342.
## VERSION 1.4.157 Beta

- Projects: Fix task reordering down by one. Clicking the down arrow on the top task previously moved it to the bottom of the list. The reorder logic now sets the task's `OrderHint` between the next two tasks, ensuring it moves exactly one position down. Tests in `MForce365.Web.Tests/ProjectTaskDownFixTests.cs` verify the updated algorithm is present in both the Web and legacy Pages implementations. Closes #2340.
## VERSION 1.4.156 Beta

- Meeting: Adding an email participant now persists on the Participants card until invites are sent. Pending attendees were being dropped on automatic refresh because the meeting reload replaced the local list with Graph attendees. `MForceMeeting.ReloadAsync` now preserves locally added pending attendees and merges them back after fetching from Graph. Includes a unit test in `MForce365.Shared.Tests/MeetingReloadPendingAttendeesTests.cs`. Closes #2339.
## VERSION 1.4.155 Beta

- Meeting: The Send meeting invite action now stretches across the meeting header so the button sits flush-right on desktop while stacking under the date on mobile. The draft participant toast references the `Send Meeting Invite` label so users know which action to trigger. Closes #2338.
## VERSION 1.4.154 Beta

- Action Items: Opening an action item URL for an item that was deleted now routes back to the list instead of throwing a null-reference during initialization. The page keeps its placeholder model and only assigns the retrieved item when found, returning immediately after redirect. A new test in `MForce365.Web.Tests/ActionItemInitializationTests.cs` locks the navigation guard in place. Closes #2238.
## VERSION 1.4.153 Beta

- Meetings: The recurrence dialog now seeds the start date from the appointment and defaults the end date to six months later instead of `0001-01-01`. `AddAppointmentPage` passes the meeting start/end into the dialog, and new coverage in `MForce.Components.Schedule.Tests/RecurrencePatternDefaultsTests.cs` locks the initialization behavior. Closes #2337.
## VERSION 1.4.152 Beta

- Dashboard: Calendar Today button now responds in Week and Month views. `ScheduleCard` binds the scheduler date via `@bind-Date="@currentDate"`, mirroring the full Scheduler page. This ensures toolbar navigation (Today/Prev/Next) updates the visible range and triggers `LoadData`. Added a test in `MForce.Components.Schedule.Tests/ScheduleCardTests.cs` to lock the binding in place. Closes #2336.
## VERSION 1.4.151 Beta

- Schedule: Day/Week time slots now show a hand cursor on hover to indicate they’re selectable. Styles were applied via CSS isolation in both `MainSchedule.razor.css` and `ScheduleCard.razor.css`, including the Radzen `rz-events` overlay to ensure the cursor appears over the full interactive surface. Tests updated in `MForce.Components.Schedule.Tests/CursorPointerOnSlotsTests.cs` to lock this behavior. Closes #2258.
## VERSION 1.4.150 Beta

- Projects: The "Add Bucket" dialog no longer loses focus after each keystroke. The form now binds to a stable model instance (`AddBucketModel`) and updates the `Name` property on input, preventing `RadzenTemplateForm` from recreating its `EditContext`. Tests were updated to guard this behavior. Closes #2298.
## VERSION 1.4.149 Beta

- Meeting: Word binders now render the Table of Contents immediately because the document settings request field updates on open. Added a shared test that locks the `UpdateFieldsOnOpen` flag so meeting summaries always surface navigation when downloaded or finalized. Closes #2330.

## VERSION 1.4.148 Beta

- Meeting: Binder now regenerates automatically whenever agendas, attendees, notes, or projects change so organizers always download the latest content before finalizing. Added shared tests cover binder invalidation to prevent regressions. Closes #2329.

## VERSION 1.4.147 Beta

- Meeting: Opening an existing meeting now reuses the original meeting assets folder instead of creating a renamed copy, so the saved `thisMeeting.meetingv1` snapshot loads correctly from OneDrive. Closes #2328.

## VERSION 1.4.146 Beta

- Meeting: Adding a participant no longer surfaces a console `412 Precondition Failed` when the binder document already exists. The binder upload now retrieves the current drive item ETag and sends it in the Graph `If-Match` header (falling back to `*`), keeping the binder in sync without conflicting with Word co-authoring. Added WebAssembly tests lock down the concurrency guard. Closes #2327.

## VERSION 1.4.145 Beta

- Meeting: Saving the running meeting now uploads the `.meetingv1` state file via Microsoft Graph `ItemWithPath(...).Content.PutAsync(...)` guarded by a semaphore, preventing the 409 conflicts that occurred when assigning a project. Added tests ensure the ItemWithPath pattern and removal of the legacy `If-Match` header stay in place. Closes #2326.

## VERSION 1.4.144 Beta

- Meeting: Drafting a meeting now builds a Word-based meeting binder populated with the title page, overview, notes, agenda, decisions, actions, Planner project summary, and any uploaded files as appendices. The host can download the `.docx` at any point, receives an automatic PDF copy when the meeting ends, and finalizing the binder converts the latest version to PDF and emails it to every attendee. Localized resources drive the section headings, and new shared tests cover binder generation and the table of contents field. Closes #2324.

## VERSION 1.4.143 Beta

- Action Items: Status dropdown options now use localized, human-friendly labels ("Not Started", "In Progress", "Waiting On Others") so the create/edit forms match the rest of the UI. Added resource tests guard the spacing. Closes #2321.

## VERSION 1.4.142 Beta

- Meeting: Cancelling a meeting now validates that the Graph event id is available before asking for confirmation, and wraps the Graph cancel call in error handling so the WebAssembly runtime no longer crashes. The UI surfaces localized success/error notifications and uses a default cancellation comment. Added unit tests cover the guard and resource keys. Closes #2302.

## VERSION 1.4.141 Beta

- Meeting: Regenerate the Microsoft Teams description on every request instead of blocking after the first run. The formatter now strips the previous summary (including legacy markup) before rebuilding, so the "Update meeting description" action reliably reflects the latest agenda, action items, and decisions. Added shared tests lock down repeated updates. Closes #2301.

## VERSION 1.4.140 Beta

- Meeting: Relocated the "Send meeting invite" action to the meeting header so it sits under the scheduled date and alongside the Preparation/Participants controls. The action now reuses pending attendees, resends updates to everyone in the participant list, and stays disabled until at least one participant exists. Added tests lock down the markup and component API. Closes #2300.

## VERSION 1.4.139 Beta

- Projects: Adding a Planner task now supplies the required assignment `orderHint`, so tasks assigned during creation persist instead of returning `400 The format of value '*' is invalid`. Closes #2299.

## VERSION 1.4.138 Beta

- Action Items: Clear the cached task list before reloading from Microsoft Graph so refreshes after completing an item no longer duplicate entries on the dashboard. Closes #2298.

## VERSION 1.4.137 Beta

- Action Items: Hide Microsoft To-Do recurrence series masters when the Graph API returns instance occurrences so the dashboard only lists actionable items. When Graph provides no instances we keep the master, matching client behavior. Added tests cover both paths. Closes #2296.

## VERSION 1.4.136 Beta


- Action Items: To-Do and Planner loaders now iterate Microsoft Graph paging so the dashboard surfaces every task. Recurring To-Do instances follow `@odata.nextLink`, matching SDK guidance. Closes #2295.

- Shared: `Utilities.getToDoItems` now awaits Microsoft Graph instead of blocking on `.Result`, preventing UI hangs in Blazor WebAssembly. The helper returns a fresh `Todo` object when Graph is unavailable, and tests cover the async path. Closes #2294.


## VERSION 1.4.135 Beta

- Schedule: preserve Graph time zones when loading and editing events. Calendar view requests now set `Prefer: outlook.timezone` and hydrate appointments via `DateTimeTimeZone.ToDateTimeOffset()` so local times render accurately. Drag and resize operations convert scheduler selections back into the event's original zone before PATCHing, preventing unintended UTC shifts. Closes #2293.

## VERSION 1.4.134 Beta

- Teams: Cancelling the New Team dialog no longer throws a null reference. The page now checks the dialog result before populating Graph metadata and posting, so closing the dialog simply returns to the list. Added tests ensure the null guard precedes the Graph call. Closes #2292.

## VERSION 1.4.133 Beta


- Action Items: The importance star rating now maps to Microsoft Graph importance through a shared switch-expression helper, removing magic numbers and keeping ratings 0/1 as Low, 2 as Normal, and 3 as High. Closes #2173.

- Schedule: Day and Week views now show a hand cursor when hovering the 30-minute time slots, making it obvious they can be clicked to start creating a meeting. The styling targets Radzen's underlying `rz-slot` class so the cursor change applies to the actual selectable surface. Closes #2258.

## VERSION 1.4.132 Beta

- Action Items: Modernized the edit dialog used across the dashboard and meeting experiences. The dialog now shares the same streamlined layout as the create form, keeps the Completed toggle and Delete button front-and-center, and refreshes after save/delete/complete operations. Closes #2260.

## VERSION 1.4.131 Beta

- Meeting: Add Action Item from the meeting details page now opens the new Add Action Item dialog—both from the **Add Action** menu entry and the card’s **+** icon—so the experience matches the rest of the app. The dialog supports assigning to meeting attendees and selecting Importance via star rating. Closes #2280.
- Meeting Decisions: The Add Decision dialog now binds the Status radio group straight to the `MeetingDecisionStatus` enum, guaranteeing each selection saves the matching value (Agreed, Rejected, Pending, New). Decision icons in the meeting card now stay in sync—Agreed shows a green thumbs-up and Rejected a red thumbs-down. Tests guard the strongly typed binding. Closes #2281.
- Projects: Reordering tasks within a bucket using the arrow icons now succeeds. Planner PATCH calls reuse each task's current `@odata.etag` for the `If-Match` header (with a safe fallback), eliminating the 400 "The format of value '*' is invalid" error. Closes #2202.

## VERSION 1.4.130 Beta


- Action Items: simplify `RadzenRating` Change handler bindings by passing the method group directly (e.g., `Change=@OnRatingChange`) instead of wrapping in a redundant lambda (e.g., `Change=@(args => OnRatingChange(args))`). This removes noise without changing behavior. Tests added to guard the binding style. Closes #2172.
- Agendas: Meeting Agenda dropdown now populates with all existing agendas, not just those flagged as templates. The list shows the 10 most recently created agendas by default, with a Show more button to reveal the full set. Selecting a newly created agenda from the dialog applies it immediately to the meeting. Closes #2279.

## VERSION 1.4.129 Beta

- Participants: after adding an invitee via Save (draft), the invitee now appears immediately in the Participants list marked as Pending, and a visible Save and Send button is shown in the header to dispatch invites when ready. Prevents the draft attendee from disappearing due to an unnecessary Graph reload. Closes #2278.
## VERSION 1.4.128 Beta

- Action Items: show Status dropdown when creating a new action item. The Create Action Item page now defaults the new item to a Microsoft To‑Do task and initializes Status to Not Started, so the editable Status selector appears immediately (instead of a read‑only display). This aligns the create experience with editing existing items. Closes #2277.
## VERSION 1.4.127 Beta

- Web: fix Logout appearing clickable but not responding. The header Logout link now prevents default anchor navigation and invokes the Blazor WebAssembly logout flow via `NavigationManager.NavigateToLogout("authentication/logout")` after user confirmation. This reliably signs the user out. Closes #2276.

## VERSION 1.4.126 Beta

- Dashboard: Action Items card now allows deleting an action item and marking it complete from the edit dialog. The dialog is the newer Add/Edit Action Item UI and includes a Completed toggle and a Delete button. After closing the dialog, the card refreshes from Microsoft Graph so saves, completes, and deletes are reflected immediately. Closes #2260.

## VERSION 1.4.125 Beta

- Web: add a confirmation dialog when selecting Logout so users can cancel if clicked by mistake. The dialog is fully localized and supports the Escape key (Esc) to cancel, keeping the user signed in and returning to the app without navigating to the Microsoft sign‑out page. Closes #2257.

## VERSION 1.4.124 Beta

- Meeting Binder: fix console error when selecting Edit Binder caused by attempting to create a Drive item without a file facet. Binder upload now uses `ItemWithPath(...).Content.PutAsync(...)` to create or replace the Word document in the meeting folder, then records the file ID for later finalize-to-PDF flow. Closes #2269.
 - Agendas: reloading the Agendas page no longer hangs. Fixed two root causes: (1) the Font Awesome CDN stylesheet was blocked by an incorrect SRI hash; `wwwroot/index.html` now contains the correct hash for 6.4.0. (2) a NullReferenceException in `O365Agendas.Setup` during reload when OneDrive children or download URLs were missing; added null-safety checks and safer LINQ usage. Tests updated to guard the correct SRI. Closes #2255.
 - Projects: deleting a project no longer shows the error "The format of value '*' is invalid" after confirming the delete. The delete call to Microsoft Graph Planner now prefers the plan's actual ETag (`@odata.etag`) for the `If-Match` header, falling back to `*` only when an ETag is unavailable. This avoids header format validation issues and reliably deletes the plan. Closes #2256.

## VERSION 1.4.123 Beta



- QuickGrid: fix runtime error introduced by `Microsoft.AspNetCore.Components.QuickGrid` 9.x where `TemplateColumn` no longer accepts `SortKeySelector`. Updated Action Items and Projects grids to use `SortBy` for sorting the Title and Date Created columns. This resolves the WebAssembly render exception and restores dynamic updates to the agenda/Action Items lists after creating new entries. Closes #2254.
- Action Items: add a star rating for Importance to the Create/Edit Action Item page in the Web app. The rating appears next to the Status inputs and maps to Microsoft To‑Do Importance (Low/Normal/High). Also updated labels from “Priority” to “Importance” for consistency across Add/Edit dialogs and the Action Items list. Backend now persists Importance on create and update. Closes #2252.
- Schedule: fix Today button not responding in Month view by binding the scheduler's current date (`@bind-Date="@currentDate"`) in `MainSchedule.razor`. Ensures toolbar navigation (Today/Prev/Next) updates the view reliably across all modes. Closes #2248.
 - Schedule: Add Meeting dialog Title field now matches the size and styling of other inputs by using a Radzen `RadzenTextBox` bound to `model.Title` instead of a Blazor `InputText`. Improves visual consistency with Scribe, Chair, Purpose/Goal, and other fields. Closes #2249.
- Action Items: fix console error when opening the Add/Edit Action Item page by removing `InputText` usages with a `Value` attribute (which require a `ValueExpression`). Disabled, read‑only fields now use plain `<input>` elements. Added a test to prevent regressions. Closes #2242.
- Web: fix blocked Font Awesome stylesheet by updating the SRI hash in `wwwroot/index.html` to the correct value for 6.4.0. Added a test to guard SRI integrity and pinned `System.Linq.Dynamic.Core` to 1.6.0.2 in Schedule to align with Radzen and prevent a runtime `MissingMethodException` when rendering the Scheduler. Closes #2241.
- Meetings: Add Decision dialog now displays its Title, Description, and Status inputs. The dialog had been opened with an unknown parameter (`runningMeeting`), which caused a silent render failure and an empty dialog body. The `AddDecision` component now accepts this parameter, preventing the failure. Closes #2239.
 - Decisions: Changing a decision's Status to New no longer causes the item to disappear. The Add Decision dialog now explicitly accepts a lower-cased `model` parameter alias to ensure edits bind to the existing decision when opened via dialog services. This prevents replacing the existing decision with an empty one and preserves the item while simply updating its status and icon. Closes #2282.
- Action Items: when parsing a task's `Status` fails (e.g., an unknown or empty value), the app now defaults to `Not Started` instead of `In Progress`. Reading a To‑Do task without a status also maps to `NotStarted`. This aligns with user expectations and avoids implying work has begun. Tests cover both the constructor default and the update fallback. Closes #2236.
- Action Items: replace null-conditional operator usage in the Status section of the Action Item page with explicit null handling. When the item is not yet available, the page now renders a disabled placeholder instead of risking a null reference; To‑Do tasks still show an editable selector and non–To‑Do tasks show a read‑only display. Closes #2235.
- Action Items: reinstate the Status input on the single Action Item page. For To‑Do tasks, the page now shows an editable `InputSelect` bound to `taskStatus` with the standard options (Not Started, In Progress, Completed, Waiting on Others, Deferred). Non–To‑Do tasks still render a read‑only status label. Backend updates ensure `UpdateActionItemAsync` patches the Status on Microsoft To‑Do and keeps the local `Completed` flag in sync. Closes #2207.
 - Action Items: make the Status input visually consistent on the Create/Edit Action Item page. The Status field now uses a white background with a standard border to match other inputs, even when disabled (e.g., during initial render or for non–To‑Do items). Removed the grey background style and added a test to prevent regressions. Closes #2251.
 - Action Items: restored the Title column display on the Action Items list and localized the column header to use `@Loc["Title"]`. This makes the item title visible again in the side Action Items view and aligns the header with other localized labels. Added a web test to guard the presence of the Title column and link template. Closes #2250.
 - Agendas: improve the Create New Agenda layout by adding proper vertical spacing between the Description input and the Items editor. Prevents the textarea bottom border from touching the next input row on initial display. Closes #2253.
- Agendas: allow deleting items while creating or editing an agenda template. The Add Agenda dialog now shows a delete (trash) icon next to each item in both view and edit modes to remove mistakes or extra entries. Tests verify the presence of the delete actions and backing handler. Closes #2206.
- Agendas: prevent total item percentages from exceeding 100% when creating or editing an agenda template. Adding a new item now clamps its percentage to the remaining available amount, and editing an existing item’s percentage is constrained so the sum across all items never goes above 100. A lightweight test guards these behaviors. Closes #2205.
- Action Items: Title column now sorts alphabetically ascending/descending. The QuickGrid Title column switched to a template for the hyperlink, but lacked a `SortKeySelector`; adding it restores responsive sorting like other columns (Type remains unsortable by design). Closes #2203.
- Action Items: rating stars now render correctly by including the Material Icons webfont used by Radzen components. Added the stylesheet link to `MForce365.Web/wwwroot/index.html` and a test to guard against regressions. Closes #2209.
 - Fix: Avoid double updates in Agenda editor by removing `@bind-Value` from the `RadzenNumeric` used when editing an item's Percentage. The control now uses `Value` plus an explicit `Change` handler that clamps values so the total never exceeds 100%. Added a unit test to prevent regression. Closes #2232.
- Action Items: unify due date/time normalization across task creation paths. Both To‑Do and Planner task creations now normalize returned `CreatedDateTime`/`DueDateTime` using `DateTimeOffset.LocalDateTime` (or `ToDateTimeOffset().LocalDateTime` for `DateTimeTimeZone`) to avoid timezone inconsistencies when rendering in the UI. Closes #2216.

- Schedule: Add Meeting dialog Title field now matches the length and Tailwind styling of other inputs. Replaced the Radzen textbox with a Blazor `InputText` using the same classes as Start/End so the caret is visible and the control width is consistent. Closes #2198.

- Participants: adding a participant no longer sends an invite immediately. The Add Participant dialog now saves the email to a draft list by default. A new Save and Send action appears on the Participants header to send all pending invites when you're ready. Closes #2184.

- Schedule: newly created meetings now appear immediately in the Dashboard calendar. The Schedule card adds the created meeting to the local list before refreshing from Graph, eliminating transient delays while Graph propagates the new event. Closes #2180.

- Action Items: Save now works on the Create Action Item page. Creating a new item from `/actionitem` no longer fails silently when the model lacks a `type`/`listId`. The backend now defaults such items to the user's first Microsoft To‑Do list and sets the model metadata so the item immediately appears on the Dashboard list after save. Closes #2208.

- Projects: add Delete action (trash icon) to the Projects list. Users can now delete a project directly from the list with a confirmation dialog; the grid refreshes after deletion. Closes #2210.

- Projects: make Projected Completion Date input consistent with other fields in the Create New Project dialog. The date picker now uses full-width styling to match the Title and Team inputs instead of a narrower fixed width, improving visual hierarchy and reducing distraction. Closes #2204.

- Projects: deleting a project from the Projects list no longer fails with "The If-Match header must be specified for this kind of request". The delete call to Microsoft Graph Planner now includes the required `If-Match: *` header to satisfy Graph’s precondition requirements. Closes #2223.

- Projects: add a test to assert default sorting by Created Date (latest first) on the Projects page, ensuring users can return to date order after sorting by Title. Closes #2129.

- Projects: eliminate duplicated `_ready = true` and `StateHasChanged()` calls in the Create New Project dialog (`AddProject`). All state restoration now happens in the `finally` block, ensuring consistent behavior across success, early-return validation, and exception paths. Closes #2194.

- Projects: Create New Project dialog now reliably closes on failure. If an exception occurs during plan creation, the dialog no longer gets stuck in a loading state; the component restores readiness and closes the dialog without a result so users can try again. Success still returns the created plan to refresh and highlight it on the Projects page. Closes #2162.

- Projects: removed an unnecessary `StateHasChanged()` call in the Projects page (`Pages/Projects.razor.cs`) immediately before `NavigateTo(..., forceLoad: true)`. Since a force‑load navigation reloads the page, the extra state notification was redundant. Closes #2161.

- Projects: Add Bucket dialog Save is now responsive. The Save button was outside the `RadzenTemplateForm`, so clicks did not submit the form and the dialog appeared unresponsive. The Save/Cancel buttons are now inside the form, ensuring submit fires and the bucket is created. Closes #2183.

- Shared: replaced the magic number used for `StringBuilder` capacity in `MForceTask.AddSpacesToPascalCase` with a descriptive calculation (`input.Length * 2`) and added a comment explaining the conservative worst-case. Closes #2137.

- Projects: prevent UI from becoming unresponsive after adding a task to a bucket. All Project page event handlers now return Task (not async void), and the Razor bindings use async lambdas so exceptions are observed and the render tree stays healthy. Also ensures the drag/drop Drop handler is async. Closes #2181.

- Settings: Upload Company logo dialog now shows the currently stored logo (if any) as a preview when opened. This makes it clear whether a logo has already been uploaded without needing to reselect a file. Closes #2153.

- Projects: Add a Projected Completion Date field to the Create New Project dialog. When provided, a Planner task named "Projected Completion" is created in the new project's default bucket with the selected due date. This helps teams track and visualize the target completion from day one. Closes #2151.

- Projects: add a Created Date field to the Projects list and make it sortable by the actual created timestamp. This helps testing and production users quickly locate newly created projects. Closes #2150.

- Settings: consolidated duplicate `@code` blocks in `Pages/Settings.razor` into a single block for clearer organization and maintainability. Closes #2117.

- Action Items: add ability to change importance when reviewing a single Action Item. The Action Item page (`/actionitem/{id}`) now shows a 3‑star rating and Save button for To‑Do tasks that patches only the Graph `Importance` field. Closes #2122.

- Authentication: the Register button no longer hangs. Azure AD (Microsoft Entra ID) does not support self‑service sign‑up in this app; the Register link now routes to the standard Login flow and the Register view redirects accordingly. This avoids a blank state on `/authentication/register`. Closes #2157.

- Projects: Add Task and Add bucket now work on the Projects page. The Add Bucket dialog initializes its form model so Save submits correctly, and Add buttons stop event propagation so drag/drop zones don’t swallow clicks. Closes #2156.

- Projects: Add bucket Save no longer requires two clicks. The Add Bucket dialog’s text box now updates the model on each keystroke so submitting immediately uses the latest value. This prevents the first click from submitting an empty/stale name. Closes #2201.

- Projects: fix unresponsive task reorder arrows within buckets. The up/down arrow icons are now rendered outside the draggable region so the drag surface no longer intercepts clicks. Clicking the arrows reliably updates task order via Graph `orderHint`. Closes #2202.

- Projects: reordering tasks within a bucket using the up/down arrows now works in the Web client. Planner task updates include the required Graph `If-Match` header when adjusting `orderHint`, so clicks reliably change order. Closes #2155.

- Action Items: on the simple Action Item page (`/actionitem` and `/actionitem/{id}`), the Status field now displays a human-friendly value with spaces (e.g., "Not Started" instead of "Notstarted"). The field is shown read-only to avoid editing raw enum text. Closes #2152.

- Action Items: when creating a new Action Item from the page, the Due Date now defaults to 7 days from today instead of showing an uninitialized year 0001 date. This applies only to new items (not edits) and aligns with the Add dialog behavior. Closes #2145.

- Action Items: change the Add dialog heading from "CreateActionItem" to the human-friendly "Create Action Item" by adding a localized resource key. Closes #2130.

- Projects: the Start Date column on the Projects page is now sortable. Clicking the Start Date header toggles between earliest-to-latest and latest-to-earliest, so you can restore the default date order after sorting by Title without refreshing the page. Closes #2129.

- Dashboard: Next Meeting card now populates correctly. The retrieval of the next calendar event no longer applies an unsupported `$filter` on start/end when using the `calendarView` endpoint; instead, it relies on the date window parameters and sorts by start time. This returns events as expected in WebAssembly. Closes #2128.

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

- Dashboard: Projects list now keeps the project name on the same line as the bullet. The link is rendered as `inline-block` (instead of `block`) so the bullet and text align neatly on one line in the card. Closes #2126.

- Dashboard: Calendar and Next Meeting now populate on first load after sign-in. The Scheduler triggers an initial data reload on first render, and the Next Meeting card defers Graph fetch until after first render to avoid auth race conditions. Closes #2147.

- Meetings: selecting Meetings from the sidebar now shows the populated Schedule. Navigation links were standardized to the canonical lowercase route `"/scheduler"` across the app (NavMenu, MenuBar, and cards). This avoids case/relative-path mismatches that could leave the scheduler view blank after navigation. Closes #2148.

- Projects: Create New Project dialog now closes immediately on Save, updates the Projects list, and then reloads the page to ensure the new plan appears even under Graph’s eventual consistency. The dialog also closes even if post-create steps (sharing or default bucket creation) fail, since the plan itself has been created. Closes #2149.
 
 - Schedule: Day/Week time slots now show a hand cursor when hovering/selecting to clearly indicate they are clickable for creating a meeting. Applies to the main Schedule page and the Dashboard calendar card. Closes #2258.

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

- Action Items: add Priority (star rating) to the Create Action Item dialog and sync it with Microsoft Graph importance (Low, Normal, High). The label has been updated from ‘Importance’ to ‘Priority’ across create/edit/review screens. Closes #2209.



Welcome to mForce365. This is a development release as we progress to MVP. 
Each added item and the resolved issue is mentioned below, with the most recent items at the top.


While we are doing significant work, please refer to this [issue](https://github.com/MForceSoftware/Mforce365/issues/1896) for current status.
- Action Item form: fixed the Status field to be editable for To‑Do tasks and aligned the Completed checkbox with the Status input for consistent layout. Closes #2341.
