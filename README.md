## Task Manager (DTS Dev Test Submission)

This project was originally created for a developer test. This branch is an archive of my submission.

## Table of Contents

1. [Running the app](#how-to)
2. [Running tests](#test)
3. [About](#tech)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Handling date/times](#datetimes)
4. [API Documentation](#docs)
5. [Future improvements](#plans)

<a name="how-to"></a>

## Running the app

#### Prerequisites

- [Node.js](https://nodejs.org/en)
- Package manager such as [pnpm](https://pnpm.io/).
- [PostgreSQL](https://www.postgresql.org/) and psql

1. Initialise and seed the database:

```
  cd backend
  pnpm init-db && pnpm seed-db
```

2. Start the backend:

```
  cd backend
  pnpm i
  pnpm dev
```

2. Start the frontend:

```
  cd frontend
  pnpm i
  pnpm dev
```

3. Go to http://localhost:5173 on your browser to access the frontend.

If you encounter issues connecting to the database, ensure the credentials in
`backend/.env.local` are compatible with your postgres installation.

<a name="test"></a>

## Running tests

Due to time constraints, only the backend features tests at the moment.

[Vitest](https://vitest.dev/) is used for all tests.

To run backend unit tests, from the `backend` directory, run:

```
pnpm test:unit
```

---

Before running backend integration tests, change the value of `DB_PROD` in `backend/.env.local` to `"false"`,
otherwise integration tests will not run (due to a guard test that ensures this value is false).

Also ensure that you have installed dependencies using your package manager of choice.

To run backend integration tests, from the `backend` directory, run:

```
./run-integration-tests.sh
```

This script creates a test database, runs the integration tests, then deletes the database.

If you run into problems with the script, you can instead run:

```
pnpm init-test-db \
  && pnpm seed-test-db \
  && pnpm test:integration --run \
  && pnpm drop-test-db
```

If tests exit during execution due to an error, run `pnpm drop-test-db` to delete the test database.

<a name="tech"></a>

## About

A full-stack task management system.

---

<a name="backend"></a>

#### Backend

Built using **Node.js**, **TypeScript**, **Hono** (server framework), and **PostgreSQL**.

Supports the following features:

- Saving tasks to the database
- Retrieving all tasks
- Retrieving a single task by id
- Retrieving tasks using cursor-based pagination, by status (with multiple sorting strategies)
- Retrieving the total number of tasks
- Updating the status of a task
- Deleting a task by id

[pgtyped](https://pgtyped.dev/docs/) was used to make all SQL queries type-safe.  
[Zod](https://zod.dev/) was used for validating all request parameters.

---

<a name="frontend"></a>

#### Frontend

Built using **TypeScript**, **React**, **React Hook Form**, **TanStack Query**, and **Vite**.

Users can:

- Create tasks
- View tasks
- Update task status
- Delete tasks

[React Hook Form](https://react-hook-form.com/) was used for validating all user inputs.  
[govuk-react](https://github.com/govuk-react/govuk-react/tree/main) was used for React components that
adhere to the UK government design system.

---

<a name="datetimes"></a>

#### Handling date/times

1. Date/times are sent to the server in ISO 8601 format in UTC time.
2. Database stores date/time in UTC.
3. When a task is fetched, the browser receives the date/time in UTC.
4. Date is converted to local time on the client before being displayed.

<a name="docs"></a>

## Documentation

API Documentation can be found in [`backend/docs`](https://github.com/anon-commit/dts-developer-test-submission/tree/main/backend/docs).

<a name="plans"></a>

## Future improvements

- Increase test coverage
- Add more fallback ui elements to cover all error states
- Implement authentication to support multiple users
- Add search by title/description functionality
