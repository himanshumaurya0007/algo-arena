# Chapter 2 – Overall Description

**Document Version:** 1.0

---

# 2.1 Product Perspective

AlgoArena is a web-based, AI-assisted coding practice and interview preparation platform designed to provide learners with a comprehensive environment for improving programming and problem-solving skills. It combines coding challenges, educational resources, performance analytics, and administrative content management within a single application.

The platform is **not a standalone code execution engine**. Instead, it integrates with external services for code execution while retaining responsibility for user management, content management, submission tracking, analytics, and security.

The initial release adopts a **modular monolithic architecture**, allowing all business modules to be deployed as a single application while maintaining clear separation of concerns. This approach balances simplicity, maintainability, and scalability for the project's current scope.

Key characteristics include:

* Public access to published learning resources.
* Secure authentication and role-based authorization.
* Integration with an external code execution service (Judge0).
* AI-assisted content authoring for admins.
* Extensible architecture to support future modules such as contests and AI learning assistants.

---

# 2.2 System Context

The following logical context describes how AlgoArena interacts with its users and external systems.

```text
                    +--------------------+
                    |     Visitors       |
                    +---------+----------+
                              |
                              v
+--------------------------------------------------------------+
|                      AlgoArena Platform                      |
|                                                              |
|  Authentication  |  Problem Management  |  Learning Content  |
|  User Profiles   |  Submissions         |  Analytics         |
|  Admin Portal    |  AI Content Tools    |  Search            |
+---------+----------------------+-----------------------------+
          |                      |
          |                      |
          v                      v
   +--------------+      +----------------+
   |   Judge0     |      | Generative AI  |
   | Code Engine  |      | API Provider   |
   +--------------+      +----------------+
```

External integrations are intentionally limited in Version 1.0 to keep the system focused and maintainable.

---

# 2.3 Product Functions

At a high level, AlgoArena provides the following capabilities.

## Content Taxonomy

AlgoArena organizes coding content using the following hierarchical structure:

```text
Category
    │
    ├── Topic
    │       │
    │       └── Problem
```

This hierarchy provides a logical organization of educational content and enables users to browse problems efficiently based on broader subject areas and specific concepts.

Example:

```text
Data Structures
    │
    ├── Arrays
    │      ├── Two Sum
    │      ├── Merge Sorted Array
    │
    ├── Linked Lists
    │      ├── Reverse Linked List
    │      ├── Merge Two Sorted Lists
Algorithms
    │
    ├── Dynamic Programming
    ├── Greedy
    ├── Graph Algorithms
```

## Public Features

* Browse categories and topics.
* Search coding problems.
* Read articles.
* Watch embedded educational videos.
* View problem statements and editorials.

## Learner Features

* Register and authenticate.
* Manage personal profile.
* Solve coding problems.
* Submit code for evaluation.
* View submission history.
* Track learning progress.
* Access personalized dashboards.

## Admin Features

* Manage registered user accounts.
* Manage categories and topics.
* Manage coding problems.
* Manage educational content.
* Review and publish AI-assisted content.
* Monitor platform activity.
* View platform statistics.
* Publish and archive content.

## Publication Workflow

All administratively managed content (Problems, Articles, and Videos) follows a controlled publication lifecycle.

```text
Draft
   │
Under Review
   │
Published
   │
Archived
```

### Publication Rules

* Draft content is visible only to Admins.
* Under Review content is intended for internal review and is not publicly accessible.
* Published content becomes available to Visitors and authenticated Users.
* Archived content is retained for historical and auditing purposes but is hidden from public access.

This workflow ensures content quality, supports future collaboration, and maintains version consistency across the platform.

## System Features

* Authentication and authorization.
* Code execution integration.
* Submission evaluation.
* Progress analytics.
* Audit logging.

---

# 2.4 User Classes and Characteristics

The platform supports **three user classes but only two authenticated user roles**.

| User Class | Authentication | Description                          |
| ---------- | -------------- | ------------------------------------ |
| Visitor    | No             | Public visitor browsing the platform |
| User       | Yes            | Registered learner                   |
| Admin      | Yes            | Platform administrator               |

This distinction is important because **Visitor is not a database role**—it is simply an unauthenticated user state.

```text
Visitor
    │
Register
    │
User Account Created
    │
Login
    │
Authenticated User
```

Admin lifecycle:

```text
Development Team
        │
Create Admin Account
        │
Admin
```

Document the following rules:

* Public registration always creates a User account.
* Admin accounts are provisioned outside the application.
* Users cannot request administrative privileges.
* The login page requires only email and password.

## Visitor

Visitors do not authenticate and may:

* Browse public content.
* View published problems.
* Read articles.
* Watch videos.

Restrictions:

* Cannot submit code.
* Cannot access personalized analytics.
* Cannot bookmark content.
* Cannot manage content.

---

## Learner (User)

Learners are authenticated users who:

* Solve coding problems.
* Submit solutions.
* Track progress.
* Manage personal profiles.
* Access submission history.

Expected characteristics:

* Students.
* Fresh graduates.
* Working professionals.
* Interview candidates.

---

## Admin

Admins are authorized personnel responsible for maintaining the platform.

Responsibilities include:

* Content creation.
* Content review.
* User management.
* AI-assisted authoring.
* Content publishing.

Adminis are expected to understand the platform's content standards and review AI-generated suggestions before publication.

---

# 2.5 Operating Environment

The initial release targets a modern web environment.

## Client Environment

Supported browsers:

* Google Chrome (latest)
* Microsoft Edge (latest)
* Mozilla Firefox (latest)
* Safari (latest stable)

Recommended screen resolution:

* 1366 × 768 or higher.

Primary experience:

* Desktop.
* Laptop.

Secondary support:

* Tablet.

## Server Environment

Backend:

* ASP.NET Core Web API

Database:

* Microsoft SQL Server

Hosting:

* Windows Server (IIS) or Linux (Docker + Nginx), depending on deployment strategy.

---

# 2.6 Design and Implementation Constraints

The following constraints apply to Version 1.0.

## Architecture

* Modular Monolithic Architecture.
* RESTful APIs.
* Microsoft SQL Server.

## Entity Identification Strategy

To support scalability, interoperability, and secure resource identification, all primary business entities shall use GUIDs (uniqueidentifier in Microsoft SQL Server) as their primary keys.

Core entities include:

* Users
* Categories
* Topics
* Problems
* Articles
* Videos
* Submissions

Sequential GUID generation should be used where appropriate to reduce index fragmentation while maintaining globally unique identifiers.

## Programming Languages

Supported for code execution:

* C
* C++
* Java
* Python

## Authentication

* JWT Authentication.
* Refresh Token mechanism.
* Two-role authorization model consisting of **User** and **Admin**, with authorization enforced by JWT claims.

## AI

Generative AI is restricted to administrator content authoring.

## Code Execution

Execution relies on Judge0.

---

# 2.7 Assumptions and Dependencies

## Assumptions

* External services remain operational.
* Users possess internet connectivity.
* Modern browsers are available.
* AI-generated content undergoes human review.
* Admin accounts are provisioned before deployment or through secure operational procedures.
* The system assumes that only authorized personnel have access to administrator credentials.

## Dependencies

* Judge0 API.
* Generative AI provider.
* SMTP service (for future email verification and password reset).
* YouTube for embedded editorial videos.

---

# 2.8 High-Level Business Workflow

The core business workflow is as follows:

```text
Visitor
    │
Browse Content
    │
Select Problem
    │
Click "Solve"
    │
Login / Register (if required)
    │
Write Code
    │
Submit Solution
    │
Judge0 Evaluation
    │
Store Submission
    │
Update Statistics
    │
Display Results
```

For admins:

```text
Admin
        │
Login
        │
Admin Dashboard
        │
Create / Update Problem
        │
Generate AI Suggestions
        │
Review AI Suggestions
        │
Save Draft
        │
Publish
```

---

# 2.9 High-Level System Architecture

The system follows a layered modular monolith:

```text
Frontend (React + Vite)
    │
REST APIs
    │
ASP.NET Core API
    │
──────────────────────────
Application Layer
──────────────────────────
Domain Layer
──────────────────────────
Infrastructure Layer
──────────────────────────
Persistence Layer
    │
SQL Server
```

External integrations:

* Judge0
* Generative AI Provider (e.g., OpenAI)

This architecture promotes maintainability and clear separation of concerns.

---

# Add a New Section: 2.10 Authorization Overview

## Roles

* Visitor (unauthenticated)
* User
* Admin

## Authentication

* JWT Access Token
* Refresh Token
* Email + Password login
* Role determined by the backend

## Authorization

| Resource                | Visitor | User | Admin |
| ----------------------- | ------- | ---- | ----- |
| Browse Problems         | ✓       | ✓    | ✓     |
| Browse Articles         | ✓       | ✓    | ✓     |
| Browse Videos           | ✓       | ✓    | ✓     |
| View Editorial          | ✓       | ✓    | ✓     |
| Submit Code             | ✗       | ✓    | ✓     |
| View Submission History | ✗       | ✓    | ✓     |
| View Dashboard          | ✗       | ✓    | ✓     |
| Edit Own Profile        | ✗       | ✓    | ✓     |
| Manage Categories       | ✗       | ✗    | ✓     |
| Manage Topics           | ✗       | ✗    | ✓     |
| Manage Problems         | ✗       | ✗    | ✓     |
| Manage Articles         | ✗       | ✗    | ✓     |
| Manage Videos           | ✗       | ✗    | ✓     |
| Manage Users            | ✗       | ✗    | ✓     |

---

# 2.11 Future Evolution

The architecture is intentionally designed to support future enhancements without significant redesign.

Potential future modules include:

* Coding contests
* AI learning assistant
* AI interview simulator
* Company-specific interview tracks
* Discussion forum
* Gamification
* Notification center
* Collaborative coding sessions
* Mobile application
* Multi-language user interface
