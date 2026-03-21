# mForce365 Release Notes
## VERSION 1.4.237 Beta

- Public competitive-analysis landing page for issue `#564` (`MForce365.Web/Pages/Comparison.razor`, `MForce365.Web/Shared/PublicLayout.razor`, `MForce.Components/PreLoginHomePage.razor`, `MForce365.Web.Tests/ComparisonPageTests.cs`, `MForce365.Web.Tests/PreLoginComparisonLinkTests.cs`, `MForce365.Web.Tests/PublicLayoutNavigationTests.cs`, `docs/README.md`, `docs/development.md`, `docs/meeting-solutions-comparison.md`, `RELEASE.md`):
  - Added `/competitive-analysis` as the primary public entry point for the existing meeting-software comparison experience while preserving the older `/compare` and `/meeting-solutions-comparison` aliases.
  - Refreshed the public page copy and landing-page entry links so the experience is explicitly positioned as a competitive analysis of meeting management software for Microsoft 365 organizations.
  - Kept the content vendor-safe and category-based rather than introducing unsupported pricing or legal claims against named competitors.
  - Closes #564.
- Meeting invite scheduling view integration for issue `#561` (`MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce.Components.Schedule/AddAppointmentPage.razor.cs`, `MForce.Components.Schedule/MainSchedule.razor`, `MForce.Components.Schedule.Tests/AddAppointmentAvailabilitySuggestionTests.cs`, `MForce.Components.Schedule.Tests/MainScheduleMergedScheduleTests.cs`, `MForce365.Web/Pages/Scheduler.razor`, `MForce.Pages/Pages/Scheduler.razor`, `MForce365.Web.Tests/SchedulerPageHeadingTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Updated the Add Meeting invite flow so participant availability now has two linked options: `Find time` for Graph-backed suggestions and `View schedules` for a visual merged-calendar overlay.
  - Wired the scheduler pages to accept a `merge` query-string and prefill the existing shared-calendar overlay experience from invite participants, keeping those imported blocks read-only.
  - Added regression coverage for the new invite-to-scheduler wiring and the scheduler query-string handoff.
  - Closes #561.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

## VERSION 1.4.236 Beta

- Immutable binder blockchain proof for issue `#524` (`MForce365.Shared/AppConfiguration.cs`, `MForce365.Shared/MeetingBlockchainProofManifest.cs`, `MForce365.Web/Pages/AdminMeetingSettings.razor`, `MForce365.Web/Pages/Meeting.razor.cs`, `MForce365.Shared.Tests/MeetingBlockchainProofBuilderTests.cs`, `MForce365.Web.Tests/MeetingBlockchainProofFlowTests.cs`, `docs/administration.md`, `docs/development.md`, `RELEASE.md`):
  - Added an `Immutable record` control to `/admin/meeting-settings` so the web client can persist a browser-local preference for blockchain-ready proof generation under `mforce_blockchain_proof_enabled`.
  - Immutable Meeting Binder PDFs now write `MeetingBinder.blockchain-proof.json` into the meeting folder, capturing a SHA-256 hash plus meeting metadata for the generated PDF artifact while keeping the finalized document in the normal export / records flow.
  - Kept the shipped scope hash-only rather than attempting raw-PDF-on-chain storage from the WebAssembly client, which avoids exposing sensitive meeting content directly on a blockchain.
  - Closes #524.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

## VERSION 1.4.235 Beta

- Teams meeting chat posting for issue `#556` (`MForce365.Web/Pages/Meeting.razor`, `MForce365.Web/Pages/Meeting.razor.cs`, `MForce365.Web/wwwroot/appsettings.json`, `MForce365.Shared/MeetingTeamsChatPostBuilder.cs`, `MForce365.Shared/GraphService.cs`, `MForce365.Shared/mForce365Strings.resx`, `MForce365.Shared.Tests/MeetingTeamsChatPostBuilderTests.cs`, `MForce365.Web.Tests/MeetingTeamsChatPostingTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Added Teams-specific actions to the web meeting page's online-meeting card so organizers can post either the meeting details or the captured notes directly into the Microsoft Teams meeting chat.
  - Resolved the Teams chat thread from the online meeting join URL through Microsoft Graph and kept the posted payloads intentionally simple so the same meeting state can be shared safely in chat without reusing the richer email-only markup.
  - Added the delegated `OnlineMeetings.Read` and `ChatMessage.Send` scopes needed for the flow, documented the work/school-account limitation, and covered the payload builder plus meeting-page wiring with targeted regression tests.
  - Closes #556.
- Meeting invite agenda items for issue `#917` (`MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce365.Shared/MForceAppointment.cs`, `MForce365.Shared.Tests/MForceAppointmentComposeBodyTests.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingMetadataTests.cs`, `docs/meeting-description.md`, `docs/development.md`, `RELEASE.md`):
  - Added a dedicated `Agenda` field to the Add Meeting invite flow so organizers can list the main topics attendees should expect to cover.
  - Updated invite-body composition so agenda items are emitted as structured metadata in both text and HTML bodies near the top of the invitation instead of being buried in the generic details block.
  - Added regression coverage for the new textarea wiring and for the generated invite-body output.
  - Closes #917.
- Meeting invite pre-meeting work for issue `#920` (`MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce365.Shared/MForceAppointment.cs`, `MForce365.Shared.Tests/MForceAppointmentComposeBodyTests.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingMetadataTests.cs`, `docs/meeting-description.md`, `docs/development.md`, `RELEASE.md`):
  - Added a dedicated `Pre-meeting notes` field to the Add Meeting invite flow so organizers can call out reading, preparation, or action items attendees should complete before the meeting.
  - Updated invite-body composition so pre-meeting work is emitted as structured metadata in both text and HTML bodies near the top of the invitation instead of being buried in the generic details block.
  - Added regression coverage for the new textarea wiring and for the generated invite-body output.
  - Closes #920.
- Channel / reseller pricing-baseline alignment for issue `#500` (`MForce365.Web/Pages/PartnerAdministration.razor`, `MForce365.Web/Pages/PartnerAdministration.razor.cs`, `MForce365.Web.Tests/PartnerAdministrationPageTests.cs`, `docs/partners.md`, `docs/reseller-pack.md`, `docs/development.md`, `RELEASE.md`):
  - Updated `/admin/partners` to mirror the shared `Team`, `Professional`, and `Enterprise` pricing tiers so reseller and channel conversations start from the same shipped baseline used by `/admin/licensing`.
  - Reinforced the commercial guardrail across the partner workspace and partner-facing documentation so margins, commissions, discounts, and negotiated reseller terms still stay outside the repository and outside browser-local storage.
  - Closes #500.
- Meeting organiser completion notifications for issue `#508` (`MForce365.Shared/ActionItemSourceContextMetadataFormatter.cs`, `MForce365.Shared/MeetingActionItemOrganizerNotification.cs`, `MForce365.Shared/MForceActionItems.cs`, `MForce365.Shared/MForceTask.cs`, `MForce365.Web/Components/AddActionItemDialog.razor.cs`, `MForce365.Web/Pages/ActionItem.razor.cs`, `MForce.Components.ActionItems/AddActionItem.razor.cs`, `MForce.Components.ActionItems/EditActionItem.razor.cs`, `MForce.Components.ActionItems/ActionItemsPicker.razor.cs`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor.cs`, `MForce365.Shared.Tests/ActionItemSourceContextMetadataFormatterTests.cs`, `MForce365.Shared.Tests/MeetingActionItemOrganizerNotificationTests.cs`, `MForce365.Shared.Tests/PlannerCreateDetailsPersistenceTests.cs`, `MForce.Components.ActionItems.Tests/EditActionItemCompletionNotificationTests.cs`, `MForce365.Web.Tests/ActionItemCompletionNotificationTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Meeting-originated action items now persist hidden source-context metadata, including the meeting organiser email, so completion flows can identify the organiser later without cluttering the editable task body.
  - Saving an existing action item from the standalone page or the shared edit dialog now sends a best-effort Graph mail to the meeting organiser only when that task newly transitions to `Completed`.
  - Meeting-linked planner tasks now write their description/details during create as well as update, which keeps the meeting source metadata available after reload instead of dropping it on initial planner task creation.
  - Closes #508.
- Seat-count pricing tiers for issue `#499` (`MForce365.Web/Services/LicensingPricingModel.cs`, `MForce365.Web/Pages/Licensing.razor`, `MForce365.Web/Pages/Licensing.razor.cs`, `MForce365.Web/Pages/Authentication.razor`, `MForce365.Web/Pages/Authentication.razor.cs`, `MForce365.Web.Tests/LicensingPageTests.cs`, `MForce365.Web.Tests/AuthenticationPageTests.cs`, `docs/authentication.md`, `docs/development.md`, `RELEASE.md`):
  - Added a shared browser-side pricing model so corporate seat counts now resolve consistently into `Team`, `Professional`, or `Enterprise` tiers with the matching baseline per-seat price.
  - Updated `/admin/licensing` to derive tier names and seat prices automatically from purchased seats, surface the agreed tier matrix, and keep direct seat edits normalized against current assignments.
  - Updated `/authentication/register` so corporate registration previews the derived pricing tier and per-seat price before the Microsoft sign-in handoff.
  - Kept the commercial guardrail intact by documenting that customer-specific discounts and approvals still stay outside the repository and outside the browser-local licensing model.
  - Closes #499.
- Dashboard upgrade CTA for issue `#491` (`MForce365.Web/Pages/Index.razor`, `MForce365.Web/Components/DashboardUpgradeCallout.razor`, `MForce365.Web/Components/DashboardUpgradeCallout.razor.cs`, `MForce365.Web/_Imports.razor`, `MForce365.Web.Tests/DashboardUpgradeCalloutTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Added a dedicated dashboard upgrade callout that points trial or freemium users at the existing `/admin/licensing` workspace instead of inventing a new purchase flow.
  - Tailored the callout copy from the stored registration intent so corporate sign-ups keep their requested seat context, and reused the existing welcome marker to show trial timing when it is available in the browser.
  - Hid the CTA when the current browser-local licensing workspace already contains a matching active user-license entry for the signed-in user.
  - Closes #491.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

## VERSION 1.4.234 Beta

- Meeting type taxonomy follow-up for issue `#474` (`MForce365.Shared/MeetingTypeMetadata.cs`, `MForce365.Shared/MForceAppointment.cs`, `MForce365.Shared/MForceMeeting.cs`, `MForce365.Shared/IMeeting.cs`, `MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce.Components.Schedule/AddAppointmentPage.razor.cs`, `MForce.Components.Schedule/MainSchedule.razor`, `MForce.Components.Schedule/ScheduleCard.razor.cs`, `MForce.Components.Schedule/AgendaTemplateCatalog.cs`, `MForce.Components/MeetingDecisionsCard.razor*`, `MForce.Components/AddDecision.razor*`, `MForce365.Web/Pages/Meeting.razor*`, `MForce365.Web/Pages/Project.razor.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingTypeCategoryTests.cs`, `MForce.Components.Schedule.Tests/AgendaTemplateCatalogTests.cs`, `MForce365.Shared.Tests/MeetingTypeMetadataTests.cs`, `MForce365.Shared.Tests/MForceMeetingMeetingTypeTests.cs`, `MForce365.Shared.Tests/MForceAppointmentComposeBodyTests.cs`, `MForce365.Web.Tests/BoardMeetingResolutionTerminologyTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Expanded the Add Meeting taxonomy with the education and cadence-specific options requested on the issue thread, including `Lecture`, `Training Session`, `Study Time`, `Group Work Session`, `Daily Huddle`, `Scrum`, and `Stand-up`.
  - Added shared meeting-type parsing so board meetings now preserve `MeetingType` into running meeting state and can relabel the meeting decision surfaces as `Resolutions` while continuing to reuse the existing vote-count support.
  - Added optional agenda starter templates for `Daily Huddle`, `Scrum Stand-up`, and `Board Meeting` so the new meeting types have matching agenda scaffolds without auto-binding agenda selection to the dropdown.
  - Closes #474.
- Meeting upload notification links for issue `#919` (`MForce.Components.Files/FileExplorer.razor.cs`, `MForce.Components.Files.Tests/FileExplorerUploadNotificationTests.cs`, `MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`, `MForce365.Web.Tests/MeetingParticipantUpdatesTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Updated the meeting-assets upload callback to pass the uploaded Microsoft Graph `DriveItem` records through to the meeting pages instead of only the file names.
  - Uploaded-file participant notifications now render direct OneDrive links when Graph provides a `WebUrl`, so attendees can open newly shared documents from the email instead of manually finding them in the meeting assets workspace.
  - Preserved the existing filename-only fallback when a browser link is not available from Graph.
  - Closes #919.
- Meeting participant update upload links for issue `#472` (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce365.Web/Pages/MeetingGuest.razor`, `MForce365.Web/Pages/QRCode.razor`, `MForce.Components.Files/FileExplorer.razor.cs`, `MForce365.Shared/MForceMeeting.cs`, `MForce365.Shared/IMeeting.cs`, `MForce365.Web/Pages/Project.razor.cs`, `MForce365.Web.Tests/MeetingParticipantUpdatesTests.cs`, `MForce365.Web.Tests/MeetingGuestQrCodeTests.cs`, `MForce365.Web.Tests/ProductionReadinessUxTests.cs`, `MForce.Components.Files.Tests/FileExplorerTests.cs`, `docs/development.md`, `RELEASE.md`):
  - Extended the existing meeting guest-share flow so organizers now generate an anonymous OneDrive edit link for a dedicated `Participant Updates` folder inside the meeting assets workspace.
  - Surfaced that upload link in both the QR/share dialog and the guest meeting page so someone who cannot attend can still upload files or notes for review without needing a new backend.
  - Added the `Participant Updates` folder to the meeting assets categories and persisted the upload-link metadata in meeting state so linked project capture views continue to carry the same share context.
  - Closes #472.
- Vertical terminology overrides for issue `#471` (`MForce365.Shared/AppConfiguration.cs`, `MForce365.Web/Services/TerminologyService.cs`, `MForce365.Web/Program.cs`, `MForce365.Web/wwwroot/appsettings.json`, `MForce365.Web/Shared/NavMenu.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Web/Pages/Index.razor`, `MForce365.Web/Pages/Projects.razor`, `MForce365.Web/Pages/MeetingNotes.razor`, `MForce365.Web/Pages/MeetingParticipants.razor`, `MForce365.Web/Pages/MeetingRecordings.razor`, `MForce365.Web/Pages/MeetingActionItems.razor`, `MForce365.Web/Pages/Project.razor`, `MForce365.Web/Pages/ProjectStatus.razor`, `MForce365.Web/Pages/ActionItems.razor`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Pages/AdminMeetingSettings.razor`, `MForce365.Web/Components/AddActionItemDialog.razor*`, `MForce365.Web.Tests/TerminologyServiceTests.cs`, `docs/development.md`, `docs/README.md`):
  - Added a config-backed `Terminology` section so the web client can relabel core `Meeting` and `Project` language for vertical-specific deployments without editing the shared `.resx` resources.
  - Introduced `TerminologyService`, which preserves the localized fallback terms by default and applies configured replacements across key navigation labels, headings, dashboard cards, and related composed descriptions.
  - Updated the meeting/project-facing web pages plus the action-item source labels, project-selection dialog, and meeting-settings administration headings so the renamed terminology stays consistent on the most visible web UI surfaces.
  - Added regression coverage for the replacement logic and for the wiring from configuration into the affected Blazor pages.
  - Closes #471.
- Action-item reminder lead time for issue `#473` (`MForce365.Shared/MForceTask.cs`, `MForce365.Shared/MForceActionItems.cs`, `MForce365.Shared/mForce365Strings.resx`, `MForce365.Web/Pages/ActionItem.razor`, `MForce365.Web/Pages/ActionItem.razor.cs`, `MForce365.Web/Pages/ActionItems.razor`, `MForce365.Web/Components/AddActionItemDialog.razor`, `MForce365.Web/Components/AddActionItemDialog.razor.cs`, `MForce.Components.ActionItems/AddActionItem.razor`, `MForce.Components.ActionItems/AddActionItem.razor.cs`, `MForce.Components.ActionItems/EditActionItem.razor`, `MForce.Components.ActionItems/EditActionItem.razor.cs`, `MForce.Components.ActionItems/ActionItemsCard.razor`, `MForce.Components.ActionItems/ActionItemsCard.razor.cs`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor.cs`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor.css`, `MForce365.Shared.Tests/MForceTaskReminderTests.cs`, `MForce365.Shared.Tests/TodoReminderPayloadTests.cs`, `MForce365.Web.Tests/ActionItemReminderUiTests.cs`, `MForce.Components.ActionItems.Tests/ActionItemReminderUiTests.cs`, `MForce.Components.ActionItems/README.md`, `docs/development.md`, `RELEASE.md`):
  - Added a configurable `Reminder / amber state` picker to the To-Do action-item create/edit flows, with a one-day default and fixed lead-time options for common reminder windows.
  - Persisted the selected lead time through Microsoft To-Do reminder fields and reused the same shared helper to color upcoming tasks amber and overdue tasks red across the main action-item views.
  - Kept Planner-backed action items on the default one-day amber window because Planner tasks do not expose equivalent reminder metadata in this client.
  - Closes #473.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.233 Beta

- Meeting invite invitation details for issue `#449` (`MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce.Components.Schedule/AddAppointmentPage.razor.cs`, `MForce365.Shared/MForceAppointment.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingMetadataTests.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingTypeCategoryTests.cs`, `MForce365.Shared.Tests/MForceAppointmentComposeBodyTests.cs`, `docs/meeting-description.md`, `docs/development.md`):
  - Added a dedicated `Decisions to be made` field to the Add Meeting flow so organizers can set the decision-prep context directly in the invite instead of burying it in the general details block.
  - Extended the meeting access options with an explicit `Zoom meeting` mode and an `Audio / video details` field for non-Teams invites while keeping the existing Teams and internal-room flows intact.
  - Updated invite-body composition so decision-prep notes and audio/video access details are carried into the saved Graph event body with the same structured heading style as the other meeting metadata.
  - Closes #449.
- Meeting settings administration for issue `#446` (`MForce365.Web/Pages/AdminMeetingSettings.razor`, `MForce365.Web/Pages/Administration.razor`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Web.Tests/AdministrationFeatureTests.cs`, `MForce365.Web.Tests/MeetingSettingsAdministrationPageTests.cs`, `MForce365.Web.Tests/MeetingSettingsOpenAiKeyTests.cs`, `docs/administration.md`, `docs/development.md`, `RELEASE.md`):
  - Added a dedicated `/admin/meeting-settings` workspace for meeting behavior toggles, Meeting Binder branding, and browser-local OpenAI key management.
  - Simplified the general `/settings` page into an administration launch surface with a new `Open meeting settings admin` entry point while keeping feature toggles in place.
  - Updated the `/admin` hub so its meeting-settings card now opens the dedicated admin route instead of sending admins back through the general settings surface.
  - Mapped `/admin/meeting-settings` into the existing Settings / Administration navigation handling and added regression coverage for the new route and moved OpenAI controls.
  - Closes #446.
- Scheduler merged shared-calendar overlays for issue `#447` (`MForce.Components.Schedule/MainSchedule.razor`, `MForce.Components.Schedule/MainSchedule.razor.css`, `MForce.Components.Schedule/ScheduleFunctions.cs`, `MForce365.Shared/MForceAppointment.cs`, `MForce.Components.Schedule.Tests/MainScheduleMergedScheduleTests.cs`, `MForce.Components.Schedule.Tests/ScheduleFunctionsTests.cs`, `docs/development.md`):
  - The main `/scheduler` view now accepts multiple comma-, semicolon-, or line-separated email addresses so users can overlay shared schedules directly on the same calendar.
  - Additional schedules load through Microsoft Graph `me/calendar/getSchedule` and render as read-only blocks, which keeps the signed-in user's own meetings editable while preventing accidental navigation or drag-resize changes on merged overlays.
  - Added regression coverage for the new scheduler controls, read-only merged-block behavior, and the `getSchedule` request shape.
  - Closes #447.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.232 Beta

- Partner administration workspace (`MForce365.Web/Pages/Administration.razor`, `MForce365.Web/Pages/PartnerAdministration.razor`, `MForce365.Web/Pages/PartnerAdministration.razor.cs`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Web.Tests/AdministrationFeatureTests.cs`, `MForce365.Web.Tests/PartnerAdministrationPageTests.cs`, `docs/administration.md`, `docs/partners.md`, `docs/README.md`, `docs/development.md`):
  - Added a dedicated `/admin/partners` administration workspace so the old Administration: Partners backlog item now maps to a concrete internal web surface instead of only the public-facing CRMme partner hub.
  - Kept the workspace browser-local, using `mforce_partner_admin_v1`, so it matches the app's existing lightweight administration pattern without implying a shipped server-backed partner portal or CRM integration.
  - Added Settings entry points for `Open partner admin` and `Open partner hub`, mapped `/admin/partners` into the existing Settings navigation state, and wired the new `/admin` hub to open the partner administration workspace rather than the public partner page.
  - Closes #444.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.231 Beta

- Administration agendas entry point for issue `#445` (`MForce365.Web/Pages/AdminAgendas.razor`, `MForce365.Web/Pages/Administration.razor`, `MForce365.Web.Tests/AdminAgendasPageTests.cs`, `MForce365.Web.Tests/AdministrationFeatureTests.cs`, `docs/administration.md`, `docs/development.md`):
  - Added a dedicated `/admin/agendas` page that reuses the existing agenda CRUD workflow inside the administration layout.
  - Updated the administration hub so its agendas card now opens the dedicated admin route instead of the standard `/agendas` page.
  - Kept agenda template storage in the signed-in user's OneDrive `mForce365/Agendas` folder and documented that the admin route does not add a second persistence model.
  - Closes #445.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.230 Beta

- Registration seat-scale guidance follow-up for issue `#422` (`MForce365.Web/Pages/Authentication.razor`, `MForce365.Web.Tests/AuthenticationPageTests.cs`, `docs/development.md`):
  - Clarified the bounded corporate-seat helper text on `/authentication/register` so the UI no longer implies unsupported seat counts outside the 1-to-250 slider range.
  - Updated the registration source-assertion test to lock the corrected helper guidance in place.
  - Kept the developer documentation aligned with the shipped behavior by noting that the requested seat count can still be adjusted later in licensing administration.
  - Refs #422.
- Validation:
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --disable-build-servers -maxcpucount:1 --blame-hang --blame-hang-timeout 5m -v minimal`

## VERSION 1.4.229 Beta

- Administration hub for issue `#442` (`MForce365.Web/Pages/Administration.razor`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Web.Tests/AdministrationFeatureTests.cs`, `MForce365.Web.Tests/LicensingPageTests.cs`, `docs/administration.md`, `docs/README.md`, `docs/development.md`):
  - Added a dedicated `/admin` page that acts as a single administration entry point for the existing licensing, partners, agendas, and meeting settings surfaces in the Blazor WebAssembly client.
  - Wired the existing `Administration` configuration flag into the main navigation so the hub can be surfaced explicitly without inventing a second set of admin-specific CRUD screens.
  - Added an `Open administration` action in Settings and kept the hub intentionally lightweight by routing disabled feature areas back to Settings for enablement.
  - Refs #442.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.228 Beta

- Connecting Up special-customer licensing tracking (`MForce365.Web/Pages/Licensing.razor`, `MForce365.Web/Pages/Licensing.razor.cs`, `MForce365.Web.Tests/LicensingPageTests.cs`, `docs/development.md`, `docs/reseller-pack.md`):
  - Organization licensing records now capture acquisition channel and customer type so special-customer programs can be tracked directly from `/admin/licensing`.
  - The licensing workspace now includes explicit `Connecting Up` tagging for eligible organizations without inventing a server-side billing or marketplace integration.
  - Added a browser-local program summary callout so billing admins can see how many organizations are currently managed through the Connecting Up special-customer path.
  - Refs #428.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.227 Beta

- Enterprise registration seat-scale cleanup for issue `#429` (`MForce365.Web/Pages/Authentication.razor`, `MForce365.Web/Pages/Authentication.razor.cs`, `MForce365.Web.Tests/AuthenticationPageTests.cs`, `docs/authentication.md`, `docs/development.md`, `RELEASE.md`):
  - Fixed the registration code-behind constants so the bounded corporate seat slider compiles correctly and clamps persisted browser-local seat requests between 1 and 250 seats.
  - Updated the register-page guidance and documentation to describe the bounded 1-to-250 enterprise seat range consistently.
  - Extended the authentication page file-content tests to assert both slider bounds and clamp logic markers.
  - Closes #429.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.226 Beta

- Registration licensing options (`MForce365.Web/Pages/Authentication.razor`, `MForce365.Web/Pages/Authentication.razor.cs`, `MForce365.Web.Tests/AuthenticationPageTests.cs`, `docs/authentication.md`, `docs/development.md`):
  - `/authentication/register` now lets new users choose between an individual and a corporate license path before continuing to Microsoft sign-in.
  - Corporate registration captures a requested seat count, and the registration intent is stored in browser `localStorage` under `mforce_registration_intent_v1` so the choice persists through the same-browser Microsoft sign-in handoff.
  - The Microsoft-account guidance for Outlook.com, Hotmail, Live, and Gmail-on-Microsoft-account onboarding remains unchanged.
  - Closes #424.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.225 Beta

- Outlook add-in meeting form for issue `#338` (`MForce.Components.Schedule/AddAppointmentPage.razor.cs`, `MForce365.Web/Pages/OutlookAddinCreateMeeting.razor`, `MForce365.Web/Pages/OutlookAddin.razor`, `MForce365.Web.Tests/OutlookAddinCreateMeetingPageTests.cs`, `MForce365.Web/Shared/OutlookAddinLayout.razor`, `outlook/mforce365-outlook-addin-manifest.xml`, `docs/outlook-addin.md`, `docs/development.md`):
  - The Outlook add-in manifest now opens a dedicated standalone meeting page inside the task pane instead of only landing on the scaffold overview route.
  - The add-in now hosts the existing Add Meeting workflow directly, using a standalone page mode that avoids dialog-close semantics and reports save/cancel events back to the page.
  - Saving from the add-in still creates a fresh Microsoft Graph event rather than mutating the active Outlook compose draft, and the page now states that limitation explicitly in the UI.
  - Refs #338.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.224 Beta
- Registration licensing options (`MForce365.Web/Pages/Authentication.razor`, `MForce365.Web/Pages/Authentication.razor.cs`, `MForce365.Web.Tests/AuthenticationPageTests.cs`, `docs/authentication.md`, `docs/development.md`):
  - `/authentication/register` now lets new users choose between an individual and a corporate license path before continuing to Microsoft sign-in.
  - Corporate registration captures a requested seat count for team purchasing, and the selection is saved in browser `localStorage` under `mforce_registration_intent_v1` so the choice persists through the same-browser Microsoft sign-in handoff.
  - Corporate registration now uses a bounded enterprise seat slider so teams can request corporate scale directly before handoff into Microsoft sign-in.
  - Refs #425.
- Validation:
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true`

## VERSION 1.4.223 Beta

- Personal-use appointment categories (`MForce.Components.Schedule/AddAppointmentPage.razor`, `MForce.Components.Schedule/AddAppointmentPage.razor.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingMetadataTests.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingTypeCategoryTests.cs`, `docs/development.md`):
  - The Add Meeting dialog now labels its taxonomy as `Meeting or appointment` so the same scheduler flow works for personal commitments as well as formal meetings.
  - Added personal/lifestyle appointment options such as personal appointments, after-school or after-work activities, weekend plans, and wellbeing appointments to the existing category/type dropdowns.
  - Added a task-focused category for personal productivity and action-item planning sessions without changing the existing event storage model or client-specific metadata behavior.
  - Closes #420.

- Localized meeting summary send (`MForce.Components/SendList.razor`, `MForce.Components/SendList.razor.cs`, `MForce365.Shared/AttendeeSendList.cs`, `MForce365.Shared/MeetingSummary.cs`, `MForce365.Shared/MeetingSummaryLanguageCatalog.cs`, `MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`, `MForce365.Shared/mForce365Strings.resx`, `MForce365.Shared.Tests/MeetingSummaryTests.cs`, `docs/development.md`):
  - The send-summary dialog now captures a summary language per recipient using the set of languages already shipped in `mForce365Strings` resources.
  - Meeting summary emails now localize generated labels and section headings, and they format dates, times, and duration against the selected recipient language while leaving user-authored meeting content unchanged.
  - Added shared regression coverage for explicit language selection and parent-culture fallback behavior so variants like `fr-CA` resolve to the nearest shipped language.
  - Closes #416.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

- Advanced meeting-notes AI prompt handoff (`MForce365.Shared/MeetingNotesAiPromptBuilder.cs`, `MForce.Components.Schedule/MeetingNotesCard.razor*`, `MForce365.Web/wwwroot/MForce365.js`, `docs/development.md`):
  - Added an `AI prompt` action to the meeting notes card that builds a ChatGPT-ready prompt from the current meeting metadata, pre-meeting notes, captured notes, timeline items, agenda, action items, and parking-lot entries.
  - The prompt is copied to the clipboard when the browser allows it and is also shown in an in-app fallback panel so users can still copy it manually if clipboard permissions are blocked.
  - Kept the feature as a prompt-handoff flow instead of a direct OpenAI API call because the current Blazor WebAssembly app does not provide a secure server boundary for protecting third-party API secrets.
  - Added regression coverage in `MForce365.Shared.Tests/MeetingNotesAiPromptBuilderTests.cs` and `MForce365.Web.Tests/MeetingNotesAiPromptTests.cs`.
  - Closes #405.

## VERSION 1.4.222 Beta

- Outlook add-in scaffold for issue `#338` (`MForce365.Web/Pages/OutlookAddin.razor`, `MForce365.Web/Shared/OutlookAddinLayout.razor`, `outlook/mforce365-outlook-addin-manifest.xml`, `docs/outlook-addin.md`, `docs/development.md`):
  - Added a dedicated `/outlook-addin` task-pane route inside the existing Blazor WebAssembly app so the repository now contains a concrete Outlook sidecar entry point instead of only issue discussion.
  - Added an add-in-only Outlook manifest for appointment-organizer compose surfaces that opens the task pane against the current local web host at `https://localhost:5204/outlook-addin`.
  - Kept the scaffold explicit about current limits: it provides the Outlook task-pane shell and sideloadable manifest, but it does not yet write directly into the active Outlook compose item.
  - Refs #338.

- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`
## VERSION 1.4.221 Beta

- Jira reporting solution brief (`MForce365.Web/Pages/JiraReportingSolution.razor`, `MForce365.Web/Shared/PublicLayout.razor`, `MForce.Components/PreLoginHomePage.razor`, `docs/jira-reporting-solution.md`, `docs/README.md`, `docs/development.md`):
  - Added a public route-backed Jira reporting solution brief at `/jira-reporting` and `/jira-enhancement` so issue #371 is represented by a concrete web surface inside the existing Blazor WebAssembly app.
  - Framed the request around executive summaries, program health checks, six-month sprint outlooks, and meeting-ready follow-up while explicitly avoiding unsupported claims about a shipped Jira Marketplace add-on or live Atlassian sync.
  - Added public entry points from the landing page and public layout so the brief can be shared without creating a second application shell.
  - Closes #371.
- Tests:
  - Added `MForce365.Web.Tests/JiraReportingSolutionPageTests.cs`.
  - Added `MForce365.Web.Tests/PreLoginJiraReportingLinkTests.cs`.
  - Added `MForce365.Web.Tests/JiraReportingDocumentationTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.220 Beta

- Meeting conferencing-link support (`MForce.Components.Schedule/AddAppointmentPage*`, `MForce365.Shared/MForceAppointment.cs`, `MForce365.Shared/MeetingJoinUrlHelper.cs`, `MForce.Components.Schedule/MainSchedule.razor`, `MForce.Components.Schedule/ScheduleCard.razor.cs`, `MForce365.Web/Pages/Meeting.razor.cs`, `MForce365.Shared.Tests/MeetingJoinUrlHelperTests.cs`, `MForce365.Shared.Tests/MForceAppointmentComposeBodyTests.cs`, `MForce.Components.Schedule.Tests/AddAppointmentMeetingMetadataTests.cs`, `MForce.Components.Schedule.Tests/SchedulerJoinButtonTests.cs`, `MForce365.Web.Tests/MeetingOnlineMeetingDetailsTests.cs`, `docs/meeting-description.md`, `docs/development.md`):
  - Add Meeting now exposes an optional `Conferencing link` field for non-Teams meetings so facilitators can paste Zoom or other video-call URLs directly into the invite flow.
  - Saved conferencing links are written into the invite body as structured `Join link` metadata, making the link durable in Microsoft Graph even when the meeting is not a native Teams online meeting.
  - Scheduler cards and the Meeting page now resolve join links through a shared helper, so existing Join buttons work consistently for Graph-provided Teams links, saved custom links, and legacy Teams URLs already embedded in invite bodies.
  - The Meeting page now labels common non-Teams providers such as Zoom, Google Meet, and Webex when a recognized join URL is present.
  - Refs #338.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.219 Beta

- Teams chat action-item draft capture (`MForce365.Web/Pages/ActionItem.razor`, `MForce365.Web/Pages/ActionItem.razor.cs`, `MForce365.Web.Tests/ActionItemShareTargetTests.cs`, `MForce365.Web.Tests/ActionItemSharedDraftDefaultsTests.cs`, `MForce365.Shared/mForce365Strings.resx`, `docs/development.md`):
  - Shared action-item drafts now turn the first non-empty shared text line into the task title when a browser or PWA share only supplies message text, while preserving the remaining message body formatting so copied Teams chat snippets stay readable.
  - The standalone action-item create page now shows a localized review banner when a draft arrived from Teams or another app so users know to confirm the details and due date before saving.
  - Added unit tests for shared-draft parsing, preserved paragraph spacing, and the localized review banner so the Teams-chat capture flow stays covered.
  - Closes #355.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.218 Beta

- Project review meeting capture sidecar (`MForce365.Web/Pages/Project.razor*`, `MForce.Components.ActionItems/MeetingParkingLot*`, `MForce.Components.Projects/MeetingProjectCard.razor.cs`, `MForce365.Shared/mForce365Strings.resx`, `docs/development.md`, `docs/projects.md`):
  - Added a meeting-capture sidecar on the Project page so linked meeting notes, action items, decisions, and parking-lot topics stay available while reviewing the associated Planner board.
  - The Project page now restores meeting capture context from the meeting route via query-backed meeting state (`meetingId` and `meetingFolderId`) and saves updates back to the existing `thisMeeting.meetingv1` file.
  - Added a dedicated Parking Lot card/editor backed by the existing `IMeeting.ParkingLot` model so parking-lot topics can be captured, edited, and included in binder output without introducing a new storage model.
  - Closes #321.
- Tests:
  - Added `MForce365.Web.Tests/ProjectMeetingCaptureSidecarTests.cs`.
  - Added `MForce.Components.ActionItems.Tests/MeetingParkingLotCardTests.cs`.
  - Updated `MForce.Components.Projects.Tests/MeetingProjectCardTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

## VERSION 1.4.222 Beta

- Meeting assets localized document variants (`MForce.Components.Files/FileExplorer.razor`, `FileExplorer.razor.cs`, `FileExplorer.razor.css`, `MForce.Components.Files.Tests/FileExplorerTests.cs`, `MForce365.Shared/mForce365Strings.resx`, `docs/development.md`):
  - Meeting assets now group translated copies of the same uploaded document when Microsoft 365 translation appends an ISO language suffix to the file name, reducing duplicate cards in the file grid.
  - When a translated copy matches the current user's UI culture, the file card now surfaces an `Open local language` action first while still keeping the original document and any other translated copies available as explicit choices.
  - Added regression coverage for language-variant grouping and for avoiding false positives on non-language suffixes such as version tags.
  - Closes #415.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.217 Beta

- Planner task notes in projects and action items (`MForce365.Shared/PlannerTaskDetailsGraphHelper.cs`, `MForce365.Shared/MForceActionItems.cs`, `MForce365.Shared/MForceTask.cs`, `MForce.Components.ActionItems/EditActionItem.razor.cs`, `MForce365.Web/Pages/Project.razor.cs`, `docs/projects.md`, `docs/development.md`):
  - Planner-backed tasks now hydrate `PlannerTaskDetails.Description` before they are shown in mForce365 action-item surfaces, so project notes no longer disappear when a Planner task is opened from the app.
  - Saving a Planner-backed action item now patches both the task and its details resource with the correct ETags, allowing note edits to round-trip safely back to Microsoft Planner.
  - The Project board now loads each task's Planner details before rendering cards, so task descriptions/notes show up consistently there as well.
  - Added regression coverage in `MForce365.Shared.Tests/LoadItemsPagingTests.cs`, `MForce365.Shared.Tests/PlannerUpdateEtagTests.cs`, `MForce365.Shared.Tests/MForceTaskSourceContextTests.cs`, `MForce.Components.ActionItems.Tests/EditActionItemPlannerSaveTests.cs`, and `MForce365.Web.Tests/ProjectTaskDetailsHydrationTests.cs`.
  - Closes #327.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`
## VERSION 1.4.216 Beta

- Advanced People Solution public page (`MForce365.Web/Pages/AdvancedPeopleSolution.razor`, `MForce365.Web/Shared/PublicLayout.razor`, `MForce.Components/PreLoginHomePage.razor`, `docs/advanced-people-solution.md`):
  - Added a public route-backed solution brief at `/advanced-people-solution` and `/people-solution` so issue #324 is represented by a concrete site surface inside the existing Blazor WebAssembly app.
  - Kept the page grounded in internal-first resourcing, Microsoft 365 alignment, and explicit HR/privacy guardrails instead of claiming a fully implemented people-search or third-party profile-sync product.
  - Added public entry points from the public layout and pre-login landing page so the solution can be shared without creating a separate application shell.
  - Closes #324.
- Tests:
  - Added `MForce365.Web.Tests/AdvancedPeopleSolutionPageTests.cs`.
  - Added `MForce365.Web.Tests/PreLoginAdvancedPeopleLinkTests.cs`.
  - Added `MForce365.Web.Tests/PublicLayoutNavigationTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true -v minimal`
## VERSION 1.4.215 Beta

- Product walkthrough video documentation (`docs/product-walkthrough-video.md`, `docs/README.md`, `docs/development.md`, `docs/training-video-plan.md`, `docs/social-media-strategy.md`):
  - Added a repository-backed brief for the flagship mForce365 walkthrough video so the original request in issue #233 now maps to a concrete, maintainable storyboard instead of a sparse backlog note and external example link.
  - Defined the objective, target audience, required proof points, recommended runtime, segment-by-segment structure, narration spine, and production guardrails using only shipped product behavior already documented in the repo.
  - Linked the new brief into the documentation index and the existing training-video/social-media guidance so future website, tutorial, and collateral updates stay aligned.
  - Closes #233.
- Tests:
  - Added `MForce365.Web.Tests/ProductWalkthroughDocumentationTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.214 Beta

- CRMme partner surface (`MForce365.Web/Pages/Partners.razor`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Shared/AppConfiguration.cs`, `MForce365.Web.Tests/PartnersFeatureTests.cs`, `docs/partners.md`, `docs/README.md`, `docs/development.md`):
  - Turned the dormant `Partners` feature into an opt-in web-app partner hub that introduces CRMme as a separately purchased companion service and makes it reachable from Settings and the main sidebar.
  - Added a lightweight feature-toggle change notification so the sidebar updates immediately when the Partners toggle is changed instead of waiting for a navigation refresh.
  - Documented the intentional scope guardrail that this release adds discovery and positioning only and does not enable automatic data sync between mForce365 and CRMme.
  - Closes #211.
- Validation:
  - `dotnet build MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.213 Beta

- Project deliverables imported into meeting action items (`MForce.Components.Projects/ProjectChooser.razor.cs`, `MForce.Components.Projects.Tests/ProjectChooserTests.cs`, `docs/projects.md`, `docs/development.md`):
  - Linking a meeting to a Planner-backed project now loads the project tasks before the meeting save notification runs, so imported deliverables persist with the meeting instead of being added only in-memory.
  - Re-selecting a project replaces stale project-derived action items for the old/current linked project instead of duplicating them in the meeting action-item list.
  - Empty project selections are ignored, and Planner import failures now keep the project link saved while surfacing an inline retry error.
  - Imported project tasks now retain explicit project source context, and tests cover deduplication, replacement, and notify ordering.
  - Closes #320.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.212 Beta

- Marketing materials documentation (`docs/marketing-materials.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed marketing-materials guide that translates the sticker, business-card, and USB leave-behind idea from issue #257 into maintained collateral guidance.
  - Mapped each format to the existing repo-backed sales and partner documents, documented audience-specific USB contents, and kept print-vendor assets, pricing, contact lists, and distributable binaries out of source control.
  - Closes #257.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.211 Beta

- Meeting solutions comparison landing page (`MForce365.Web/Pages/Comparison.razor`, `MForce365.Web/Shared/PublicLayout.razor`, `MForce.Components/PreLoginHomePage.razor`, `docs/meeting-solutions-comparison.md`):
  - Added a public comparison-focused landing page at `/compare` and `/meeting-solutions-comparison` so issue #232 is now represented by a concrete route-ready site surface inside the existing Blazor WebAssembly app.
  - Used a dedicated public layout and a new pre-login teaser entry point so the comparison experience can be promoted behind `meetingsforteams.com` without creating a second application or duplicating public-site content.
  - Grounded the copy in category-based alternatives and shipped mForce365 capabilities to keep the positioning strong without relying on unsupported vendor-by-vendor claims.
  - Closes #232.
- Tests:
  - Added `MForce365.Web.Tests/ComparisonPageTests.cs`.
  - Added `MForce365.Web.Tests/PreLoginComparisonLinkTests.cs`.
- Validation:
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`

## VERSION 1.4.210 Beta

- Handwriting-friendly notes and action-item entry (`MForce.Components.Schedule/MeetingNotesCard.razor*`, `MForce.Components.ActionItems/AddActionItem.razor*`, `MForce365.Web/Components/AddActionItemDialog.razor`, `MForce365.Web/Pages/ActionItem.razor`, `MForce.Components.ActionItems/EditActionItem.razor`, `MForce365.Shared/HandwritingTextFormatter.cs`):
  - Added explicit handwriting entry modes for the meeting notes rich editor and the legacy add-action-item rich editor so touch and pen users can write into native text fields and have the content converted back into the app's stored note/task format on save.
  - Tightened the standalone and dialog-based action-item forms with native text-input attributes so device handwriting keyboards and pen panels are usable across title, client, and details fields without introducing browser-specific dependencies.
  - Added shared conversion coverage plus markup regression checks to keep the handwriting path wired into the meeting notes and action-item editors.
  - Closes #204.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.209 Beta

- Sales data sheet documentation (`docs/sales-data-sheet.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed mForce365 data sheet that summarizes product fit, Microsoft 365 alignment, key capabilities, and rollout guidance in a concise customer-facing format.
  - Documented how to keep the data sheet public-safe and aligned with the existing battlecard and sales-deck collateral as the product evolves.
  - Closes #186.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.208 Beta

- Training video documentation (`docs/training-video-plan.md`, `docs/README.md`, `docs/development.md`, `docs/social-media-strategy.md`):
  - Added a repository-native training-video plan that answers the original backlog question with a recommended set of tutorial types, launch count, target duration, reuse guidance, and update triggers tied to the current mForce365 product surface.
  - Linked the plan from the documentation index, added developer guidance for keeping tutorial planning aligned with future workflow changes, and connected the existing social/tutorial documentation to the new source of truth.
  - Closes #187.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.207 Beta

- Sales deck documentation (`docs/sales-slide-deck-1-page.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed one-page sales deck outline for mForce365 so the issue now has a concise customer-facing leave-behind in source control despite the issue itself containing no detailed attachment or brief.
  - Documented how the one-page version relates to the existing 3-page, 15-slide, and 30-slide deck variants so future messaging updates stay aligned with shipped meeting, project, binder, and Microsoft 365 capabilities.
  - Closes #183.
- Validation:
  - `dotnet build MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.206 Beta

- Reseller pack documentation (`docs/reseller-pack.md`, `docs/README.md`, `docs/development.md`):
  - Replaced the stale reseller/channel placeholder issue with a repository-native reseller pack guide that maps each requested artifact to maintained documentation or an explicit off-repo source of truth.
  - Added public-safe reseller benefits, partner onboarding/admin prerequisites, and proposal/RFP source-document guidance while keeping legal, commercial, and customer-specific material out of source control.
  - Closes #192.
- Validation:
  - `dotnet build MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipInvalidConfigurations=true -p:SkipMauiWorkloadValidation=true --no-build -v minimal`
## VERSION 1.4.205 Beta

- Sales battlecard documentation (`docs/sales-battlecard.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-native sales battlecard that summarizes buyer fit, pain signals, product differentiators, qualification questions, objection handling, and a recommended demo path for the current mForce365 feature set.
  - Linked the battlecard from the documentation index and added developer guidance for keeping sales collateral public-safe and aligned with future product changes.
  - Closes #184.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.204 Beta

- Sales deck documentation (`docs/sales-slide-deck-3-page.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed 3-page sales deck outline for mForce365 so concise customer-facing presentation copy now lives in source control as maintainable Markdown.
  - Documented how to keep future revisions aligned with the full 30-slide deck, the 15-slide cut-down deck, and shipped meeting, project, binder, and Microsoft 365 capabilities while keeping customer-specific details out of the repository.
  - Closes #182.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true`

## VERSION 1.4.203 Beta

- Sales deck documentation (`docs/sales-slide-deck.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed 30-slide sales deck outline for mForce365 so customer-facing presentation copy now lives in source control as maintainable Markdown instead of being trapped in an unavailable issue attachment.
  - Documented how to keep future deck revisions aligned with shipped meeting, project, binder, and Microsoft 365 capabilities while keeping customer-specific data out of the repository.
  - Closes #180.
- Validation:
  - `dotnet build MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`

## VERSION 1.4.202 Beta

- Sales deck documentation (`docs/sales-slide-deck-15.md`, `docs/README.md`, `docs/development.md`):
  - Added a repository-backed 15-slide cut-down sales deck outline for mForce365 so concise customer-facing presentation copy now lives in source control instead of being implied by the sparse issue text.
  - Documented how to keep future deck revisions aligned with shipped meeting, project, binder, and Microsoft 365 capabilities while keeping customer-specific data out of the repository.
  - Closes #181.
- Validation:
  - `dotnet build MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`

## VERSION 1.4.201 Beta

- Decision vote counts (`MForce.Components/AddDecision.razor`, `MForce.Components/MeetingDecisionsCard.razor*`, `MForce365.Shared/MForceMeeting.cs`, `MForce365.Shared/MeetingBinder.cs`, `MForce365.Web/Pages/Meeting.razor.cs`):
  - Added optional agreed/rejected vote counts to meeting decisions so formal outcomes can be recorded against each decision without changing existing meeting flows.
  - Surfaced recorded vote tallies in the decision dialog, decision list, structured meeting notes, and meeting binder export when counts are present.
  - Closes #176.
- Tests:
  - Updated `MForce365.Web.Tests/AddDecisionInputsExistTests.cs`.
  - Updated `MForce365.Web.Tests/MeetingNotesFormattingTests.cs`.
  - Updated `MForce365.Shared.Tests/MeetingBinderBuilderTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal`
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal`

## VERSION 1.4.200 Beta

- Social media strategy documentation (`docs/social-media-strategy.md`, `docs/README.md`, `docs/development.md`):
  - Replaced the outdated 2021 issue attachment with a repo-native strategy document that records the current owned channels, content pillars, approval flow, reporting expectations, and paid-vs-organic guidance.
  - Captured the public destinations already referenced in the product and docs, including the website, blog, tutorial page, support page, and social-footer links used by the in-app communication flow.
  - Added developer guidance to keep the strategy document and `MForce365.Web/Services/WelcomeCommunicationService.cs` social links in sync.
  - Closes #174.
- Validation:
  - `dotnet build MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`

## VERSION 1.4.199 Beta

- Six-month "We've listened" communication (`MForce365.Web/App.razor`, `MForce365.Web/Shared/WeveListenedCommunicationBootstrapper.razor`, `MForce365.Web/Services/WeveListenedCommunicationService.cs`, `docs/authentication.md`, `docs/development.md`):
  - Added a one-time product update email for authenticated users using the existing Microsoft Graph delegated `Mail.Send` flow in the WebAssembly client.
  - The message greets the signed-in user by first name when profile data is available and summarizes recent improvements across meeting preparation, execution, recordings, binders, follow-up, and onboarding.
  - Delivery is best-effort and browser-local deduplication is tracked under `mforce_weve_listened_email_2026_h1_v1:{stable-user-key}` with the same hashed fallback and pending-marker safeguards used by the existing welcome/trial communications.
  - Closes #86.
- Tests:
  - Added `MForce365.Web.Tests/WeveListenedCommunicationTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true` (all tests passing)

## VERSION 1.4.198 Beta

- New-user 15-day follow-up email (`MForce365.Web/Pages/Index.razor`, `MForce365.Web/Program.cs`, `MForce365.Web/Services/NewUserFollowUpService.cs`):
  - Added a dashboard-triggered follow-up flow that records each authenticated user's first seen timestamp in browser `localStorage`.
  - After 15 days, mForce365 now sends the user a one-time Microsoft Graph self-email with product tips plus a simple activity snapshot covering meetings since first visit, current action items, and current Planner projects.
  - The follow-up email now uses a short-lived browser send lock so multiple open dashboard tabs do not send duplicate messages for the same user.
  - When no activity is detected, the follow-up email now explicitly offers a 1-1 onboarding contact path via `andrew@makemeetingsmatter.com`.
  - The follow-up state is stored per user under `mforce_new_user_follow_up:{email}` so the message is only sent once for that browser/user combination.
  - Closes #82.
- Tests:
  - Added `MForce365.Web.Tests/DashboardNewUserFollowUpTests.cs`.
  - Added `MForce365.Web.Tests/NewUserFollowUpServiceTests.cs`.
- Validation:
  - `dotnet test MForce365/MForce365.sln -warnaserror /p:SkipInvalidConfigurations=true` (all tests passing)

## VERSION 1.4.197 Beta

- Trial-end summary communication for new users (`MForce365.Web/Services/WelcomeCommunicationService.cs`, `MForce365.Web.Tests/TrialEndCommunicationServiceTests.cs`, `MForce365.Web.Tests/WelcomeCommunicationTests.cs`, `docs/authentication.md`, `docs/development.md`):
  - Extended the shared in-app trial communication service so authenticated users now receive the requested 29-day "trial expires tomorrow" email in the one-day window before the existing post-trial expiry follow-up.
  - The day-29 message reuses the browser-local welcome marker as the current trial-start anchor, stores its own dedup marker under `mforce_trial_end_email_v1:{stable-user-key}`, and uses the same pending-marker protection as the welcome and post-trial flows.
  - The email summarizes the last 30 days of the current user's Graph activity (meetings held, action items assigned, action items completed), links users to the in-app licensing page, and offers product-feedback options for the extra-trial path described in the issue.
  - Closes #83.
- Tests:
  - Added `MForce365.Web.Tests/TrialEndCommunicationServiceTests.cs`.
  - Expanded `MForce365.Web.Tests/WelcomeCommunicationTests.cs` to cover the new day-29 marker and subject alongside the existing welcome/post-trial communication coverage.
- Validation:
  - `dotnet build MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`

## VERSION 1.4.196 Beta

- Release/go-live process documentation (`PUBLISH.md`, `docs/development.md`):
  - Added advisory-board planning guidance for go-live readiness.
  - Documented that candidate names, contact details, and outreach notes must stay outside the repository in private planning tooling.
  - Captured the nomination workflow at a process level so the issue is represented in repo documentation without introducing personal data into source control.
  - Closes #162.
- Validation:
  - `dotnet test MForce365/MForce365.sln`
## VERSION 1.4.195 Beta

- Post-trial follow-up communication (`MForce365.Web/Services/WelcomeCommunicationService.cs`, `docs/authentication.md`, `docs/development.md`):
  - Extended the in-app communication service from #81 so authenticated users now receive the requested expired-trial offer email 40 days after the stored welcome-send timestamp, matching the 10-days-post-trial-completion timing in the current client-only trial model.
  - Added a dedicated browser-local marker under `mforce_post_trial_completion_email_v1:{stable-user-key}` so the follow-up offer is sent once per signed-in user per browser.
  - Hardened the shared communication dedup flow by using a non-PII stable storage key fallback plus short-lived pending markers before sends, which reduces duplicate delivery across concurrent tabs.
  - Closes #84.
- Tests:
  - Expanded `MForce365.Web.Tests/WelcomeCommunicationTests.cs` to cover timing, hashed fallback keys, pending-marker behavior, and the expired-trial offer copy.
- Validation:
  - `dotnet build MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true`

## VERSION 1.4.194 Beta

- Welcome communication for new users (`MForce365.Web/App.razor`, `MForce365.Web/Shared/WelcomeCommunicationBootstrapper.razor`, `MForce365.Web/Services/WelcomeCommunicationService.cs`, `docs/authentication.md`, `docs/development.md`):
  - Added a first-run welcome email for authenticated users using the existing Microsoft Graph delegated `Mail.Send` flow instead of introducing a separate Mailchimp integration in the WebAssembly client.
  - The welcome communication is sent once per signed-in user per browser and tracked in browser `localStorage` under the `mforce_welcome_email_v1:{stable-user-key}` key so routine navigation does not resend it.
  - Uses Microsoft Graph `/me` profile data to address the message to the current signed-in account and retries after failures rather than marking unsuccessful sends as complete.
  - Closes #81.
- Monthly updates communication surface (`MForce.Components/MonthlyUpdatesCallout.razor`, `MForce.Components/PreLoginHomePage.razor`, `MForce365.Web/Pages/Index.razor`):
  - Added a shared monthly-updates panel that surfaces current release notes, latest news/blog links, video tutorials, and support guidance from official mForce channels.
  - Rendered the panel on both the pre-login landing page and the authenticated dashboard so all users have a consistent place to check monthly product updates and tips.
  - Closes #85.
- Tests:
  - Added `MForce365.Web.Tests/WelcomeCommunicationTests.cs`.
  - Added `MForce365.Web.Tests/MonthlyUpdatesCalloutTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln` (all tests passing)

## VERSION 1.4.193 Beta

- Licensing administration (`MForce365.Web/Pages/Licensing.razor`, `Licensing.razor.cs`, `MForce365.Web/Pages/Settings.razor`, `MForce365.Web/Shared/MainLayout.razor`, `MForce365.Shared/AppConfiguration.cs`):
  - Replaced the dead `Organizations` placeholder with a functional `Licensing` admin workspace at `/admin/licensing`.
  - Added per-organization licensing management for seat counts, billing admins, renewal dates, monthly spend, and usage visibility.
  - Added per-user licensing management alongside invoice and billing-profile views so admins can review individual and organization-backed licensing in one place.
  - Added a Settings entry point for the licensing workspace and mapped `/admin/licensing` into the existing Settings navigation state.
  - Licensing workspace changes persist in browser `localStorage` under `mforce_licensing_admin_v1`, matching the current client-side configuration approach used elsewhere in the app.
  - Closes #66.
- Tests:
  - Added `MForce365.Web.Tests/LicensingPageTests.cs`.
- Validation:
  - `dotnet test MForce365/MForce365.sln` (all tests passing)

## VERSION 1.4.192 Beta

- 2026 release Group 12 task, meeting, and registration fixes:
  - Action items now keep completion checkbox, status, and completed date aligned across the standalone page and edit dialog, and completed items fall out of the open-items list automatically.
  - Action Items now shows the originating meeting or project when that metadata is available from To-Do body metadata or Planner plan titles.
  - Project task create/edit now supports free-text assignee email entry, best-effort team-member suggestions, and assignment notification emails when a task is assigned.
  - Project add/edit flows now reload planner buckets/tasks after writes so the board updates immediately, and task/bucket ordering uses deterministic `OrderHint` sorting.
  - Meeting recordings transcript pairing now matches more real-world transcript files, including date-adjacent PDFs and `.srt` subtitle files.
  - Meeting phase quick-action text now uses distinct running/paused/ended labels instead of duplicating `In meeting`.
  - Binder file recursion now paginates folder children in both meeting pages so binder generation includes all meeting files, not just the first Graph children page.
  - Add Meeting now includes an `Internal` room mode that loads room suggestions from Microsoft Graph `findRooms` and adds the chosen room as a resource attendee.
  - The web manifest now registers `/actionitem` as a share target, pre-filling title/text/url into new action items.
  - Registration guidance now explicitly covers Outlook/Hotmail/Live personal accounts and Gmail-via-Microsoft-account onboarding.
  - Closes #2503, #2502, #2501, #2500, #2499, #2498, #2497, #2457, #1505, #1322, and #484.
- Tests:
  - Added `MForce365.Shared.Tests/MForceTaskSourceContextTests.cs`.
  - Added `MForce365.Web.Tests/ActionItemShareTargetTests.cs`.
  - Added `MForce365.Web.Tests/ActionItemsSourceColumnTests.cs`.
  - Added `MForce365.Web.Tests/PreLoginRegistrationGuidanceTests.cs`.
  - Expanded regression coverage in `MForce365.Web.Tests`, `MForce.Components.ActionItems.Tests`, and `MForce.Components.Schedule.Tests` for planner assignment UX, action-item completion sync, transcript matching, binder paging, meeting phase text, and internal rooms.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -warnaserror` (all tests passing)

## VERSION 1.4.191 Beta

- Meeting page state/timer fixes (`MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.cs`, `Meeting.razor.css`, `MForce.Components.Schedule/MeetingTimer.razor`, `MeetingTimer.razor.cs`):
  - Replaced the static `Preparation` quick action with a live phase-status button that swaps correctly to `In Meeting` and post-meeting states.
  - Meeting quick-action status styling now updates immediately when agenda/project/notes/action/participant state changes without requiring a page reload.
  - Meeting timer now honors the scheduled duration after start/pause/resume so 25-minute meetings no longer expand to multi-hour runtimes.
  - Reset meeting now clears actual runtime markers and restores correct remaining-time calculations.
  - Closes #2486, #2487, and #2488.
- Notes, recordings, and page copy consistency (`MForce365.Shared/MForceAppointment.cs`, `MForce365.Web/Pages/MeetingRecordings.razor`, `MForce365.Web/Pages/MeetingRecordingTableRowBuilder.cs`, `MForce365.Web/Pages/Scheduler.razor`, `MForce365.Shared/mForce365Strings.resx`):
  - Meeting notes now keep the `Meeting Type` value bold for consistent formatting.
  - The Scheduler page heading now reads `Calendar`.
  - Meeting Recordings description text now covers both Teams and face-to-face meetings.
  - Meeting Recordings now shows a `Transcript` column by pairing transcript documents with recording files.
  - Closes #2489, #2490, #2491, and #2492.
- Meeting-assets upload targeting (`MForce.Components.Files/FileExplorer.razor`, `FileExplorer.razor.cs`, `FileExplorer.razor.css`):
  - Replaced the root-level default upload path with per-category plus buttons so uploads land in the intended folder from the start.
  - Closes #2493.
- Authentication/register flow guidance (`MForce.Components/PreLoginHomePage.razor`, `MForce365.Web/Pages/Authentication.razor`, `README.md`, `docs/authentication.md`, `docs/development.md`, `docs/installation.md`):
  - The pre-login `Register` action now opens a dedicated registration guidance view instead of behaving like an unexplained login redirect.
  - Added documentation for personal Microsoft account support, `common` authority usage, app-registration audience requirements, and Gmail-as-Microsoft-account guidance.
  - Closes #2494 and #2495.
- Build hygiene:
  - Removed duplicate localized resource entries from `MForce365.Shared/mForce365Strings*.resx` files so the full solution builds cleanly with warning-as-error enabled.
- Tests:
  - Added `MForce365.Web.Tests/MeetingQuickActionStateTests.cs`.
  - Added `MForce365.Web.Tests/MeetingRecordingsTranscriptTests.cs`.
  - Added `MForce365.Web.Tests/SchedulerPageHeadingTests.cs`.
  - Updated existing regression coverage in `MForce365.Web.Tests`, `MForce.Components.Files.Tests`, `MForce.Components.Schedule.Tests`, and `MForce365.Shared.Tests` for the new milestone behavior.
- Validation:
  - `dotnet build MForce365/MForce365.sln /warnaserror /p:SkipInvalidConfigurations=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln /p:SkipInvalidConfigurations=true` (all tests passing)

## VERSION 1.4.190 Beta

- Button colour and title consistency refresh (`MForce365.Web/Pages/Index.razor`, `MForce.Components.Schedule/MeetingTimer.razor`, `MeetingTimer.razor.css`):
  - Standardized dashboard heading treatment.
  - Added explicit recording action styling on the in-meeting timer so face-to-face recording controls are visually clear and consistent.
  - Closes #2473 and #2479.
- Meeting creation save reliability (`MForce.Components.Schedule/AddAppointmentPage.razor`, `AddAppointmentPage.razor.cs`):
  - Prevented helper buttons inside the add-meeting form from submitting the form unintentionally.
  - Refactored event creation through `BuildEvent(...)`, restricted Teams metadata to actual Teams meetings, and surfaced save failures through logging and notifications.
  - Closes #2480.
- Face-to-face meeting recording from the Meeting page (`MForce.Components.Schedule/MeetingTimer.razor`, `MeetingTimer.razor.cs`, `MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.cs`):
  - Added a `Record Meeting` action to the timer card for non-Teams meetings.
  - Stopping a recording now uploads the captured audio to the user OneDrive `Recordings` folder using a meeting-title-based filename.
  - Closes #2481.
- Recordings page loading resilience (`MForce365.Web/Pages/MeetingRecordings.razor`):
  - Folder discovery is now case-insensitive and load failures render inline instead of leaving navigation in a broken state.
  - Recording upload also reuses the same resilient root-folder resolution.
  - Closes #2482.
- Planner/project visibility and action-item aggregation hardening (`MForce365.Shared/PlannerPlanGraphHelper.cs`, `MForce365.Web/Pages/Projects.razor.cs`, `MForce.Components.ActionItems/ProjectsCard.razor.cs`, `MForce.Components.Projects/ProjectChooser.razor.cs`, `MForce365.Web/Components/AddActionItemDialog.razor.cs`, `MForce365.Shared/MForceActionItems.cs`):
  - Added a shared Planner helper that combines `/me/planner/plans` with group-backed `/groups/{id}/planner/plans`, de-duplicates results, and keeps plans sorted by creation date.
  - Reworked project and action-item surfaces to use that helper and tolerate partial Graph failures, preventing blank project/action-item lists when one source fails.
  - Closes #2483.
- Agenda loading reliability (`MForce365.Shared/Agenda.cs`, `MForce.Components/AgendasCRUD.razor*`, `MForce.Components.Schedule/AgendaChooser.razor*`):
  - Agenda storage now uses the resolved OneDrive id consistently instead of mixing `"me"` and explicit drive ids.
  - Agenda pages/components now show loading or inline error states rather than silently failing when Graph/OneDrive calls fail.
  - Closes #2484.
- Tests:
  - Added `MForce365.Shared.Tests/PlannerPlanGraphHelperTests.cs`.
  - Expanded regression coverage across `MForce.Components.Schedule.Tests`, `MForce.Components.ActionItems.Tests`, and `MForce365.Web.Tests` for project-plan aggregation, recordings UX, meeting recording controls, add-meeting save safety, and agenda/action-item loading states.
- Validation:
  - `dotnet test MForce365/MForce365.sln` (all tests passing)

## VERSION 1.4.189 Beta

- Meeting agenda reorder duration stability (`MForce365.Shared/MForceMeeting.cs`):
  - `SetAgenda` now computes agenda estimated times from a stable baseline and no longer mutates `StartDate` while building agenda rows.
  - Preserves expected meeting duration across agenda upload and reorder operations.
  - Closes #2476 and #2475.
- Meeting preparation action-item deletion (`MForce.Components.ActionItems/EditActionItem.razor.cs`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor.cs`, `MForce.Components.ActionItems/EditActionItemDialogResult.cs`):
  - Edit dialog now returns a typed close result with delete state.
  - Meeting action-items card now removes deleted tasks from `runningMeeting.ActionItems` immediately after dialog close.
  - Closes #2474.
- Meeting preparation quick-action visual state (`MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.cs`, `Meeting.razor.css`):
  - Added an orange preparation status button.
  - Preparation quick-action buttons now switch to completed styling when corresponding meeting data exists.
  - Closes #2473.
- Action-item project assignment (`MForce365.Web/Components/AddActionItemDialog.razor`, `AddActionItemDialog.razor.cs`):
  - Added project selection sourced from live Planner plans.
  - Action item creation now targets Planner when a project bucket is available, with fallback behavior when bucket metadata is unavailable.
  - Closes #2472.
- Action-item email assignment notifications (`MForce365.Web/Components/AddActionItemDialog.razor`, `AddActionItemDialog.razor.cs`):
  - Replaced attendee-only assign control with an email input plus attendee suggestions.
  - Saving an assigned action item now sends an email notification via Microsoft Graph `Me.SendMail`.
  - Closes #2471.
- Meeting assets Open button visual width (`MForce.Components.Files/FileExplorer.razor`, `FileExplorer.razor.css`):
  - Added dedicated class styling so the Open button background fully spans the label with centered text.
  - Closes #2469.
- Meeting notes context expansion (`MForce.Components.Schedule/MeetingNotesCard.razor`, `MeetingNotesCard.razor.cs`, `MeetingNotesCard.razor.css`):
  - Added meeting title, location, and details summary lines to the notes card context header area.
  - Closes #2200.
- Binder internal-only delivery control (`MForce365.Shared/IMeeting.cs`, `MForce365.Shared/MForceMeeting.cs`, `MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.cs`):
  - Added `BinderInternalOnly` state and organizer toggle on the meeting page.
  - Binder recipient filtering now enforces organizer-domain-only delivery when internal-only is enabled.
  - Closes #1320.
- Planner project provisioning on create (`MForce.Components.Projects/AddProject.razor.cs`):
  - Added post-create Planner detail/bucket fetch to proactively provision the plan so it appears without requiring hyperlink click initialization.
  - Closes #1087.
- Tests:
  - Added/updated coverage in `MForce365.Shared.Tests`, `MForce.Components.ActionItems.Tests`, `MForce.Components.Files.Tests`, `MForce.Components.Projects.Tests`, and `MForce365.Web.Tests` for agenda baseline timing, meeting action-item deletion flow, preparation button state classes, action-item project assignment, assignment-email behavior, binder internal-only filtering, planner provisioning, and markup regression checks.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true -v minimal` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build -v minimal` (all tests passing)
  - Playwright headed verification on `http://localhost:5204` after authenticated login confirmed:
    - meeting preparation quick actions (including `Preparation` and completed-state classes),
    - Add Action Item dialog `Assign To` email + `Project` selection controls,
    - in-meeting action-item delete flow from Edit dialog,
    - notes context title/location rendering and binder internal-only toggle behavior,
    - meeting assets file-row `Open` button styling (`meeting-asset-open-button`).

## VERSION 1.4.188 Beta

- Meeting scheduling suggestion fixes (`MForce.Components.Schedule/AddAppointmentPage.razor.cs`):
  - Normalized Graph `confidence` values so `100` now renders as `100%` (not `10000%`).
  - Applied timezone-aware parsing from `meetingTimeSlot.start/end.timeZone` so suggested times are shown in the correct local AM/PM window.
  - Closes #2458.
- Meeting details/body formatting (`MForce365.Shared/MForceAppointment.cs`):
  - `Meeting Type:` remains bold while the selected value is rendered as normal text.
  - Added a bold `Details:` heading before meeting details content in HTML body output.
  - Closes #2459 and #2460.
- Meeting notes delete safety (`MForce.Components.Schedule/MeetingNotesCard.razor.cs`):
  - Added a confirmation dialog before clearing notes from the trash action.
  - Closes #2461.
- Action item due-date editing reliability (`MForce.Components.ActionItems/EditActionItem.razor`, `EditActionItem.razor.cs`):
  - Replaced fragile `datetime-local` due-date binding with `InputDate` date editing.
  - Prevented repeated UTC->local reconversion on rerender to avoid invalid/default (`0001`) fallback behavior.
  - Closes #2462.
- Meeting assets duplicate title cleanup (`MForce.Components.Files/FileExplorer.razor`, `FileExplorer.razor.cs`):
  - Removed duplicate root meeting-name display next to the back-arrow toolbar when viewing the root folder.
  - Closes #2463.
- Notes formatting for decision/action additions (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Components/MeetingDecisionsCard.razor.cs`, `MForce.Components.ActionItems/MeetingActionItemsCard.razor.cs`):
  - Added structured timeline entries using bold headings (`Decision:` / `Action Item:`), detail lines directly below, and spacing between entries.
  - Closes #2464.
- Meeting preparation duplicate empty-state text cleanup:
  - `MForce.Components.Projects/MeetingProjectCard.razor`: removed duplicate no-project subtitle text.
  - `MForce.Components.Schedule/MeetingAgendaCard.razor`: removed duplicate no-agenda subtitle text.
  - Closes #2465.
- Online meeting visibility UX (`MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.cs`, `Meeting.razor.css`):
  - Split the project column into stacked cards and added a dedicated `Online Meeting Details` card.
  - Surface join-provider/link details with an `Open meeting` action.
  - Refresh event metadata after setup so details appear immediately.
  - Closes #2466.
- Tests:
  - Added/updated coverage in `MForce.Components.Schedule.Tests`, `MForce.Components.ActionItems.Tests`, `MForce.Components.Files.Tests`, `MForce.Components.Projects.Tests`, `MForce365.Shared.Tests`, and `MForce365.Web.Tests` for confidence normalization, timezone parsing, meeting body formatting, delete confirmation, due-date editing, duplicate-label removal, notes-formatting output hooks, and online-meeting details card rendering.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build` (all tests passing)

## VERSION 1.4.187 Beta

- Meeting binder PDF conversion fix (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`):
  - Replaced incorrect Graph conversion header usage (`format` header) with the supported query parameter path (`?format=pdf`) in `ConvertBinderToPdfAsync`.
  - Added null-stream guard to fail fast when Graph does not return converted content.
  - This resolves invalid PDF output where binder bytes could be non-PDF content despite `.pdf` filenames.
- Tests:
  - Expanded `MForce365.Web.Tests/MeetingBinderPdfDownloadTests.cs` to assert both Web and legacy Meeting pages use `requestConfiguration.QueryParameters.Format = "pdf"` and no longer use header-based conversion.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build` (all tests passing)
- Meeting binder file injection (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`, `MForce365.Shared/MeetingBinder.cs`, `MForce365.Shared/MeetingBinderContent.cs`):
  - Binder generation now recursively scans meeting assets (excluding binder state/template artifacts) and embeds extracted content into the `Files` section instead of only listing hyperlinks.
  - Supported embedded-content file types include Markdown (`.md`/`.markdown`), Word (`.docx` with `.doc` conversion fallback), PDF (`.pdf` via Graph text conversion), and PowerPoint (`.pptx` with `.ppt` conversion fallback).
  - File entries now include relative path context plus extracted body content in the binder for stronger record fidelity.
- Binder template support (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`, `MForce365.Shared/MeetingBinder.cs`):
  - Added template bootstrap flow with `Templates/MeetingBinderTemplate.docx`.
  - On meeting load, binder template artifacts are ensured in the user OneDrive `mForce365/Templates` location and mirrored to each meeting’s `Templates` folder when missing.
  - Binder generation now resolves template bytes first and applies template styles when present, with fallback to generated default template styles.
  - Added `MeetingBinder.CreateDefaultTemplate()` for deterministic default template provisioning.
- Meeting assets folder setup (`MForce.Components.Files/FileExplorer.razor.cs`):
  - Meeting folder initialization now creates a `Templates` subfolder alongside existing `MeetingNotes`, `Documents`, and `Correspondence` folders so users can upload custom binder templates.
- Tests:
  - Added `MForce365.Web.Tests/MeetingBinderFileInjectionTests.cs`.
  - Expanded `MForce365.Shared.Tests/MeetingBinderBuilderTests.cs` with embedded-file rendering and template-style/default-template coverage.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build` (all tests passing)
- Closes #2454.

## VERSION 1.4.186 Beta

- Meeting binder visual refresh (`MForce365.Shared/MeetingBinder.cs`): modernized binder presentation with a branded cover page (`Meeting Summary` + `Meeting Snapshot`), prepared-on stamp, improved heading typography/color, and a cleaner section flow with dedicated Table of Contents pagination.
- Meeting binder TOC reliability (`MForce365.Shared/MeetingBinder.cs`): TOC field is now marked dirty and remains paired with `UpdateFieldsOnOpen`, so entries refresh reliably when opened in Word. Closes #2452.
- Binder table readability (`MForce365.Shared/MeetingBinder.cs`): action-item and binder tables now render with styled header rows (brand fill + white text) for clearer scanning in generated DOCX output.
- Binder download format selection (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Pages/Pages/Meeting.razor.cs`): `Get Binder` now converts to PDF via Microsoft Graph when the binder is immutable/finalized (`BinderFinalized` or `AllMinutesAccepted`), while mutable binders continue to download as DOCX for editing.
- Tests:
  - Added `MForce365.Web.Tests/MeetingBinderPdfDownloadTests.cs` to lock PDF-download gating and conversion calls in the Meeting page flow.
  - Expanded `MForce365.Shared.Tests/MeetingBinderBuilderTests.cs` for TOC dirty-field behavior, page-break structure, cover-page summary text, and styled table-header assertions.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true --no-build` (all tests passing)

## VERSION 1.4.185 Beta

- Meeting creation dialog cleanup (`MForce.Components.Schedule/AddAppointmentPage.razor`, `AddAppointmentPage.razor.cs`): removed the standalone `Project` input from Add Meeting, added a `Client` meeting type category, and now shows the `Client` free-text input only when that category is selected. Closes #2442 and #2443.
- Meeting creation workflow (`MForce.Components.Schedule/MainSchedule.razor`, `ScheduleCard.razor.cs`): after saving a new meeting, scheduler flows now navigate directly to `/meeting/{id}` so users continue immediately in meeting preparation instead of returning to calendar-only view. Closes #2444.
- Dashboard next-meeting formatting (`MForce.Components.Schedule/NextEventCard.razor`): reformatted next-event rows so day/date/time render on one line and meeting details render below it, matching dashboard UX expectations. Closes #2445.
- Meeting notes heading emphasis (`MForce365.Shared/MForceAppointment.cs`): meeting-type value in generated HTML body content is now emphasized with bold formatting, keeping wrapped values like `... Meetings - Other` visually consistent with other heading lines in notes. Closes #2446.
- Agenda template duplication refactor (`MForce.Components/AgendasCRUD.razor.cs`, `MForce.Components/MForce.Components.csproj`): removed duplicated template catalog/build logic from `AgendasCRUD` and delegated to the shared `AgendaTemplateCatalog.CreateAgenda` path, ensuring one source of template truth. Closes #2449.
- Action-item recurrence dialog parameters (`MForce365.Web/Components/AddActionItemDialog.razor.cs`): recurrence picker now passes both required `RecurrencePattern.StartDate` and `RecurrencePattern.DueDate` using `nameof(...)` keys. Closes #2450.
- Tests: added/updated coverage in `MForce.Components.Schedule.Tests`, `MForce365.Web.Tests`, and `MForce365.Shared.Tests` for conditional client-field rendering, project-field removal, post-create meeting navigation, next-event formatting markup, agenda-template catalog delegation, recurrence dialog parameter keys, and meeting-type HTML emphasis.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror -p:SkipMauiWorkloadValidation=true` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln -p:SkipMauiWorkloadValidation=true` (all tests passing)

## VERSION 1.4.184 Beta

- Agenda template edit icon alignment (`MForce.Components/AddAgenda.razor`, `AddAgenda.razor.css`): aligned action icons/buttons vertically in template edit rows by introducing consistent row/action-container alignment classes and icon-button sizing. Closes #2436.
- Planner update ETag runtime tests (`MForce365.Shared.Tests/PlannerUpdateEtagTests.cs`): added mock-HTTP runtime coverage validating that Planner updates send the fetched ETag in `If-Match` and that missing ETag throws an explicit exception before issuing a patch. Closes #2433.
- Sidebar agendas templates (`MForce.Components/AgendasCRUD.razor`, `AgendasCRUD.razor.cs`): added a `Templates` split button next to `Create New` in agenda management, wired to the full predefined 25/55-minute template catalog, and opening `AddAgenda` in `Edit Template` force-create mode so users can customize and save to personal agendas. Closes #2417.
- Meeting creation availability suggestions (`MForce.Components.Schedule/AddAppointmentPage.razor`, `AddAppointmentPage.razor.cs`): added participant email capture plus `Suggest times` flow backed by Microsoft Graph `findMeetingTimes`, selectable recommended time slots, and attendee population on saved events. Closes #92.
- To-Do recurrence support in web action-item flow (`MForce365.Web/Components/AddActionItemDialog*`, `MForce365.Shared/MForceActionItems.cs`): added recurrence selection to the web Add Action Item dialog and persisted recurrence metadata in To-Do create/update service payloads. Added runtime serialization regression coverage. Closes #280.
- Tests: added/updated coverage in `MForce.Components.Schedule.Tests`, `MForce365.Web.Tests`, and `MForce365.Shared.Tests` for availability suggestions, agenda template sidebar actions, icon alignment hooks, recurrence wiring, and planner ETag runtime behavior.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln --no-build` (all tests passing)

## VERSION 1.4.183 Beta

- Meeting toolbar cleanup (`MForce365.Web/Pages/Meeting.razor`, `Meeting.razor.css`): removed duplicated `Preparation` and `Participants` dropdown menus from the Meeting page and promoted their remaining actions into the quick-action button row (Invite participants, Get binder, Setup online meeting, QR code, Update description, Cancel meeting) using the same button style. Closes #2440.
- Add-note behavior in pre-meeting mode (`MForce365.Web/Pages/Meeting.razor.cs`, `MForce.Components.Schedule/MeetingNotesCard*`, `MForce365.Web/wwwroot/MForce365.js`): `Add note` now expands/unminimizes notes, requests focus targeting, scrolls to the notes panel, and focuses the pre-meeting notes input (with compose fallback) so the action is immediately usable before a meeting starts. Closes #2441.
- Calendar view persistence hardening (`MForce.Components.Schedule/MainSchedule.razor`, `ScheduleCard.razor.cs`): dashboard and meetings schedulers now persist selected Day/Week/Month view in `localStorage` with separate keys (`mforce365.calendarView.dashboard` and `mforce365.calendarView.meetings`) to preserve each surface view reliably across navigation. Closes #2439.
- Agenda template duration filtering (`MForce.Components.Schedule/AgendaChooser*`): template split-button items are now filtered to the resolved meeting-length bucket (matching/nearest template duration) instead of always displaying both 25- and 55-minute templates. Closes #2437.
- Tests: added and updated regression coverage in `MForce365.Web.Tests` and `MForce.Components.Schedule.Tests` for meeting quick-action/menu behavior, add-note focus wiring, template filtering, and scheduler persistence storage keys.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln --no-build` (all tests passing)

## VERSION 1.4.182 Beta

- Action items: fixed Planner action-item save/close failures on the single Action Item page by updating Planner tasks with a real task ETag instead of wildcard `If-Match: *`, resolving Graph `400` responses (`The format of value '*' is invalid.`) and preventing Blazor unhandled-render exceptions when saving completed Planner tasks.
- Dashboard layout density: reduced dashboard shell padding, card gutters, and card padding on `MForce365.Web/Pages/Index.razor` so content tiles sit closer and use more of the page width.
- Projects page redesign: refreshed `MForce365.Web/Pages/Project.razor` and `Project.razor.css` with a modern board surface (hero summary, filter pills, richer bucket chrome, elevated task cards) while preserving SortableJS drag/drop selectors and behaviors.
- Projects task metadata: task cards now expose additional fields (status badge, priority badge, due date, assignment count, progress bar/percent, created date, and quick edit action) for better at-a-glance planning context.
- Pre-login homepage redesign: rebuilt `MForce.Components/PreLoginHomePage.razor` into a modern hero-first landing layout with stronger login/register CTAs, feature cards, and a styled `Coming soon` section; reduced top spacing so the primary tiles sit higher and are visible immediately on load.
- Pre-login styling: added scoped styles in `MForce.Components/PreLoginHomePage.razor.css` (layered gradients, glass surfaces, responsive card/pill system, and reduced-motion-safe animations) to improve first-impression visual quality on desktop and mobile.
- App-wide visual refresh: applied the pre-login design language across authenticated pages by introducing shared shell theme hooks in `MForce365.Web/Shared/MainLayout.razor` (`app-theme-shell`, `app-theme-sidebar-shell`, `app-theme-topbar`, `app-theme-body-container`) and extending `MForce365.Web/wwwroot/css/mforce365-overrides.css` with global gradient backgrounds, glass surfaces, softened borders/shadows, and consistent button/input styling.
- Page-by-page visual polish: introduced reusable page primitives (`app-page-*`) in `MForce365.Web/wwwroot/css/mforce365-overrides.css` and applied them across Web routes (`Index`, `Projects`, `ActionItems`, `Settings`, `Teams`, `Team`, `Scheduler`, `Agendas`, `About`, `MeetingRecordings`, guest/auth pages, and supporting placeholder pages) for consistent headers, content card rhythm, and table surfaces.
- Dialog visual consistency: refreshed `AddBucketPage`, `AddTaskPage`, and `AddTeamPage` layouts with the same polished card/note language while preserving existing behavior and test-guarded handlers/classnames.
- Dashboard mobile calendar polish: softened the `ScheduleCard` scheduler border and internal grid border contrast on small screens (`<=640px`) to reduce heavy calendar chrome while preserving readability.
- Pre-login spacing polish: removed outer container centering and section gap margins on `MForce.Components/PreLoginHomePage.razor` so the hero content sits tighter and aligns with the new edge-to-edge visual rhythm.
- Tests: added Planner update ETag regression coverage in `MForce365.Web.Tests/PlannerActionItemDeleteTests.cs`.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln --no-build` (all tests passing)
  - Playwright visual smoke on `http://localhost:5210` (pre-login routes, including `/` and `/about`) confirmed updated page chrome and polished first-impression layout.
  - Playwright verification on `http://localhost:5204`: closing a PlannerTask action item (`Completed` + `Save`) now returns `PATCH /planner/tasks/{id} -> 204` with no console errors.

## VERSION 1.4.181 Beta

- Dependencies: bumped `tailwindcss` to `^3.4.19` and added an explicit `glob` dev dependency at `^10.5.0` in `MForce365.Web/package.json`.
- Lockfiles: refreshed `MForce365.Web/package-lock.json` and synchronized `output/playwright/publish-web/package-lock.json` to keep tracked lockfiles aligned.
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln --no-build` (all tests passing)

## VERSION 1.4.180 Beta

- Project page layout polish: reduced horizontal shell/board padding so buckets use more screen width and side borders feel less constrained.
- Project page drag-and-drop: added SortableJS-powered board interactions in `MForce365.Web/Pages/Project.razor` for:
  - Bucket reordering (drag bucket headers).
  - Task reordering within a bucket (drag task handles).
  - Task movement between buckets (drag across bucket lists).
- Planner persistence: drag operations now call new JS-invokable handlers (`OnTaskDragEnd`, `OnBucketDragEnd`) and persist both `BucketId` and `OrderHint` with `If-Match` ETag headers for Planner task and bucket patches.
- Shared ordering helper: extended `PlannerOrderHintHelper` with `BuildInsertOrderHint(previousHint, nextHint)` and reused it for both adjacent moves and drag/drop insert positioning.
- Added/updated coverage:
  - `MForce365.Shared.Tests/PlannerOrderHintHelperTests.cs`
  - `MForce365.Web.Tests/ProjectAsyncHandlersTests.cs`
  - `MForce365.Web.Tests/ProjectTaskReorderWebTests.cs`
  - `MForce365.Web.Tests/ProjectBoardInteropScriptTests.cs`
- Validation:
  - `dotnet build MForce365/MForce365.sln -warnaserror` (0 warnings, 0 errors)
  - `dotnet test MForce365/MForce365.sln --no-build` (all tests passing)
  - Playwright verification run against a local fixture mirroring the Project board DOM/classes confirmed bucket reorder plus intra/inter-bucket task drag payloads.

## VERSION 1.4.179 Beta

- Dashboard action items card: removed date-group heading rows (`Due Date` / `No date available`) and changed the list to per-item rows with explicit columns `Title | Due date | Importance` so due dates align directly with each action item. When an item has no due date, the due-date column is intentionally left blank. Closes #2430.
- Meeting details update notifications now keep the email subject as plain text while still HTML-encoding body content, preventing subjects like `&amp;` from appearing to recipients. Applied in both Web and legacy Pages meeting flows. Closes #2426.
- Meeting reload now always refreshes `ClientCode` from Graph data (including null/empty values), eliminating stale client codes when the source value is removed. Closes #2425.
- Projects planner reordering now uses shared adjacent-move order-hint generation (`PlannerOrderHintHelper`) for both up/down actions in Web and legacy Pages, fixing intermittent opposite moves and top-task down no-op behavior. Closes #2420.
- Agenda management header count now reflects the actual rendered personal agenda list, and agenda loading now sets `AgendaCount` from successfully loaded agenda files, resolving count/display mismatches. Closes #2421.
- Task-creation wording consistency updates: planner add-task dialog title now uses `Add Task`, `Assign To` uses spaced title casing, and `Due Date` capitalization is standardized in neutral resources. Closes #2419.
- Tests: added targeted coverage in `MForce365.Shared.Tests` and `MForce365.Web.Tests` for new planner order-hint logic and Group 4 regression guards.
- Validation: full solution build and test run completed with zero warnings/errors on `MForce365/MForce365.sln`.

## VERSION 1.4.178 Beta

- Action items: fixed Planner action-item deletion from the edit dialog by deleting with the full task model metadata and improved Planner `If-Match` handling (fetch ETag first, wildcard fallback). This resolves no-op deletes for Planner-backed entries. Closes #2418.
- Agenda chooser: added a `Templates` dropdown button beside `Create New` with predefined 25-minute and 55-minute meeting templates. Selecting a template opens `AddAgenda` as `Edit Template` so users can customize and save to personal agendas. Closes #2417.
- Settings: added `AI Settings` with OpenAI API key capture (`Show`/`Hide`, `Save key`, `Clear key`) and browser persistence via `localStorage` for transcript summarization workflows. Closes #1798.
- Agenda authoring: added per-item `Assigned to` capture in agenda create/edit rows, persisted via `AgendaItem.Owner`, propagated into running meeting agenda items, and displayed in the meeting agenda card and binder output. Closes #1586.
- Agenda authoring: total percentage indicator is now color-responsive (`<100` orange, `=100` green, `>100` red) and no longer hard-blocks over-allocation entry so users can visually correct totals. Closes #1582.
- Tests: added/updated coverage in `MForce365.Web.Tests` and `MForce.Components.Schedule.Tests` for templates flow, assignment fields, planner deletion reliability, OpenAI key settings, and percentage cue behavior.
- Validation: full solution build and test run completed with zero warnings/errors on `MForce365/MForce365.sln`.

## VERSION 1.4.177 Beta

- Meetings/tasks/projects now support client billing references end-to-end. Added client fields in meeting creation, project creation/selection, action-item create/edit flows, and rendered client metadata in meeting/action/project views while keeping display titles clean. Closes #1649.
- Agenda chooser now filters personal agenda options by meeting length (including fallback handling for legacy agendas), and agenda authoring includes a meeting-length metadata field. Closes #1627.
- Meeting notes now include an editable pre-meeting notes area (before meeting start), and binder/summary generation includes these pre-meeting notes in output. Closes #958.
- Meeting participants are now notified when new meeting files are uploaded and when meeting details are updated from the meeting page. Added upload callback plumbing from `FileExplorer` to meeting flows and Graph mail notifications to attendees. Closes #495.
- Tests: added and updated unit tests across `MForce365.Shared.Tests`, `MForce.Components.Schedule.Tests`, `MForce.Components.ActionItems.Tests`, `MForce.Components.Files.Tests`, `MForce.Components.Projects.Tests`, and `MForce365.Web.Tests`.
- Validation: full build and solution test run completed against `MForce365/MForce365.sln`.

## VERSION 1.4.176 Beta

- Localization: audited UI literals across the WebAssembly experience (`MForce365.Web` + shared Blazor components) and replaced remaining hardcoded user-facing strings with `IStringLocalizer<mForce365Strings>` resource usage.
- Accessibility text localization: localized remaining screen-reader labels and image `alt` text in shared navigation/login/profile components using existing resource keys.
- Resources: normalized multilingual `.resx` files to match the neutral key set exactly, removed duplicate key blocks/case-collision variants, and validated parity across all locale files.
- Tests/build: updated affected UI text assertions in `MForce365.Web.Tests` to assert localized markup, then verified with full solution build and test (`MForce365/MForce365.sln`).
- Browser verification: completed Playwright smoke checks for `/` and `/about`, with artifacts written under `output/playwright/`.

## VERSION 1.4.175 Beta

- Meeting action items: editing a meeting action item now triggers meeting-state persistence when task content/completion changes, so completed items remain completed after leaving and re-entering the meeting. Closes #2414.
- Meeting assets: changed the header action from `Open` to `Open All` and updated button styling so label shading spans the full text consistently. Closes #2413. Closes #2412.
- Dashboard: added a delete action to the `Next Meeting` card with confirmation and Graph event deletion, then refreshes to the next available event. Closes #2199.
- Agendas: agenda management list now explicitly sorts by `CreatedDateTime` descending (newest first), then by name for stable ordering. Closes #1580.
- Calendar: selected Day/Week/Month view now persists in browser session storage across dashboard calendar and full scheduler page navigation. Closes #815.
- Tests: added/updated unit tests in `MForce.Components.ActionItems.Tests`, `MForce.Components.Files.Tests`, `MForce.Components.Schedule.Tests`, and `MForce365.Web.Tests` to lock in these behaviors.

## VERSION 1.4.174 Beta

- Schedule: added a one-click `Join` action directly on calendar entries in both dashboard and full scheduler views when a Teams/online join URL is available. Closes #1454.
- Schedule/Create Meeting: replaced free-form location capture with a `Location type` flow (`Teams meeting` or `Other`) plus a custom-location save action, and automatically configures Teams online meeting metadata when `Teams meeting` is selected. Closes #1437.
- Schedule/Create Meeting: added structured `Meeting type` capture with category + subtype dropdowns and an `Other` fallback to support organization-specific taxonomy during meeting creation. Closes #1248.
- Agendas: added `Quick Agenda` mode in agenda creation/edit so users can capture item-only agendas without entering percentages manually; percentages are normalized automatically on save for runtime scheduling compatibility. Closes #1424.
- Meeting Agenda: added drag-and-drop reordering support in the in-meeting edit agenda dialog and persisted drag order directly when saving. Closes #1261.
- Meeting Timer: added automated countdown warnings at 5 minutes and 2 minutes remaining with an audible tone and visual screen flash alert. Closes #604.
- Meeting Binder: added default document header/footer across generated binders (date/title/organizer in header, `Powered by mForce365` + page `x/y` in footer). Closes #1399.
- Meeting Binder: replaced appendices-focused file output with a dedicated `Files` section listing linked uploaded documents by filename. Closes #1411.
- Meeting Binder: added a dedicated `Parking Lot` section (positioned as the second-last section before the boilerplate) with explicit empty-state handling when no topics are recorded. Closes #1410.

## VERSION 1.4.173 Beta

- Meeting UX: fixed command-menu dropdown layering on `/meeting/{meetingid}` so submenu items (for example Participants actions) render above the dashboard tiles instead of behind them. Updated `MForce365.Web/Pages/Meeting.razor.css` to remove command-shell clipping and enforce toolbar/menu stacking order.
- Layout UX: fixed desktop left-navigation overlap on meeting routes by removing a high-specificity CSS override that pinned main content at `margin-left: 0`; desktop now correctly honors sidebar-aware `margin-left`/`width` values in `MForce365.Web/Shared/MainLayout.razor.css`.
- Meeting dialogs: restyled `Choose Agenda`, `Choose Project`, `Add Action`, and `Add Decision` popups to match the dashboard visual style. Added shared `meeting-dialog-*` surface/layout classes in `MForce365.Web/wwwroot/css/mforce365-overrides.css` and updated `AgendaChooser`, `ProjectChooser`, `ActionItemsPicker`, and `AddDecision` markup to use them consistently.
- Meeting dialogs reliability: fixed `Add decision` popup runtime failure caused by duplicate case-insensitive dialog parameters (`Model` + `model`) in `MForce.Components/AddDecision`. The component now exposes a single `[Parameter] Model`, restoring full dialog rendering and save/cancel behavior.
- Meeting persistence reliability: removed Azure Functions dependency from meeting sync. Meeting state now persists only to `thisMeeting.meetingv1` in the meeting’s OneDrive folder, and guest join links are generated from the OneDrive meeting-state download URL token instead of function-backed IDs.
- Web runtime compatibility: aligned `MForce365.Web` ASP.NET/Blazor package references to `10.0.0` for the `net10.0` target framework. This resolves dev/runtime bootstrap failures in browser automation (for example dynamic import requests to `/0`) and restores reliable Playwright rendering.
- Dev launch profile: pinned `MForce365.Web` local run URL to `http://localhost:5204` in `Properties/launchSettings.json` so standard `dotnet run` consistently binds to the same port during interactive Playwright sessions.

## VERSION 1.4.172 Beta

- Meeting dashboard UX polish: tightened meeting-page spacing, card rhythm, and responsive breakpoints so controls and content read cleanly on desktop and mobile without large dead areas.
- Meeting command/quick-action bars: removed horizontal scroll behavior in favor of wrapped, stable button layouts and improved action button sizing/weight for clearer affordance.
- Meeting assets UX: kept header actions aligned in a single clean row, reduced visual density in the file grid, and improved mobile behavior for the assets header/action group.
- Meeting assets labels: opaque Microsoft folder identifiers (for example `040000...`) are now masked as `Meeting folder` in folder cards and path/location labels so users never see technical IDs.
- Web layout reliability: restored loading of the Blazor CSS-isolation bundle by adding `MForce365.Web.styles.css` to `index.html`. This ensures Meeting/MainLayout scoped styles apply in local and production builds, preventing meeting-page content from visually overlapping the desktop sidebar.
- CI/CD (GitHub Pages): fixed preview deployment authentication by switching the `JamesIves/github-pages-deploy-action@v4` step to `ssh-key` mode (using `ACTIONS_DEPLOY_KEY`) and checking out detached HEAD before deploy worktree creation. This prevents token-auth failures and avoids branch/worktree conflicts on `main`.
- Meeting assets reliability: fixed file upload crashes in the Meeting page by replacing the non-seekable `LargeFileUploadTask` path with a browser-safe stream upload path, adding defensive exception handling around upload/dialog flows, and preserving the assets panel even when upload errors occur.
- Meeting dashboard responsive polish: tightened desktop spacing for hero/toolbars/cards, improved mobile button wrapping for quick actions/assets controls, and added mobile overflow guards in `MainLayout` so meeting actions are not clipped horizontally.
- Meeting tile alignment: all meeting dashboard cards now stretch to fill their allocated grid columns at desktop and mobile breakpoints, removing uneven card widths and making row gutters/padding line up consistently.
- Tests: added `CurrentPathLabel_HidesOpaqueChildFolderName` in `MForce.Components.Files.Tests/FileExplorerTests.cs` and refreshed meeting layout assertions in `MForce365.Web.Tests/MeetingDashboardLayoutTests.cs` and `MForce365.Web.Tests/MeetingSendInvitesTests.cs` to match the modern dashboard implementation.
- .NET 10 upgrade: moved all active projects (web, shared libraries, data/components, GraphData, MAUI targets, and tests) to `net10.0` and updated CI/CD workflows to use `dotnet-version: 10.0.x` with `net10.0` publish output paths.

## VERSION 1.4.171 Beta

- Web (local dev reliability): Prevented localhost startup loops caused by stale service-worker caches of `_framework` assets. `MForce365.Web/wwwroot/index.html` now unregisters service workers, clears Cache Storage on local hosts (`localhost`, `127.0.0.1`, `[::1]`), and triggers a one-time refresh when an old worker still controls the current page. Non-local environments continue registering the service worker for normal PWA behavior.

## VERSION 1.4.170 Beta

- Meeting: Rebuilt the Meeting page into a modern dashboard layout with a single responsive composition, denser spacing, and dedicated quick actions for choosing agenda/project and adding notes/actions/decisions. The split legacy layout paths were removed in favor of one adaptive grid.
- Meeting timer: Replaced the analog clock UI with a progress-driven meeting time panel that surfaces status, remaining/overtime state, schedule range, and compact play/pause/stop controls. Timer lifecycle handling now safely starts/stops/disposes countdown timers to avoid null/dispose edge cases.
- Meeting cards: Modernized Agenda, Project, Participants, Notes, Action Items, and Decisions cards with consistent header/action patterns, clearer empty states, compact list rows, and improved scanability. Added CSS isolation files for these cards to keep styling scoped and predictable.
- Meeting notes: Reworked notes into a structured workspace with primary notes + timeline feed, cleaner compose area (chat and rich text modes), and retained prep-mode edit/delete behavior.
- Layout: Desktop left navigation now auto-collapses into a compact icon rail on meeting-focused routes (`/meeting/*`, meeting participant/notes/action pages), with a header toggle to expand/collapse on demand. Outside meeting routes, the standard full-width navigation is restored automatically.
- Added regression coverage in `MForce365.Web.Tests/MeetingDashboardLayoutTests.cs` and `MForce.Components.Schedule.Tests/MeetingTimerUxTests.cs` for dashboard helper wiring and timer progress-based UX expectations.

## VERSION 1.4.169 Beta

- Meeting: Deep reliability and UX hardening on the Meeting page. The duplicated status menus were consolidated into a single status-aware command menu, all visible actions now have consistent command values, and menu execution now uses a guarded async handler (`MenuHandlerAsync`) with explicit support for `next-agenda-item`.
- Meeting: Participant add flow and summary-send flow now correctly handle cancel/no-selection scenarios. Adding a participant no longer forces a save on dialog cancel, and summary emails now only show success when at least one selected recipient is sent successfully.
- Meeting assets: File Explorer was modernized with clearer action buttons (Upload/Open), cleaner loading and empty states, improved folder/file rendering, and metadata display. Internal meeting state files (`thisMeeting.meetingv1`) are now hidden from the user-facing asset list.
- Meeting UX: Meeting Details layout now uses consistent responsive spacing and margins across header, command menu, and card grids. Replaced uneven inline spacing with section/slot classes, fixed broken grid class usage (`col-l5-12`), and standardized gutters for improved readability on desktop and mobile.
- Meeting assets: The technical meeting-folder identifier (for example `040000...`) is now masked from user-facing labels/path text and replaced with friendly meeting naming. Header action buttons are constrained to one row for cleaner, predictable controls.
- Added regression tests in `MForce365.Web.Tests/MeetingPageCommandReliabilityTests.cs` and `MForce.Components.Files.Tests/FileExplorerTests.cs` to lock in menu command wiring, async dispatch behavior, cancel handling, recipient-selection guards, and internal file filtering.

## VERSION 1.4.168 Beta

- Docs: Added a product design and development case study to the documentation set and linked it from the docs index so teams can reference the original architectural and delivery decisions.
## VERSION 1.4.167 Beta

- Action Items: Restore the Save button visibility in the Add Action Item dialog after enabling Tailwind Preflight. The component now uses Tailwind utility classes for the layout and buttons, sharing the same `mForceButtonPrimary`/`mForceButtonSecondary` styles as the rest of the app. Added `MForce.Components.ActionItems.Tests/AddActionItemButtonStyleTests.cs` to guard the markup. Closes #2393.
## VERSION 1.4.166 Beta

- Meeting: Meeting Details header formatting updated. The meeting title now appears on the left inside a subtle box for emphasis, while the scheduled date and a Send meeting invite button align to the right. The header is fully responsive: on narrow screens, the date and button stack under the title while preserving spacing. Tests in `MForce365.Web.Tests/MeetingHeaderFormattingTests.cs` verify the new markup and styles. Closes #2369.
## VERSION 1.4.165 Beta

- Action Items: Edit dialog now persists the Completed state and selected Status on Save. If the Completed toggle is checked, the task is saved with Status=Completed; otherwise, the chosen Status value is sent to Microsoft Graph. This fixes a bug where checking Completed in the Edit Action Item dialog did not result in a completed task after saving. Tests were added in `MForce.Components.ActionItems.Tests/EditActionItemCompletionSaveTests.cs` to guard the save behavior. Closes #2366.
## VERSION 1.4.164 Beta

- Action Items: Edit dialogs now use Tailwind button styles consistently — Save is indigo, Delete is red, and Cancel is gray — matching the design system. Updated `ActionItem.razor`, `Pages/AddTaskPage.razor`, and `Components/AddActionItemDialog.razor`. Added tests in `MForce365.Web.Tests/EditActionDialogButtonStyleTests.cs` to lock in the class names. Closes #2367.
## VERSION 1.4.163 Beta

- Web: The `DataService` registration now uses a scoped lifetime so it can consume the scoped `GraphServiceClient`. This resolves the startup crash seen in unauthenticated sessions when the singleton service attempted to depend on the Graph client before sign-in.
## VERSION 1.4.162 Beta

- Schedule/Meeting invites: Headings in newly created meeting invites are now bold when viewed in Outlook and in mForce. Invite bodies are generated as HTML with bold labels for Purpose/Goal, Chair, Scribe/Minutes, Team, and Project, improving readability. Added tests to validate HTML output and encoding. Closes #2347.
## VERSION 1.4.161 Beta

- Schedule: Add Meeting dialog now scrolls fully to the bottom on all screen sizes. The dialog is opened with `DialogOptions` using the `dialog-fixed` CSS class from `mforce365-overrides.css`, and the stylesheet constrains dialog content height to the viewport with internal scrolling. This fixes the right scrollbar not reaching the end of the form on the meeting invite creation page. Closes #2346.
## VERSION 1.4.160 Beta

- Meeting: Participants dropdown actions now work reliably from the meeting header. Normalized the Reset Meeting action value, added a handler for Add Note to reveal the notes area, and fixed event binding on the Participants card expand/collapse icons. Added tests to guard the participants menu item values and reset action consistency. Closes #2345.
## VERSION 1.4.159 Beta

- Meeting: Add Decision dialog on the meeting page now always shows the Title and Description inputs when opened from the header menu. The dialog is opened with an explicit `model` parameter to guarantee a bound instance in all contexts. Also guards against null results when the dialog is canceled. Closes #2343.
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

- Production readiness hardening for the Web app:
  - Sidebar route highlighting now tracks the current URL on every navigation (including deep links such as `/project/{id}`, `/actionitem/{id}`, and `/meeting/{id}`), so the active section stays accurate.
  - Projects page now has explicit loading, error, and empty states; it no longer presents a blank body while data is being fetched.
  - Action Items page now forces a fresh Graph reload on entry to avoid stale singleton cache states and includes loading/empty states.
  - Action Items Due date now renders "No date available" for unset/default dates instead of `01/01/0001`.
  - Dashboard Action Items card now also treats unset/default due dates as "No date available" and no longer marks them as overdue.
  - Meeting Recordings page now always exits loading mode on failure and handles null Graph responses safely.
  - Meeting Recordings date column now formats once correctly (removed duplicate timestamp output).
  - Login now uses redirect mode for MSAL to avoid popup/COOP window-close errors in modern browsers.
  - Service worker registration now targets `/service-worker.js` from the app root and catches registration failures, preventing route-relative MIME errors on auth/deep-link pages.
  - Meeting state persistence now tolerates Azure Functions endpoint outages: OneDrive save remains primary, background sync failures no longer throw unhandled rendering exceptions, and Development mode now skips optional cloud sync by default unless explicitly enabled.
  - Added web regression tests in `MForce365.Web.Tests/ProductionReadinessUxTests.cs` covering navigation sync and the new UX safeguards.

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
 - Files: Drag‑and‑drop in the Add File dialog now saves uploads into the Documents folder by default when you are at the meeting root. This ensures files appear under one of the three base folders (Meeting Notes, Documents, Correspondence) instead of the meeting root. Closes #2344.

