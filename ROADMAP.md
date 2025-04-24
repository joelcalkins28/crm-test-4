# Project Roadmap

## Goal

Build a comprehensive CRM for job seekers, featuring contact management, application tracking, and future Google integrations, deployable on Vercel.

## Phases

### Phase 1: MVP (Minimum Viable Product)

*   [x] Project Setup (Next.js, TypeScript, Tailwind, Prisma, Shadcn/UI)
*   [ ] User Authentication (Google OAuth via NextAuth.js)
*   [ ] Database Schema (User, Account, Contact, Application models)
*   [ ] Basic Contact Management (CRUD operations)
*   [ ] Basic Application Tracking (CRUD operations, link to Contacts)
*   [ ] Basic Dashboard Layout
*   [ ] Deployment Setup (Vercel)

### Phase 2: Core Feature Enhancement

*   [ ] Advanced Contact Features (Tagging, Filtering, Notes)
*   [ ] Advanced Application Features (Status Tracking, Document Uploads)
*   [ ] Dashboard Visualizations (e.g., application status overview)
*   [ ] Refined UI/UX

### Phase 3: Integrations

*   [ ] Google Calendar Integration (View/Create events related to contacts/applications)
*   [ ] Gmail Integration (Link emails, potentially basic actions)

### Phase 4: Polish & Deployment

*   [ ] Comprehensive Testing
*   [ ] Performance Optimization
*   [ ] Final Deployment Checks
*   [ ] Documentation Refinement

## Technology Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/UI
*   **ORM:** Prisma
*   **Database:** PostgreSQL (Vercel Postgres recommended)
*   **Authentication:** NextAuth.js (Google Provider)
*   **Deployment:** Vercel 