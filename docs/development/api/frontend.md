# AlgoArena Frontend API Catalog (User APIs)

## Authentication APIs

| HTTP Method | API Endpoint              | Description                                                  |
| ----------- | ------------------------- | ------------------------------------------------------------ |
| POST        | `/api/auth/register`      | Register a new user account.                                 |
| POST        | `/api/auth/login`         | Authenticate a user and return access and refresh tokens.    |
| POST        | `/api/auth/refresh-token` | Generate a new access token using a valid refresh token.     |
| POST        | `/api/auth/logout`        | Logout the current user by invalidating the refresh token.   |
| GET         | `/api/auth/me`            | Retrieve information about the currently authenticated user. |

---

## User Profile APIs

| HTTP Method | API Endpoint                    | Description                                          |
| ----------- | ------------------------------- | ---------------------------------------------------- |
| GET         | `/api/users/me/profile`         | Retrieve the authenticated user's profile details.   |
| PUT         | `/api/users/me/profile`         | Update the authenticated user's profile information. |
| PUT         | `/api/users/me/profile-picture` | Upload or update the user's profile picture.         |
| PUT         | `/api/users/me/password`        | Change the user's account password.                  |

---

## Metadata APIs

These APIs provide the metadata required to populate filters on the Problem List page.

| HTTP Method | API Endpoint   | Description                                                                                 |
| ----------- | -------------- | ------------------------------------------------------------------------------------------- |
| GET         | `/api/domains` | Retrieve all available programming domains (e.g., Algorithms, Database, Shell, JavaScript). |
| GET         | `/api/tags`    | Retrieve all available problem tags (e.g., Array, Graph, Dynamic Programming).              |

---

## Problem APIs

| HTTP Method | API Endpoint                        | Description                                                                                |
| ----------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| GET         | `/api/problems`                     | Retrieve the list of problems with optional filtering, searching, sorting, and pagination. |
| GET         | `/api/problems/{slug}`              | Retrieve the complete details of a specific problem.                                       |

### Supported Query Parameters (`GET /api/problems`)

| Query Parameter | Description                           | Example             |
| --------------- | ------------------------------------- | ------------------- |
| `search`        | Search problems by title or keywords. | `search=two`        |
| `domain`        | Filter by programming domain.         | `domain=algorithms` |
| `tag`           | Filter by one or more tags.           | `tag=array`         |
| `difficulty`    | Filter by difficulty level.           | `difficulty=easy`   |
| `status`        | Filter by user progress.              | `status=solved`     |
| `page`          | Page number.                          | `page=2`            |
| `pageSize`      | Number of records per page.           | `pageSize=20`       |
| `sortBy`        | Field used for sorting.               | `sortBy=title`      |
| `sortOrder`     | Sorting direction (`asc` or `desc`).  | `sortOrder=asc`     |

---

## Code Execution APIs

| HTTP Method | API Endpoint       | Description                                                                                |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------ |
| POST        | `/api/code/run`    | Execute the submitted code against sample/custom test cases without saving the submission. |
| POST        | `/api/submissions` | Submit code for evaluation against hidden test cases and create a submission record.       |

---

## Submission APIs

| HTTP Method | API Endpoint                      | Description                                                |
| ----------- | --------------------------------- | ---------------------------------------------------------- |
| GET         | `/api/submissions`                | Retrieve the authenticated user's submissions.             |
| GET         | `/api/submissions/{submissionId}` | Retrieve detailed information about a specific submission. |

### Supported Query Parameters (`GET /api/submissions`)

| Query Parameter | Description                          | Example              |
| --------------- | ------------------------------------ | -------------------- |
| `page`          | Page number.                         | `page=1`             |
| `pageSize`      | Number of submissions per page.      | `pageSize=25`        |
| `status`        | Filter by submission status.         | `status=accepted`    |
| `language`      | Filter by programming language.      | `language=cpp`       |
| `sortBy`        | Field used for sorting.              | `sortBy=submittedAt` |
| `sortOrder`     | Sorting direction (`asc` or `desc`). | `sortOrder=desc`     |

---

## Dashboard APIs

| HTTP Method | API Endpoint               | Description                                                |
| ----------- | -------------------------- | ---------------------------------------------------------- |
| GET         | `/api/users/me/dashboard`  | Retrieve the dashboard summary for the authenticated user. |
| GET         | `/api/users/me/progress`   | Retrieve the user's overall problem-solving progress.      |
| GET         | `/api/users/me/activity`   | Retrieve the user's recent activity history.               |
| GET         | `/api/users/me/statistics` | Retrieve detailed user performance statistics.             |

---

# Example API Requests

## 1. Retrieve All Problems

```http
GET /api/problems
```

---

## 2. Retrieve Easy Problems

```http
GET /api/problems?difficulty=easy
```

---

## 3. Retrieve Algorithm Problems

```http
GET /api/problems?domain=algorithms
```

---

## 4. Retrieve Array Problems

```http
GET /api/problems?tag=array
```

---

## 5. Retrieve Easy Array Problems

```http
GET /api/problems?tag=array&difficulty=easy
```

---

## 6. Search Problems

```http
GET /api/problems?search=two
```

---

## 7. Search Within Algorithms Domain

```http
GET /api/problems?domain=algorithms&search=binary
```

---

## 8. Filter by Multiple Criteria

```http
GET /api/problems?domain=algorithms&tag=graph&difficulty=medium&status=unsolved
```

---

## 9. Pagination

```http
GET /api/problems?page=2&pageSize=20
```

---

## 10. Sorting

```http
GET /api/problems?sortBy=acceptanceRate&sortOrder=desc
```

---

## 11. Complete Example

```http
GET /api/problems?domain=algorithms&tag=array&difficulty=easy&status=unsolved&search=two&page=1&pageSize=20&sortBy=title&sortOrder=asc
```

This single endpoint can power the entire Problem List page.

---

## 12. Retrieve Problem Details

```http
GET /api/problems/two-sum
```

---

## 13. Run Code

```http
POST /api/code/run
```

Request Body

```json
{
  "problemSlug": "two-sum",
  "language": "cpp",
  "sourceCode": "...",
  "stdin": ""
}
```

---

## 14. Submit Solution

```http
POST /api/submissions
```

Request Body

```json
{
  "problemSlug": "two-sum",
  "language": "cpp",
  "sourceCode": "..."
}
```

---

## 15. Retrieve Accepted C++ Submissions

```http
GET /api/submissions?language=cpp&status=accepted&sortBy=submittedAt&sortOrder=desc
```

---

### Recommendation

This API catalog is an excellent foundation for **Version 1.0** of AlgoArena's learner-facing APIs. One enhancement I'd recommend is standardizing the sortable fields for consistency across endpoints. For example:

* **Problems:** `title`, `difficulty`, `acceptanceRate`, `createdAt`
* **Submissions:** `submittedAt`, `runtime`, `memory`, `status`

Defining these allowed values in your API specification will make both the frontend and backend implementations more predictable and easier to validate.
