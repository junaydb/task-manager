# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build project**: `pnpm build` or `npm run build` (runs TypeScript compilation and Vite build)
- **Lint code**: `pnpm lint` or `npm run lint`
- **Preview production build**: `pnpm preview` or `npm run preview`

## Project Architecture

This is a React + TypeScript frontend application for a kanban-style task management system that connects to a backend API. The application features infinite scrolling, real-time task management, and responsive design.

### Key Technologies & Dependencies

- **Framework**: React 19.0.0 with TypeScript 5.7.2
- **Build Tool**: Vite 6.3.1 with React plugin
- **State Management**: TanStack Query (React Query) 5.74.4 for server state and caching
- **Forms**: React Hook Form 7.56.1 with custom validation functions
- **HTTP Client**: Axios 1.9.0 for API communication
- **Styling**: Tailwind CSS 4.1.11 with custom design system
- **UI Components**: Shadcn/ui components built on Radix UI primitives
- **Icons**: Lucide React 0.534.0
- **Animations**: tw-animate-css 1.3.6
- **Utilities**: clsx 2.1.1 and tailwind-merge 3.3.1 for conditional styling
- **Performance**: react-intersection-observer 9.16.0 for infinite scroll

### Project Structure

```
frontend/
├── src/
│   ├── components/                 # React components
│   │   ├── ui/                     # Shadcn UI primitive components
│   │   │   ├── badge.tsx           # Status badges with variants
│   │   │   ├── button.tsx          # Button component with variants
│   │   │   ├── card.tsx            # Card layouts
│   │   │   ├── context-menu.tsx    # Right-click context menus
│   │   │   ├── dialog.tsx          # Modal dialogs
│   │   │   ├── form.tsx            # Form components
│   │   │   ├── input.tsx           # Input fields
│   │   │   ├── label.tsx           # Form labels
│   │   │   ├── radio-group.tsx     # Radio button groups
│   │   │   └── textarea.tsx        # Text areas
│   │   ├── CreateTaskModal.tsx     # Modal form for creating new tasks
│   │   ├── DeleteConfirmation.tsx  # Task deletion confirmation dialog
│   │   ├── Footer.tsx              # App footer with GitHub commit info
│   │   ├── LoadingSpinner.tsx      # Reusable loading indicator
│   │   ├── ModalButton.tsx         # Reusable modal wrapper component
│   │   ├── SearchModal.tsx         # Global task search functionality
│   │   ├── SelectStatusForm.tsx    # Task status change form
│   │   ├── TaskCard.tsx            # Individual task display component
│   │   └── TaskColumn.tsx          # Kanban column with infinite scroll
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn for className merging)
│   ├── util/
│   │   ├── fetchers.ts             # API client functions using axios
│   │   ├── helpers.ts              # Business logic utilities
│   │   └── hooks.ts                # Custom React Query hooks
│   ├── App.tsx                     # Root component with QueryClientProvider
│   ├── Home.tsx                    # Main kanban board layout
│   ├── index.css                   # Tailwind CSS with custom theme
│   ├── main.tsx                    # React app entry point
│   ├── types.ts                    # TypeScript type definitions (temporary)
│   ├── validators.tsx              # Form validation functions
│   └── vite-env.d.ts              # Vite environment types
├── components.json                 # Shadcn UI configuration
├── eslint.config.js               # ESLint configuration (flat config)
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── pnpm-lock.yaml                 # Package manager lockfile
├── tsconfig.json                  # TypeScript configuration (references)
├── tsconfig.app.json              # App-specific TypeScript config
├── tsconfig.node.json             # Node-specific TypeScript config
└── vite.config.ts                 # Vite build configuration
```

### API Integration

- **Base URL**: `http://localhost:3000/api/tasks` (configurable via `VITE_API_BASE_URL`)
- **Client**: Axios instance with request/response interceptors for error handling
- **Data Fetching**: Custom hooks in `src/util/hooks.ts` wrap TanStack Query operations
- **Types**: Currently duplicated in `src/types.ts` (marked for future removal when backend types are shared)
- **Error Handling**: Comprehensive error handling with typed `ErrorPayload` interface

### Component Architecture

#### Core Components

1. **TaskColumn** (`src/components/TaskColumn.tsx`): Kanban column with infinite scrolling

   - Uses `useGetNextPage` hook for pagination
   - Intersection Observer for scroll detection
   - Status-based task filtering

2. **TaskCard** (`src/components/TaskCard.tsx`): Individual task display

   - Click to open detailed modal view
   - Right-click context menu for quick actions
   - Status badges and due date formatting
   - Inline status change and delete functionality

3. **CreateTaskModal** (`src/components/CreateTaskModal.tsx`): Task creation form

   - React Hook Form with comprehensive validation
   - Time rounding to 30-minute intervals
   - Success state with "Add Another Task" option

4. **SearchModal** (`src/components/SearchModal.tsx`): Global search functionality
   - Real-time search filtering across all tasks
   - Empty states for different scenarios

#### UI Component System

- **Shadcn/ui Integration**: Consistent design system built on Radix UI
- **Variant-based Components**: Using `class-variance-authority` for component variants
- **Theme System**: Custom Tailwind theme with CSS variables for light/dark mode support

### State Management Patterns

1. **Server State**: TanStack Query handles all API data with intelligent caching
2. **Form State**: React Hook Form for complex form validation and submission
3. **Local UI State**: React's useState for modal visibility and component-specific state
4. **Derived State**: Computed values from props and server state (search filtering, etc.)

### Task Management Flow

#### Status Progression

Tasks follow a standard kanban flow: `TODO` → `IN_PROGRESS` → `DONE`

#### Available Operations

- **Create**: Full form with title, description, due date/time
- **Update Status**: Radio button selection with immediate feedback
- **Delete**: Confirmation dialog with optimistic updates
- **Search**: Global search across all task titles

### API Endpoints Used

- `POST /` - Create new task
- `GET /page` - Paginated task retrieval with cursor-based pagination
- `GET /all` - Retrieve all tasks (for search functionality)
- `GET /count` - Get total task count
- `GET /:id` - Retrieve single task by ID
- `PATCH /status/:id` - Update task status
- `DELETE /:id` - Delete task

### Environment Configuration

- **API Base URL**: Configurable via `VITE_API_BASE_URL` environment variable
- **Default**: `http://localhost:3000/api/tasks`

