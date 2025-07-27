# Welcome to the Task Management API

## Table of Contents

- [General response format](#general-response-format)
- [Endpoints](#endpoints)
- [Errors](#errors)

## General response format

All responses are JSON objects and always have a top level `success` boolean property to indicate if the response succeeded.

Successful responses will have a `data` property too:

```json
{
  "success": true,
  "data": {...}
}
```

Error responses will have a `message` property and in some cases an `errors` property with detailed parameter error information:

```json
{
  "success": false,
  "message": "Invalid parameters. See errors property for details.",
  "errors": [
    {
      "param": "sortOrder",
      "message": "Invalid enum value. Expected 'ASC' | 'DESC', received 'ASCc'"
    }
  ]
}
```

## Endpoints

- [GET /all](#get-all) – Returns all tasks
- [GET /page](#get-page) – Returns tasks paginated
- [GET /:id](#get-id) – Returns the task with id `:id`
- [GET /count](#get-count) – Returns the total number of tasks
- [POST /](#save-task) – Saves a task
- [PATCH /status/:id](#update-status) – Updates the status of an existing task
- [DELETE /:id](#delete-id) – Deletes the task with id `:id`

<a name="get-all"></a>

---

#### GET `/all` – Returns all tasks

- **200 Response**

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 109,
        "title": "Example",
        "description": "Example",
        "status": "TODO",
        "due_date": "2025-04-25T16:40:00Z",
        "created_at": "2025-04-25T16:40:00Z"
      }
    ]
  }
  ```

---

<a name="get-page"></a>

#### GET `/page` – Returns tasks paginated

- **Query Parameters:**

  - `status`: 'TODO', 'IN_PROGRESS' or 'DONE'
  - `sortBy`: 'created' or 'dueDate'
  - `sortOrder`: 'ASC' or 'DESC'
  - `pageSize`: Number
  - `cursor`: base64 encoded cursor for pagination (not required for first page)

- **200 Response**

  ```json
  {
    "success": true,
    "data": {
      "tasks": [
        {
          "id": 3,
          "title": "Example",
          "description": "Example",
          "status": "DONE",
          "due_date": "2025-05-26T17:00:00Z",
          "created_at": "2025-04-20T07:30:00Z"
        }
      ],
      "meta": {
        "cursor": "eyJwcmV2SWQiOjY1LCJwcmV2Q3JlYXRlZEF0IjoiMjAyNS0wNC0yMFQyMzowMDowMC4wMDBaIn0="
      }
    }
  }
  ```

---

<a name="get-id"></a>

#### GET `/tasks/:id` – Returns the task with id `:id`

- **200 Response**

  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Example",
      "description": "Example",
      "status": "TODO",
      "due_date": "2025-05-25T09:00:00Z",
      "created_at": "2025-04-20T07:00:00Z"
    }
  }
  ```

---

<a name="get-count"></a>

#### GET `/count` – Returns the total number of tasks

- **200 Response**

  ```json
  {
    "success": true,
    "data": {
      "count": 128
    }
  }
  ```

---

<a name="save-task"></a>

#### POST `/` – Saves a task

- **Request Body**

  ```json
  {
    "title": "Your title here",
    "status": "TODO" | "IN_PROGRESS" | "DONE",
    "due_date": "2025-07-19T17:00:00Z",
    "description": "A test task"
  }
  ```

- **200 Response**

  ```json
  {
    "success": true,
    "data": {
      "task": {
        "id": 137,
        "title": "Example",
        "description": "Example",
        "status": "TODO",
        "due_date": "2025-07-19T17:00:00Z",
        "created_at": "2025-04-27T14:34:02Z"
      }
    }
  }
  ```

---

<a name="update-status"></a>

#### PATCH `/status/:id` – Updates the status of an existing task

- **Request Body**

  ```json
  {
    "status": "TODO" | "IN_PROGRESS" | "DONE"
  }
  ```

- **200 Response**

  ```json
  {
    "success": true,
    "data": {
      "new_status": "TODO"
    }
  }
  ```

---

<a name="delete-id"></a>

#### DELETE `/tasks/:id` – Deletes the task with id `:id`

- **200 Response**

  ```json
  {
    "success": true
  }
  ```

---

## Errors

### 404 Response

When fetching from any endpoint that can return one or more tasks, a 404 response means that the task/tasks do not exist. The response will have the format:

```json
{
  "success": false,
  "message": "Task(s) not found"
}
```

### 400 Response

When fetching from any endpoint, a 400 response means that incorrect parameters were sent. The response will detail what parameters were incorrect and have the following format:

```json
{
  "success": false,
  "message": "Invalid parameters. See errors property for details.",
  "errors": [
    {
      "param": "sortOrder",
      "message": "Invalid enum value. Expected 'ASC' | 'DESC', received 'ASCc'"
    }
  ]
}
```
