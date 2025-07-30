# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack
- **Framework**: Angular 2.3.1 (legacy Angular 2.x)
- **CLI**: Angular CLI 1.0.0-beta.26 (early beta)
- **Language**: TypeScript 2.0.3
- **Package Manager**: npm
- **Build Tool**: Angular CLI with Webpack

## Key Commands
- Development server: `ng serve --port 80 --host 0.0.0.0`
- Build: `ng build` (add `-prod` for production)
- Unit tests: `ng test` (Karma + Jasmine)
- E2E tests: `ng e2e` (Protractor)
- Generate components: `ng generate component component-name`
- Generate services: `ng generate service service-name`

## Architecture Overview
**Social media platform ("Rooster")** with these core features:
- User authentication and profiles
- Content creation (posts with images/audio/video)
- Search functionality
- Payment processing (PayU integration)
- Promotions/ads system
- Complaints management

## Directory Structure
```
src/app/
├── components/          # Feature components (landing, home, feed, profile, etc.)
├── services/           # Core services (user, roost, payment, session, etc.)
├── shared/            # TypeScript models (user.ts, roost.ts, tag.ts, etc.)
└── directives/        # Custom directives (googleplace.directive.ts)
```

## Core Services
- **RoostService**: Main content API interactions
- **UserService**: User management and profiles
- **PaymentService**: Payment processing
- **SessionService**: Authentication and session handling
- **PromotionService**: Promotional content
- **ComplaintService**: User complaints management

## Key Models
- **User**: User profile data
- **Roost**: Content posts with media
- **Tag**: Content categorization
- **Comment**: User comments on posts

## API Configuration
- Base URL: `http://52.43.46.127:80/api/` (configured in environment files)
- Token-based authentication
- RESTful API pattern
- File uploads via FormData

## Development Notes
- **Legacy Stack**: Built in 2016-2017 with early Angular 2.x
- **Mobile Responsive**: Uses Bootstrap 3.3.7
- **UI Framework**: Angular Material 2.0.0-alpha.8-2 (early alpha)
- **Icons**: Font Awesome + Ionicons + Google Material Icons
- **Third-party**: Facebook SDK, Google Places API, PayU integration

## Testing Setup
- **Unit Tests**: Karma 1.2.0 + Jasmine 2.5.2
- **E2E Tests**: Protractor 4.0.13 + Jasmine
- **Coverage**: Istanbul/remap-istanbul

## Environment Files
- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

## Legacy Characteristics
- Early Angular CLI beta version
- Angular Material in alpha stage
- Uses jQuery alongside Angular (anti-pattern)
- Manual HTTP handling (pre-HttpClient module)
- No modern RxJS operators