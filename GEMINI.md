# Project Rewrite Plan: Rooster to Angular 20

This document outlines the plan to rewrite the `rooster` application from Angular 7 to Angular 20.

## Plan

1.  **Scaffold a New Project:** Create a fresh Angular 20 project in a new `rooster-new` directory using the Angular CLI. This ensures the latest dependencies, build configurations, and a modern project structure.
2.  **Analyze the Old Code:** Read through the existing application's files in `src/app` to understand its architecture, including all components, services, routes, and dependencies.
3.  **Migrate and Modernize:** Move the logic from the old application into the new one, piece by piece. During this process, the following will be addressed:
    *   Update all Angular-specific syntax and APIs.
    *   Find modern, well-supported replacements for the old `ng2-*` libraries and other outdated dependencies.
    *   Re-create the routing configuration.
    *   Copy over all necessary assets from the `src/assets` folder.
4.  **Verify and Replace:** After migrating the code, run the build and tests for the new project to ensure everything is working correctly. Once confident in the new version, replace the old project files with the new `rooster-new` project.

## Current Status

**Completed Actions:**

*   Deleted the `rooster-modern` directory.
*   Temporarily renamed `angular.json` to `angular.json.bak` to create a new Angular 20 project (`rooster-new`).
*   Restored the original `angular.json`.
*   Created all necessary component directories and placeholder components in the new project.
*   Migrated the main `app.component.html` and `app.component.ts` files, converting the latter to a standalone component and addressing initial compilation errors.
*   Migrated all shared classes and services, updating them for Angular 20's `HttpClient` and ensuring proper property initialization.
*   Updated `app.config.ts` and `main.ts` to support the new standalone component architecture.
*   Copied all static assets from the old project to the new one.
*   Created a custom `GoogleplaceDirective` to handle Google Places API integration.
*   Added the Google Maps JavaScript API script to `index.html`.
*   Migrated the routing configuration from `app-routing.module.ts` to `app.routes.ts`.
*   Migrated `feed.component.ts` to a standalone component, initialized properties, explicitly typed `subscribe` parameters, removed old dependencies (ng2-cache, ng2-pagination, ng2-modal, angular2-notifications, ng2-facebook-sdk), and added `HttpClientModule` and `FormsModule`.
*   Migrated `feed.component.html` by removing deprecated pagination and modal HTML, and updating image/video/audio bindings to use property binding `[]` instead of interpolation `{{}}`.
*   Created `comment.ts` and `feed.component.css`.
*   Added null checks for `currentRoost` and `commentText` in `feed.component.ts`.
*   Migrated `home.component.ts` to a standalone component, initialized properties, and updated constructor and methods.
*   Created `home.component.html` and `home.component.css`.
*   Migrated `about-us.component.ts`, `about-us.component.html`, and `about-us.component.css` to standalone components.
*   Migrated `cancellation.component.ts`, `cancellation.component.html`, and `cancellation.component.css` to standalone components.
*   Migrated `complaints.component.ts`, `complaints.component.html`, and `complaints.component.css` to standalone components.
*   Migrated `contact-us.component.ts`, `contact-us.component.html`, and `contact-us.component.css` to standalone components.
*   Migrated `disclaimer.component.ts`, `disclaimer.component.html`, and `disclaimer.component.css` to standalone components.
*   Migrated `faq.component.ts`, `faq.component.html`, and `faq.component.css` to standalone components.
*   Migrated `info.component.ts`, `info.component.html`, and `info.component.css` to standalone components.
*   Migrated `landing.component.ts`, `landing.component.html`, and `landing.component.css` to standalone components.
*   Migrated `payment.component.ts`, `payment.component.html`, and `payment.component.css` to standalone components.
*   Migrated `payu-payment.component.ts`, `payu-payment.component.html`, and `payu-payment.component.css` to standalone components.
*   Migrated `privacy-policy.component.ts`, `privacy-policy.component.html`, and `privacy-policy.component.css` to standalone components.
*   Migrated `profile.component.ts` to a standalone component, initialized properties, removed old dependencies (ng2-cache, angular2-notifications, ng2-datepicker), and updated logic to use `localStorage` and native HTML elements for date input.
*   Migrated `profile.component.html` by replacing Angular Material components (`md-card`, `md-toolbar`, `md-input`, `md-radio-group`, `md-radio-button`) and `ng2-datepicker` with standard HTML elements and input types, and updating property bindings.
*   Migrated `promotions.component.ts` to a standalone component, extending `FeedComponent` and correctly calling its super constructor with necessary services. Re-implemented `ngOnInit` and `getPage` methods to fetch promotions data.
*   Migrated `promotions.component.html` by reusing the `feed.component.html` template as in the original project.
*   Migrated `search.component.ts` to a standalone component, extending `FeedComponent` and correctly calling its super constructor with necessary services. Updated the constructor to use `ActivatedRoute` for `searchKey` parameter and trigger the search. Removed old dependencies.
*   Migrated `search.component.html` by reusing the `feed.component.html` template as in the original project.
*   Migrated `terms.component.ts` to a standalone component, and updated `ngOnInit` to be `ngOnInit(): void`. The HTML was copied directly as it contains static content.
*   Migrated `terms.component.html` by copying the static content directly.
*   Migrated `complaint.service.ts` to use `HttpClient`.
*   Migrated `config.service.ts` to use `HttpClient`.
*   Migrated `payment.service.ts` to use `HttpClient`.
*   Migrated `promotion.service.ts` to use `HttpClient`.
*   Migrated `roost.service.ts` to use `HttpClient`.
*   Migrated `session.service.ts` to use `HttpClient`.
*   Migrated `user.service.ts` to use `HttpClient`.
*   Iteratively built the project, fixing compilation errors related to component imports, property initialization, and template syntax.

**Remaining Tasks:**

1.  Continue migrating other components and services, addressing any new errors that arise.
2.  Implement modern modal and notification systems (replacing the `TODO` comments in `app.component.ts`).
3.  Verify the functionality of the rewritten application through testing.
4.  Replace the old project with the new `rooster-new` project once the migration is complete and verified.