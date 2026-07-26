# Chapter 3 – Functional Requirements

# 3.1 Authentication & Authorization

## 3.1 Overview

The Authentication and Authorization module is responsible for securely identifying users, validating their credentials, issuing authentication tokens, protecting system resources, and enforcing role-based access control.

The module supports two authenticated roles:

* User
* Admin

Unauthenticated visitors may browse publicly available content but shall not access protected resources or perform authenticated operations.

Authentication shall be implemented using JSON Web Tokens (JWT) together with a Refresh Token mechanism to provide secure and scalable session management.

Passwords shall never be stored in plain text and shall always be stored in hashed form.

Version 1.0 does not include email verification, self-service password recovery, or multi-factor authentication.

---

# 3.1.1 Functional Requirements

---

## FR-AUTH-001

### Title

User Registration

### Description

The system shall allow a visitor to create a new User account by providing the required registration details.

### Primary Actor

Visitor

### Priority

High

### Preconditions

* Visitor is not authenticated.
* Visitor has access to the registration page.

### Trigger

Visitor submits the registration form.

### Main Flow

1. Visitor enters the required registration information.
2. System validates all input fields.
3. System verifies that the email address is unique.
4. System verifies that the username is unique.
5. System hashes the password.
6. System creates the User account.
7. System assigns the **User** role.
8. System assigns the **Active** account status.
9. System stores the account.
10. System returns a successful registration response.

### Alternate Flows

**A1**

Email already exists.

Registration is rejected.

**A2**

Username already exists.

Registration is rejected.

**A3**

Validation fails.

Registration is rejected.

### Postconditions

* User account exists.
* User role is assigned.
* Account status is Active.

### Business Rules

* Public registration shall always create a User account.
* Public registration shall never create an Admin account.

### Acceptance Criteria

* Username is unique.
* Email is unique.
* Password is securely hashed.
* Registration succeeds with valid information.

---

## FR-AUTH-002

### Title

User Login

### Description

The system shall authenticate registered users using their email address and password.

### Primary Actor

User / Admin

### Priority

High

### Preconditions

* Account exists.
* Account status is Active.

### Trigger

User submits login credentials.

### Main Flow

1. User enters email and password.
2. System locates the account.
3. System verifies password hash.
4. System verifies account status.
5. System generates Access Token.
6. System generates Refresh Token.
7. System stores Refresh Token.
8. System returns authentication response.

### Alternate Flows

* Invalid credentials.
* Account inactive.
* Internal authentication failure.

### Postconditions

Authenticated session is established.

### Acceptance Criteria

* Correct credentials produce valid tokens.
* Invalid credentials are rejected.
* Inactive users cannot log in.

---

## FR-AUTH-003

### Title

JWT Access Token Generation

### Description

The system shall issue a JWT Access Token after successful authentication.

### Business Rules

* Expiry = 1 Hour
* Contains UserId
* Contains Role
* Contains Token Identifier
* Digitally signed

### Acceptance Criteria

* Valid JWT generated.
* Token expires after one hour.

---

## FR-AUTH-004

### Title

Refresh Token Management

### Description

The system shall issue and maintain Refresh Tokens for authenticated sessions.

### Business Rules

* Refresh Token validity = 7 Days.
* Refresh Token stored securely.
* Refresh Token shall be replaced after every successful refresh operation.
* Previous Refresh Token becomes invalid.

### Acceptance Criteria

* Refresh Token rotation succeeds.
* Previous token becomes unusable.

---

## FR-AUTH-005

### Title

Access Token Renewal

### Description

The system shall allow authenticated users to obtain a new Access Token using a valid Refresh Token.

### Main Flow

1. Refresh Token received.
2. Token validated.
3. Token expiration checked.
4. Previous Refresh Token revoked.
5. New Access Token generated.
6. New Refresh Token generated.
7. Response returned.

### Acceptance Criteria

* Expired Refresh Token rejected.
* Invalid Refresh Token rejected.
* New token pair generated successfully.

---

## FR-AUTH-006

### Title

User Logout

### Description

The system shall terminate the authenticated session.

### Main Flow

1. User requests logout.
2. Refresh Token revoked.
3. Authentication cookies removed.
4. Session terminated.

### Acceptance Criteria

* Revoked Refresh Token cannot be reused.

---

## FR-AUTH-007

### Title

Password Security

### Description

The system shall securely manage user passwords.

### Business Rules

* Passwords shall never be stored in plain text.
* Passwords shall always be hashed before storage.
* Password verification shall compare hashes only.
* Password changes require the current password.

### Acceptance Criteria

* Database never contains plain-text passwords.

---

## FR-AUTH-008

### Title

Authorization

### Description

The system shall authorize access based on authenticated user roles.

### Business Rules

Visitors

* Public resources only.

Users

* Learning functionality.

Admins

* Administrative functionality.

### Acceptance Criteria

* Unauthorized requests return HTTP 401 or HTTP 403.
* Users cannot access Admin resources.

---

## FR-AUTH-009

### Title

Session Management

### Description

The client application shall maintain authenticated sessions using secure cookies.

### Business Rules

* Access Token stored in a secure cookie.
* Refresh Token stored in a secure cookie.
* Tokens removed during logout.
* Expired Access Tokens require refresh.

### Acceptance Criteria

* Session persists until logout or Refresh Token expiry.

---

## FR-AUTH-010

### Title

Account Status Validation

### Description

The system shall validate the account status before allowing authentication.

### Business Rules

Supported account statuses:

* Active
* Inactive

Only Active accounts may authenticate.

### Acceptance Criteria

* Inactive accounts cannot log in.
* Admins may deactivate and reactivate accounts.

---

# 3.2 User Profile Management

## 3.2.1 Overview

The User Profile Management module enables authenticated users to maintain their personal profile information within the AlgoArena platform. The profile stores user-specific information that is independent of authentication and authorization.

Each registered user shall have exactly one user profile. The system shall automatically create the profile immediately after successful user registration.

User profile information is used throughout the platform to personalize the user experience, display user information, and support future platform features.

Authentication-related information such as email address, username, password, account status, and role are managed separately by the Authentication & Authorization module.

---

## 3.2.2 Profile Lifecycle

The user profile lifecycle is defined as follows:

```text
Visitor
    │
Register
    │
User Account Created
    │
User Profile Automatically Created
    │
Login
    │
View Profile
    │
Update Profile
```

Business Rules:

* Every registered user shall own exactly one user profile.
* A user profile shall be automatically created immediately after successful registration.
* Users cannot manually create or delete their profile.
* Users may update their profile information at any time after authentication.
* Administrators may view and manage user profiles through the administrative portal.

---

# 3.2.3 Profile Information

Each user profile shall contain the following information.

| Field               | Required | Maximum Length | Notes                         |
| ------------------- | -------- | -------------- | ----------------------------- |
| Profile Picture URL | No       | 500            | Stores image URL only         |
| First Name          | Yes      | 50             | Required                      |
| Middle Name         | No       | 50             | Optional                      |
| Last Name           | Yes      | 50             | Required                      |
| Country Code        | No       | 10             | Optional                      |
| Phone Number        | No       | 20             | Optional and unique           |
| Gender              | Yes      | Lookup         | References Gender master data |
| Date of Birth       | No       | —              | Date only                     |
| Bio                 | No       | 500            | Plain text                    |

---

# 3.2.4 Functional Requirements

---

## FR-PROFILE-001

### Title

View User Profile

### Description

The system shall allow an authenticated user to view their complete profile information.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.

### Main Flow

1. User opens the profile page.
2. System retrieves the user's profile.
3. System displays all available profile information.

### Postconditions

No data is modified.

### Acceptance Criteria

* Complete profile information is displayed successfully.
* Only the authenticated user's profile is displayed.

---

## FR-PROFILE-002

### Title

Automatic Profile Creation

### Description

The system shall automatically create a user profile immediately after successful account registration.

### Primary Actor

System

### Priority

High

### Trigger

Successful completion of `FR-AUTH-001`.

### Main Flow

1. User account is created.
2. System creates the associated user profile.
3. Default values are assigned where applicable.
4. Profile is linked to the user account.

### Postconditions

A one-to-one relationship exists between the user and the user profile.

### Business Rules

* Users cannot create profiles manually.
* Exactly one profile shall exist for every user account.

### Acceptance Criteria

* Profile is automatically created.
* Duplicate profiles cannot exist for a user.

---

## FR-PROFILE-003

### Title

Update User Profile

### Description

The system shall allow authenticated users to update their profile information.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.
* User profile exists.

### Main Flow

1. User edits profile information.
2. System validates submitted data.
3. System updates the profile.
4. Updated profile is returned.

### Alternate Flows

* Validation failure.
* Duplicate phone number.

### Postconditions

Updated information is persisted.

### Acceptance Criteria

* Valid information is saved successfully.
* Invalid information is rejected.

---

## FR-PROFILE-004

### Title

Upload or Update Profile Picture

### Description

The system shall allow authenticated users to upload or replace their profile picture.

### Primary Actor

User

### Priority

Medium

### Main Flow

1. User uploads an image.
2. Image is stored by the configured storage provider.
3. Storage provider returns the image URL.
4. System updates the `ProfilePictureUrl`.
5. Updated profile is returned.

### Postconditions

Profile picture URL references the uploaded image.

### Acceptance Criteria

* Database stores only the image URL.
* Binary image data is not stored in SQL Server.

---

## FR-PROFILE-005

### Title

Profile Validation

### Description

The system shall validate all profile information before persisting any changes.

### Primary Actor

System

### Priority

High

### Validation Rules

The system shall enforce Business Rules **BR-USER-001 through BR-USER-008** before persisting profile information. for:

* First Name
* Middle Name
* Last Name
* Phone Number
* Country Code
* Gender
* Date of Birth
* Bio
* Profile Picture URL

### Acceptance Criteria

* Invalid data shall not be persisted.
* Validation errors shall identify the affected field.

---

## FR-PROFILE-006

### Title

View User Profile (Administrator)

### Description

The system shall allow administrators to view the profile information of registered users for management and support purposes.

### Primary Actor

Administrator

### Priority

Medium

### Preconditions

* Administrator is authenticated.
* Administrator has the required permissions.

### Main Flow

1. Administrator selects a user.
2. System retrieves the associated profile.
3. System displays the profile information.

### Postconditions

No data is modified.

### Acceptance Criteria

* Administrators can view any user profile.
* Regular users cannot view the private profiles of other users.

---

# 3.2.5 Business Rule References

The User Profile Management module shall comply with the business rules defined in the Business Rules chapter.

| Business Rule ID | Description                |
| ---------------- | -------------------------- |
| BR-USER-001      | Name Validation            |
| BR-USER-002      | Username Validation        |
| BR-USER-003      | Email Validation           |
| BR-USER-004      | Phone Number Validation    |
| BR-USER-005      | Gender Validation          |
| BR-USER-006      | Date of Birth Validation   |
| BR-USER-007      | Bio Validation             |
| BR-USER-008      | Profile Picture Validation |

---

# 3.2.6 Authorization

| Operation                     | User | Admin |
| ----------------------------- | ---- | ----- |
| View Own Profile              | ✓    | ✓     |
| Update Own Profile            | ✓    | ✓     |
| Upload Profile Picture        | ✓    | ✓     |
| View Another User's Profile   | ✗    | ✓     |
| Update Another User's Profile | ✗    | ✓     |

---

# 3.2.7 Audit Requirements

The system shall maintain audit metadata for every user profile.

Each user profile shall maintain the following audit fields:

| Field     | Description                                            |
| --------- | ------------------------------------------------------ |
| CreatedAt | Date and time the profile was created                  |
| UpdatedAt | Date and time of the most recent modification          |
| CreatedBy | Identifier of the actor that created the profile       |
| UpdatedBy | Identifier of the actor that last modified the profile |

Business Rules:

* `CreatedAt` shall be populated automatically when the profile is created.
* `UpdatedAt` shall be updated automatically whenever the profile is modified.
* `CreatedBy` shall reference the system process during automatic profile creation.
* `UpdatedBy` shall reference the authenticated user or administrator who performed the update.

> **Note:** During the database design phase, you may decide to store `CreatedBy` and `UpdatedBy` as nullable foreign keys to the `Users` table, while automatic system actions can use a predefined system account or a null value, depending on the implementation.

---

# 3.2.7 Traceability

| Requirement        | Primary Entity | Future API                            |
| ------------------ | -------------- | ------------------------------------- |
| FR-PROFILE-001     | UserProfiles   | GET /api/profile                      |
| FR-PROFILE-002     | UserProfiles   | Internal registration workflow        |
| FR-PROFILE-003     | UserProfiles   | PUT /api/profile                      |
| FR-PROFILE-004     | UserProfiles   | PUT /api/profile/picture              |
| FR-PROFILE-005     | UserProfiles   | Validation layer                      |
| FR-PROFILE-006     | UserProfiles   | GET /api/admin/users/{userId}/profile |
| FR-PROFILE-007     | UserProfiles   | Internal audit handling               |

---

# 3.3 Education Management

## 3.3.1 Overview

The Education Management module enables authenticated users to manage their educational qualifications within the AlgoArena platform.

A user may possess multiple educational qualifications throughout their academic journey. Therefore, the platform shall support storing multiple education records for each user while allowing one record to be designated as the user's **primary education record**.

Educational qualifications shall be classified using a standardized Education Level lookup. The Education Level identifies the academic stage of a qualification (e.g., Secondary School, Higher Secondary, Diploma, Bachelor's, Master's, Doctorate, Certification) and shall be referenced by each education record to ensure consistency, normalization, and extensibility.

Educational information is primarily used for user profiles, administrative reporting, and future analytics. It is independent of authentication and authorization.

---

## 3.3.2 Entity Relationship

The relationship between users and education records is defined as follows.

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Education 1   Education 2
                  │
                  ▼
           Education 3
```

Relationship:

```text
Users (1) ──────────────── (Many) EducationDetails
```

### Business Rules

* Every education record shall belong to exactly one user.
* Every user shall maintain at least one education record.
* A user may have one or more education records.
* Only one education record may be designated as the **primary education record**.
* The primary education record shall represent the qualification displayed by default on the user's profile.
* The system shall not allow deletion of the only remaining education record.
* If the current primary education record is deleted while other education records exist, the user shall first designate another education record as the primary education record before deletion is completed.

---

# 3.3.3 Education Information

Each education record shall contain the following information.

| Field                   | Required | Maximum Length | Notes                                                             |
| ----------------------- | -------- | -------------- | ----------------------------------------------------------------- |
| Education Level         | Yes      | Lookup         | References the **EducationLevels** lookup entity                  |
| Institute Name          | Yes      | 200            | Official institution name                                         |
| Degree                  | Yes      | 100            | Degree or qualification name                                      |
| Branch / Specialization | Yes      | 100            | Branch or specialization, if applicable                           |
| Passing Year            | Yes      | 4 digits       | Calendar year                                                     |
| IsPrimary               | Yes      | Boolean        | Indicates the primary education displayed on the user's profile   |

## Education Level Lookup

The system shall maintain a standardized **EducationLevels** lookup entity to classify educational qualifications.

Each Education record shall reference exactly one Education Level.

The initial values for the lookup shall include:

| Display Order | Education Level        |
| ------------- | ---------------------- |
| 1             | Secondary School (SSC) |
| 2             | Higher Secondary (HSC) |
| 3             | Diploma                |
| 4             | Bachelor's             |
| 5             | Master's               |
| 6             | Doctorate              |
| 7             | Certification          |

Additional Education Levels may be introduced in future versions without requiring changes to the EducationDetails schema.

---

# 3.3.4 Functional Requirements

## FR-EDU-001

### Title

View Education Details

### Description

The system shall allow authenticated users to view all education records associated with their account.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.

### Main Flow

1. User navigates to the Education section.
2. System retrieves all education records.
3. Records are displayed in chronological order, with the primary education record highlighted.

### Postconditions

No data is modified.

### Acceptance Criteria

* All education records are displayed.
* The primary education record is clearly identified.

---

## FR-EDU-002

### Title

Add Education Record

### Description

The system shall allow authenticated users to add a new education record.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.

### Main Flow

1. User selects **Add Education**.
2. User selects an Education Level and enters the remaining required education information.
3. System validates the submitted data.
4. System stores the education record.

### Alternate Flows

* Validation failure.

### Postconditions

A new education record is created.

### Acceptance Criteria

* Valid records are stored successfully.
* Invalid records are rejected with appropriate validation messages.

---

## FR-EDU-003

### Title

Update Education Record

### Description

The system shall allow authenticated users to update an existing education record.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.
* Education record exists.

### Main Flow

1. User selects an education record.
2. User modifies the Education Level and/or other education information.
3. System validates the updated data.
4. System saves the changes.

### Postconditions

The education record is updated.

### Acceptance Criteria

* Updated information is persisted successfully.
* Validation rules are enforced.

---

## FR-EDU-004

### Title

Delete Education Record

### Description

The system shall allow authenticated users to delete an education record.

### Primary Actor

User

### Priority

Medium

### Preconditions

* User is authenticated.
* Education record exists.

### Main Flow

1. User selects **Delete**.
2. System requests confirmation.
3. User confirms deletion.
4. System removes the education record.

### Alternate Flows

* User cancels deletion.
* The system shall reject deletion if the selected record is the only education record associated with the user.
* If the selected record is the primary education record and additional education records exist, the user shall first designate another education record as the primary education record.

### Postconditions

The selected education record is removed.

### Acceptance Criteria

* The selected record is deleted successfully.
* The system shall prevent a user from having zero education records.
* Exactly one education record shall always be designated as the primary education record.

---

## FR-EDU-005

### Title

Manage Primary Education

### Description

The system shall ensure that only one education record is designated as the user's primary education record.

### Primary Actor

System

### Priority

High

### Main Flow

1. User marks an education record as the primary education record.
2. System removes the primary designation from any previously designated education record.
3. System updates the selected education record.

### Postconditions

Exactly one education record is designated as the primary education record.

### Acceptance Criteria

* Only one primary education record shall exist for a user at any given time.

---

## FR-EDU-006

### Title

View Education Details (Administrator)

### Description

The system shall allow administrators to view the educational qualifications of any registered user.

### Primary Actor

Administrator

### Priority

Medium

### Preconditions

* Administrator is authenticated.

### Main Flow

1. Administrator selects a user.
2. System retrieves all education records.
3. System displays the education history.

### Postconditions

No data is modified.

### Acceptance Criteria

* Administrators can view all education records.
* Regular users cannot access another user's education details.

---

# 3.3.5 Business Rule References

The Education Management module shall comply with the business rules defined in the Business Rules chapter.

| Business Rule ID | Description                        |
| ---------------- | ---------------------------------- |
| BR-EDU-001       | Education Level Lookup Validation  |
| BR-EDU-002       | Institute Name Validation          |
| BR-EDU-003       | Degree Validation                  |
| BR-EDU-004       | Branch / Specialization Validation |
| BR-EDU-005       | Passing Year Validation            |
| BR-EDU-006       | Primary Education Constraint       |

---

# 3.3.6 Authorization

| Operation                       | User | Admin |
| ------------------------------- | ---- | ----- |
| View Own Education              | ✓    | ✓     |
| Add Education                   | ✓    | ✓     |
| Update Own Education            | ✓    | ✓     |
| Delete Own Education            | ✓    | ✓     |
| View Another User's Education   | ✗    | ✓     |
| Modify Another User's Education | ✗    | ✓     |

---

# 3.3.7 Audit Requirements

The system shall maintain audit metadata for every education record.

Each education record shall include:

| Field     | Description                              |
| --------- | ---------------------------------------- |
| CreatedAt | Date and time the record was created     |
| UpdatedAt | Date and time of the latest modification |
| CreatedBy | Identifier of the creator                |
| UpdatedBy | Identifier of the last modifier          |

### Business Rules

* `CreatedAt` shall be set automatically when the record is created.
* `UpdatedAt` shall be updated automatically whenever the record is modified.
* `CreatedBy` shall reference the authenticated user or system process that created the record.
* `UpdatedBy` shall reference the authenticated user or administrator who last modified the record.

---

# 3.3.8 Traceability

| Requirement | Primary Entity   | Future API                                    |
| ----------- | ---------------- | --------------------------------------------- |
| FR-EDU-001  | EducationDetails | `GET /api/profile/education`                  |
| FR-EDU-002  | EducationDetails | `POST /api/profile/education`                 |
| FR-EDU-003  | EducationDetails | `PUT /api/profile/education/{educationId}`    |
| FR-EDU-004  | EducationDetails | `DELETE /api/profile/education/{educationId}` |
| FR-EDU-005  | EducationDetails | Internal business logic                       |
| FR-EDU-006  | EducationDetails | `GET /api/admin/users/{userId}/education`     |

---

# 3.4 Professional Details Management

## 3.4.1 Overview

The Professional Details Management module enables authenticated users to maintain their professional information within the AlgoArena platform.

Professional details help personalize the user experience, support future analytics, and enable administrators to better understand the platform's user base. These details are independent of authentication and authorization.

Each registered user shall have exactly one Professional Details record. The system shall automatically create this record immediately after successful user registration, along with the user profile.

In Version 1.0, the platform stores only the user's **Professional Experience Level**. The data model is intentionally designed to support future expansion with additional professional information such as employer, job title, industry, skills, years of experience, and employment history.

---

# 3.4.2 Entity Relationship

The relationship between users and professional details is defined as follows.

```text
Users (1) ──────────────── (1) ProfessionalDetails
```

Business Rules:

* Every user shall own exactly one Professional Details record.
* The Professional Details record shall be automatically created immediately after successful user registration.
* Users cannot manually create or delete their Professional Details record.
* Users may update their Professional Details after authentication.
* Administrators may view and manage the Professional Details of any registered user.

---

# 3.4.3 Professional Information

Each Professional Details record shall contain the following information.

| Field                         | Required | Maximum Length | Notes                                             |
| ----------------------------- | -------- | -------------- | ------------------------------------------------- |
| Professional Experience Level | Yes      | Lookup         | References the **ExperienceLevels** lookup entity |

---

## Professional Experience Level Lookup

The system shall maintain a standardized **ExperienceLevels** lookup entity to classify the professional experience of users.

Each Professional Details record shall reference exactly one Professional Experience Level.

The initial lookup values shall include:

| Display Order | Professional Experience Level |
| ------------- | ----------------------------- |
| 1             | Student                       |
| 2             | Intern                        |
| 3             | Fresher                       |
| 4             | 0–2 Years                     |
| 5             | 2–5 Years                     |
| 6             | 5–10 Years                    |
| 7             | 10+ Years                     |

Additional Professional Experience Levels may be introduced in future versions without requiring changes to the ProfessionalDetails schema.

The corresponding lookup entity will be defined during the database design phase.

```text
ExperienceLevels
-----------------------------
ExperienceLevelId (GUID)
Name
DisplayOrder
IsActive
```

---

# 3.4.4 Functional Requirements

---

## FR-PROF-001

### Title

View Professional Details

### Description

The system shall allow authenticated users to view their Professional Details.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.

### Main Flow

1. User navigates to the Professional Details section.
2. System retrieves the user's Professional Details.
3. System displays the stored information.

### Postconditions

No data is modified.

### Acceptance Criteria

* Professional Details are displayed successfully.
* Only the authenticated user's Professional Details are displayed.

---

## FR-PROF-002

### Title

Automatic Professional Details Creation

### Description

The system shall automatically create a Professional Details record immediately after successful user registration.

### Primary Actor

System

### Priority

High

### Trigger

Successful completion of **FR-AUTH-001**.

### Main Flow

1. User account is created.
2. System creates the associated Professional Details record.
3. Default values are assigned where applicable.
4. Professional Details are linked to the user account.

### Postconditions

A one-to-one relationship exists between the user and Professional Details.

### Business Rules

* Users cannot create Professional Details manually.
* Exactly one Professional Details record shall exist for every user account.

### Acceptance Criteria

* Professional Details are automatically created.
* Duplicate Professional Details records cannot exist.

---

## FR-PROF-003

### Title

Update Professional Details

### Description

The system shall allow authenticated users to update their Professional Details.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.
* Professional Details record exists.

### Main Flow

1. User selects a **Professional Experience Level**.
2. System validates the submitted information.
3. System updates the Professional Details.
4. Updated information is returned.

### Alternate Flows

* Validation failure.
* Invalid Professional Experience Level.

### Postconditions

Updated information is persisted.

### Acceptance Criteria

* Valid information is saved successfully.
* Invalid information is rejected.

---

## FR-PROF-004

### Title

View Professional Details (Administrator)

### Description

The system shall allow administrators to view the Professional Details of any registered user.

### Primary Actor

Administrator

### Priority

Medium

### Preconditions

* Administrator is authenticated.

### Main Flow

1. Administrator selects a user.
2. System retrieves the Professional Details.
3. System displays the information.

### Postconditions

No data is modified.

### Acceptance Criteria

* Administrators can view Professional Details.
* Regular users cannot access another user's Professional Details.

---

# 3.4.5 Business Rule References

The Professional Details Management module shall comply with the business rules defined in the Business Rules chapter.

| Business Rule ID | Description                                     |
| ---------------- | ----------------------------------------------- |
| BR-PROF-001      | Professional Experience Level Lookup Validation |
| BR-PROF-002      | One-to-One Professional Details Constraint      |

---

# 3.4.6 Authorization

| Operation                                  | User | Admin |
| ------------------------------------------ | ---- | ----- |
| View Own Professional Details              | ✓    | ✓     |
| Update Own Professional Details            | ✓    | ✓     |
| View Another User's Professional Details   | ✗    | ✓     |
| Update Another User's Professional Details | ✗    | ✓     |

---

# 3.4.7 Audit Requirements

The system shall maintain audit metadata for every Professional Details record.

Each Professional Details record shall include:

| Field     | Description                              |
| --------- | ---------------------------------------- |
| CreatedAt | Date and time the record was created     |
| UpdatedAt | Date and time of the latest modification |
| CreatedBy | Identifier of the creator                |
| UpdatedBy | Identifier of the last modifier          |

Business Rules:

* `CreatedAt` shall be set automatically when the record is created.
* `UpdatedAt` shall be be updated automatically whenever the record is modified.
* `CreatedBy` and `UpdatedBy` shall reference the authenticated user or administrator performing the action.

---

# 3.4.8 Traceability

| Requirement | Primary Entity      | Future API                                   |
| ----------- | ------------------- | -------------------------------------------- |
| FR-PROF-001 | ProfessionalDetails | `GET /api/profile/professional`              |
| FR-PROF-002 | ProfessionalDetails | Internal registration workflow               |
| FR-PROF-003 | ProfessionalDetails | `PUT /api/profile/professional`              |
| FR-PROF-004 | ProfessionalDetails | `GET /api/admin/users/{userId}/professional` |

---

# 3.5 Social Media Links Management

## 3.5.1 Overview

The Social Media Links Management module enables authenticated users to manage links to their professional and coding-related online profiles within the AlgoArena platform.

Social media links allow users to showcase their professional presence and coding achievements. These links may be displayed on the user's public profile (subject to future privacy settings) and assist administrators during user support and profile verification.

Each registered user shall have exactly one Social Media Links record. The system shall automatically create this record immediately after successful user registration, together with the User Profile and Professional Details records.

All social media links are optional in Version 1.0.

---

# 3.5.2 Entity Relationship

The relationship between users and social media links is defined as follows.

```text
Users (1) ──────────────── (1) SocialMediaLinks
```

### Business Rules

* Every user shall own exactly one Social Media Links record.
* The Social Media Links record shall be automatically created immediately after successful user registration.
* Users cannot manually create or delete their Social Media Links record.
* Users may update their social media links after authentication.
* Administrators may view and manage the Social Media Links of any registered user.

---

# 3.5.3 Social Media Information

Each Social Media Links record shall contain the following information.

| Field         | Required | Maximum Length | Notes                                   |
| ------------- | -------- | -------------- | --------------------------------------- |
| GitHub URL    | No       | 500            | Valid GitHub profile URL                |
| LinkedIn URL  | No       | 500            | Valid LinkedIn profile URL              |
| Portfolio URL | No       | 500            | Valid personal portfolio or website URL |
| LeetCode URL  | No       | 500            | Valid LeetCode profile URL              |

---

### Business Rules

* All social media fields are optional.
* URLs shall be stored as absolute URLs.
* Each URL shall conform to a valid HTTP or HTTPS URL format.
* Leading and trailing whitespace shall be removed before validation.
* Duplicate URLs across different fields within the same record shall not be permitted.
* Empty strings shall be treated as `NULL`.

---

# 3.5.4 Functional Requirements

---

## FR-SOCIAL-001

### Title

View Social Media Links

### Description

The system shall allow authenticated users to view their Social Media Links.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.

### Main Flow

1. User navigates to the Social Media section.
2. System retrieves the user's Social Media Links.
3. System displays all stored links.

### Postconditions

No data is modified.

### Acceptance Criteria

* All stored social media links are displayed.
* Only the authenticated user's Social Media Links are displayed.

---

## FR-SOCIAL-002

### Title

Automatic Social Media Links Record Creation

### Description

The system shall automatically create a Social Media Links record immediately after successful user registration.

### Primary Actor

System

### Priority

High

### Trigger

Successful completion of **FR-AUTH-001**.

### Main Flow

1. User account is created.
2. System creates the associated Social Media Links record.
3. All social media fields are initialized with `NULL`.
4. The record is linked to the user account.

### Postconditions

A one-to-one relationship exists between the user and Social Media Links.

### Business Rules

* Users cannot manually create Social Media Links.
* Exactly one Social Media Links record shall exist for every user account.

### Acceptance Criteria

* Social Media Links record is automatically created.
* Duplicate Social Media Links records cannot exist.

---

## FR-SOCIAL-003

### Title

Update Social Media Links

### Description

The system shall allow authenticated users to add, update, or remove their social media links.

### Primary Actor

User

### Priority

High

### Preconditions

* User is authenticated.
* Social Media Links record exists.

### Main Flow

1. User updates one or more social media fields.
2. System validates each URL.
3. System stores the updated information.
4. Updated information is returned.

### Alternate Flows

* Invalid URL format.
* Duplicate URLs within the same record.

### Postconditions

Updated information is persisted.

### Acceptance Criteria

* Valid URLs are saved successfully.
* Invalid URLs are rejected with appropriate validation messages.
* Users may clear previously stored URLs.

---

## FR-SOCIAL-004

### Title

View Social Media Links (Administrator)

### Description

The system shall allow administrators to view the Social Media Links of any registered user.

### Primary Actor

Administrator

### Priority

Medium

### Preconditions

* Administrator is authenticated.

### Main Flow

1. Administrator selects a user.
2. System retrieves the Social Media Links.
3. System displays all stored links.

### Postconditions

No data is modified.

### Acceptance Criteria

* Administrators can view the Social Media Links of any registered user.
* Regular users cannot view another user's private Social Media Links through administrative endpoints.

---

# 3.5.5 Business Rule References

The Social Media Links Management module shall comply with the business rules defined in the Business Rules chapter.

| Business Rule ID | Description                              |
| ---------------- | ---------------------------------------- |
| BR-SOCIAL-001    | URL Format Validation                    |
| BR-SOCIAL-002    | Supported URL Scheme Validation          |
| BR-SOCIAL-003    | Duplicate URL Constraint                 |
| BR-SOCIAL-004    | One-to-One Social Media Links Constraint |

---

# 3.5.6 Authorization

| Operation                                | User | Admin |
| ---------------------------------------- | ---- | ----- |
| View Own Social Media Links              | ✓    | ✓     |
| Update Own Social Media Links            | ✓    | ✓     |
| View Another User's Social Media Links   | ✗    | ✓     |
| Update Another User's Social Media Links | ✗    | ✓     |

---

# 3.5.7 Audit Requirements

The system shall maintain audit metadata for every Social Media Links record.

Each Social Media Links record shall include:

| Field     | Description                              |
| --------- | ---------------------------------------- |
| CreatedAt | Date and time the record was created     |
| UpdatedAt | Date and time of the latest modification |
| CreatedBy | Identifier of the creator                |
| UpdatedBy | Identifier of the last modifier          |

### Business Rules

* `CreatedAt` shall be set automatically when the record is created.
* `UpdatedAt` shall be updated automatically whenever the record is modified.
* `CreatedBy` and `UpdatedBy` shall reference the authenticated user or administrator performing the action.

---

# 3.5.8 Traceability

| Requirement   | Primary Entity   | Future API                                   |
| ------------- | ---------------- | -------------------------------------------- |
| FR-SOCIAL-001 | SocialMediaLinks | `GET /api/profile/social-links`              |
| FR-SOCIAL-002 | SocialMediaLinks | Internal registration workflow               |
| FR-SOCIAL-003 | SocialMediaLinks | `PUT /api/profile/social-links`              |
| FR-SOCIAL-004 | SocialMediaLinks | `GET /api/admin/users/{userId}/social-links` |

---

# 3.6 Category Management

## 3.6.1 Overview

The Category Management module enables administrators to organize coding and learning content into broad subject areas.

Categories represent the highest level of the AlgoArena content taxonomy and provide a structured framework for organizing Topics and, consequently, Problems. This hierarchical organization improves navigation, search, filtering, reporting, and future extensibility.

Categories are managed exclusively by administrators. Visitors and authenticated users may browse published categories but cannot create, modify, or delete them.

The platform shall support the following taxonomy hierarchy:

```text
Category
    │
    └── Topic
            │
            └── Problem
```

Each Topic shall belong to exactly one Category, while each Category may contain zero or more Topics.

---

# 3.6.2 Entity Relationship

The relationship between Categories and Topics is defined as follows.

```text
Categories (1) ──────────────── (Many) Topics
```

### Business Rules

* Every Category shall have a globally unique identifier (GUID).
* Every Category shall have a unique name.
* Every Category shall have a unique URL-friendly slug.
* A Category may contain zero or more Topics.
* Every Topic shall belong to exactly one Category.
* Categories are managed exclusively by Administrators.
* Categories shall be available for public browsing only when they are in the **Published** state.
* Category identifiers shall use the SQL Server `uniqueidentifier` data type.

---

# 3.6.3 Category Information

Each Category shall contain the following information.

| Field              | Required | Maximum Length | Notes                                                           |
| ------------------ | -------- | -------------- | --------------------------------------------------------------- |
| Name               | Yes      | 100            | Unique category name                                            |
| Slug               | Yes      | 150            | Unique URL-friendly identifier generated from the category name |
| Description        | No       | 500            | Plain text description                                          |
| Display Order      | Yes      | Integer        | Controls display sequence                                       |
| Publication Status | Yes      | Lookup         | References `ContentStatuses` lookup entity                      |
| IsActive           | Yes      | Boolean        | Indicates whether the category is active                        |

---

## Category Slug Rules

The Category Slug shall be used for user-friendly URLs and route generation throughout the platform.

Business Rules:

* The slug shall be unique across all Categories.
* The slug shall be generated automatically from the Category Name during creation.
* The slug shall contain only lowercase alphabetic characters, digits, and hyphens (`-`).
* Spaces shall be replaced with hyphens.
* Special characters shall be removed.
* Consecutive hyphens shall be collapsed into a single hyphen.
* Administrators may edit the slug provided uniqueness and formatting rules are maintained.

### Examples

| Category Name               | Generated Slug                |
| --------------------------- | ----------------------------- |
| Data Structures             | `data-structures`             |
| Database Management Systems | `database-management-systems` |
| Object-Oriented Programming | `object-oriented-programming` |

Example URL:

```text
/categories/data-structures
```

---

## Publication Status Lookup

The platform shall maintain a standardized **ContentStatuses** lookup entity.

Each Category shall reference one Content Status.

The initial values shall include:

| Display Order | Status       |
| ------------- | ------------ |
| 1             | Draft        |
| 2             | Under Review |
| 3             | Published    |
| 4             | Archived     |

---

## Category Naming Rules

* Category names shall be unique.
* Maximum length: 100 characters.
* Leading and trailing whitespace shall be removed.
* Empty strings shall not be accepted.
* Category names shall be case-insensitively unique.

Examples:

* Data Structures
* Algorithms
* Database Management Systems
* Operating Systems
* Object-Oriented Programming

---

# 3.6.4 Functional Requirements

---

## FR-CAT-001

### Title

View Categories

### Description

The system shall allow Visitors, Users, and Administrators to browse Categories according to their authorization level.

### Primary Actor

Visitor, User, Administrator

### Priority

High

### Main Flow

1. User opens the Categories page.
2. System retrieves all visible Categories.
3. Categories are displayed according to their Display Order.

### Acceptance Criteria

* Visitors and Users shall see only Published Categories.
* Administrators shall see Categories in all publication states.

---

## FR-CAT-002

### Title

Create Category

### Description

The system shall allow Administrators to create a new Category.

### Primary Actor

Administrator

### Priority

High

### Preconditions

* Administrator is authenticated.

### Main Flow

1. Administrator selects **Create Category**.
2. Administrator enters the required information.
3. System validates the submitted data.
4. Category is created with the selected Publication Status.
5. System stores the Category.

### Alternate Flows

* Duplicate Category name.
* Validation failure.

### Acceptance Criteria

* Valid Categories are created successfully.
* Duplicate Category names are rejected.

---

## FR-CAT-003

### Title

Update Category

### Description

The system shall allow Administrators to update an existing Category.

### Primary Actor

Administrator

### Priority

High

### Main Flow

1. Administrator selects a Category.
2. Administrator updates one or more fields.
3. System validates the changes.
4. System saves the updated Category.

### Acceptance Criteria

* Changes are persisted successfully.
* Validation rules are enforced.

---

## FR-CAT-004

### Title

Manage Category Publication

### Description

The system shall allow Administrators to manage the publication lifecycle of a Category.

### Primary Actor

Administrator

### Priority

High

### Supported States

```text
Draft
   │
Under Review
   │
Published
   │
Archived
```

### Acceptance Criteria

* Only Published Categories are publicly visible.
* Archived Categories remain stored for audit purposes.
* Invalid publication state transitions shall be rejected according to business rules.

---

## FR-CAT-005

### Title

Delete Category

### Description

The system shall allow Administrators to delete a Category only when no Topics are associated with it.

### Primary Actor

Administrator

### Priority

Medium

### Preconditions

* Administrator is authenticated.
* Category exists.

### Main Flow

1. Administrator selects **Delete Category**.
2. System checks for associated Topics.
3. If no Topics exist, the Category is deleted.

### Alternate Flows

* One or more Topics are associated with the Category.
* Administrator cancels deletion.

### Acceptance Criteria

* Categories with associated Topics shall not be deleted.
* Appropriate validation messages shall be displayed.

---

# 3.6.5 Business Rule References

| Business Rule ID | Description                            |
| ---------------- | -------------------------------------- |
| BR-CAT-001       | Category Name Validation               |
| BR-CAT-002       | Category Slug Validation               |
| BR-CAT-003       | Unique Category Name Constraint        |
| BR-CAT-004       | Unique Category Slug Constraint        |
| BR-CAT-005       | Category Publication Status Validation |
| BR-CAT-006       | Category Display Order Validation      |
| BR-CAT-007       | Category Deletion Constraint           |
| BR-CAT-008       | Category Identifier (GUID) Constraint  |

---

# 3.6.6 Authorization

| Operation                   | Visitor | User | Admin |
| --------------------------- | ------- | ---- | ----- |
| Browse Published Categories | ✓       | ✓    | ✓     |
| View Draft Categories       | ✗       | ✗    | ✓     |
| Create Category             | ✗       | ✗    | ✓     |
| Update Category             | ✗       | ✗    | ✓     |
| Delete Category             | ✗       | ✗    | ✓     |
| Manage Publication Status   | ✗       | ✗    | ✓     |

---

# 3.6.7 Audit Requirements

The system shall maintain audit metadata for every Category.

Each Category shall include:

| Field     | Description                                  |
| --------- | -------------------------------------------- |
| CreatedAt | Date and time the Category was created       |
| UpdatedAt | Date and time of the latest modification     |
| CreatedBy | Administrator who created the Category       |
| UpdatedBy | Administrator who last modified the Category |

### Business Rules

* `CreatedAt` shall be assigned automatically when the Category is created.
* `UpdatedAt` shall be updated automatically whenever the Category is modified.
* `CreatedBy` and `UpdatedBy` shall reference authenticated Administrator accounts.

---

# 3.6.8 Traceability

| Requirement | Primary Entity | Future API                                        |
| ----------- | -------------- | ------------------------------------------------- |
| FR-CAT-001  | Categories     | `GET /api/categories`                             |
| FR-CAT-002  | Categories     | `POST /api/admin/categories`                      |
| FR-CAT-003  | Categories     | `PUT /api/admin/categories/{categoryId}`          |
| FR-CAT-004  | Categories     | `PATCH /api/admin/categories/{categoryId}/status` |
| FR-CAT-005  | Categories     | `DELETE /api/admin/categories/{categoryId}`       |

---
