# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build project**: `pnpm build` or `npm run build` (runs TypeScript compilation and Vite build)
- **Lint code**: `pnpm lint` or `npm run lint`
- **Preview production build**: `pnpm preview` or `npm run preview`

## Project Architecture

This is a React + TypeScript frontend application for a task management system that connects to a backend API at `localhost:3000/api/tasks`.

## Current Project Goal

The current goal of this project is to repurpose it. Originally, this project was created as a development test.
I now want to rehaul the ui. In order to do this, I want to do the following:

- Remove all GovUK components and replace them with shdacn based components
- Create a more modern ui, something similar to Jira
- The ui should look and do the following:
  - A 3 column layout, similar to Jira, each column from left to right will be:
    - To do, In progress, Done
  - Tasks should be able to be dragged between columnns

### Key Technologies & Patterns

- **State Management**: TanStack Query (React Query) for server state and caching
- **Forms**: React Hook Form with custom validation functions
- **Build Tool**: Vite with TypeScript
- **Component Architecture**: Shadcn/ui integration (configured in `components.json`)

### Project Structure

```
src/
├── components/          # React components
│   ├── CreateTaskForm.tsx    # Main task creation form
│   ├── TaskSection.tsx       # Task list sections by status
│   ├── ModalButton.tsx       # Reusable modal wrapper
│   └── ...
├── util/
│   ├── fetchers.ts      # API client functions using axios
│   ├── hooks.ts         # Custom React Query hooks
│   └── helpers.ts       # Utility functions
├── types.ts             # TypeScript type definitions (temporary duplicates from backend)
├── validators.tsx       # Form validation functions
└── App.tsx              # Root component with QueryClientProvider
```

### API Integration

- **Base URL**: `http://localhost:3000/api/tasks`
- **Client**: Axios instance configured in `src/util/fetchers.ts`
- **Data Fetching**: Custom hooks in `src/util/hooks.ts` wrap TanStack Query operations
- **Types**: Currently duplicated in `src/types.ts` (marked for future removal when backend types are shared)

### Key Patterns

1. **Component Structure**: Components use GOV.UK React library for consistent styling
2. **Form Handling**: React Hook Form with custom validators for title, date, and time validation
3. **State Management**: Server state handled by TanStack Query, local UI state with useState
4. **Error Handling**: Axios errors typed with custom `ErrorPayload` interface
5. **Time Handling**: Custom time rounding logic for 30-minute intervals

### Path Aliases

- `@/*` resolves to `./src/*` (configured in both tsconfig.json and vite.config.ts)
- Shadcn components expect standard aliases: `@/components`, `@/lib/utils`, etc.

### Task Status Flow

Tasks follow a standard kanban flow: `TODO` → `IN_PROGRESS` → `DONE`

