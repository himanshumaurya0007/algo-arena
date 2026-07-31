Create a modern, premium, responsive multi-step User Profile Page for my project "AlgoArena – AI Powered Interview Preparation Platform."

Theme:
- Use the attached color palette.
- Primary Color: Orange (#F9A826)
- Secondary Color: Teal (#2E6E73)
- Background: White
- Dark Mode: Dark Gray (#1F232B)
- Cards with rounded corners (16px)
- Soft shadows
- Smooth animations
- Professional UI similar to GitHub, LinkedIn and LeetCode.
- Fully responsive for Mobile, Tablet and Desktop.

Route:
/users/profile
Example:
/users/profile

---------------------------------------------------
PAGE STRUCTURE
---------------------------------------------------

Create a Stepper/Wizard having 4 steps.

Top Progress Bar

Step 1 → Basic Details
Step 2 → Education
Step 3 → Professional
Step 4 → Social Links

Show current step with orange highlight.

Buttons:
Previous
Next
Save Draft
Submit Profile

---------------------------------------------------
STEP 1 : BASIC DETAILS
---------------------------------------------------

Profile Picture Upload

Cover Image Upload

Fields

First Name

Last Name

Username (readonly)

Email

Phone Number

Gender

Date of Birth

City

State

Country

Bio (textarea)

Current Role
(Student / Fresher / Working Professional)

Preferred Programming Language

Experience Level

Interests (chips)

Resume Upload (PDF)

Portfolio Tagline

Character counter for Bio.

---------------------------------------------------
STEP 2 : EDUCATION DETAILS
---------------------------------------------------

Allow multiple education cards.

Each education card contains

College Name

University

Degree

Branch

Specialization

CGPA

Percentage

Passing Year

Start Year

End Year

Current Semester

Achievements

Add Education Button

Delete Education Button

---------------------------------------------------
STEP 3 : PROFESSIONAL DETAILS
---------------------------------------------------

Experience

Company Name

Job Title

Internship

Freelancer

Current Working

Joining Date

Ending Date

Skills

Programming Languages

Frameworks

Databases

Developer Tools

Certifications

Projects

Project Name

Description

GitHub Link

Live Demo Link

Tech Stack

Achievements

Languages Known

Expected Job Role

Preferred Work Location

Salary Expectation

Open to Relocation (Yes/No)

---------------------------------------------------
STEP 4 : SOCIAL MEDIA LINKS
---------------------------------------------------

GitHub

LinkedIn

Portfolio Website

LeetCode

CodeChef

Codeforces

HackerRank

GeeksforGeeks

Twitter/X

Instagram

YouTube

Medium

Dev.to

Hashnode

Personal Blog

---------------------------------------------------
VALIDATION
---------------------------------------------------

Required fields validation.

Email validation.

Phone validation.

URL validation.

Image preview before upload.

Resume PDF preview.

Unsaved changes warning.

---------------------------------------------------
DESIGN
---------------------------------------------------

Left Sidebar

Dashboard

Practice

Courses

Mock Interview

Articles

Leaderboard

Profile

Settings

Logout

Main Content

Glassmorphism cards.

Hover animations.

Animated progress indicator.

Fade-in transitions.

Skeleton loading.

Beautiful empty states.

Success snackbar after saving.

---------------------------------------------------
TECH STACK
---------------------------------------------------

React.js

Tailwind CSS

React Hook Form

React Router

Lucide React Icons

Framer Motion

React Dropzone

React Select

---------------------------------------------------
CODE STRUCTURE
---------------------------------------------------

Generate complete production-ready React code.

Folder Structure

/pages/Profile

/components/Profile

ProfileStepper.jsx

BasicDetails.jsx

EducationDetails.jsx

ProfessionalDetails.jsx

SocialLinks.jsx

EducationCard.jsx

ProjectCard.jsx

Sidebar.jsx

TopNavbar.jsx

ProgressStepper.jsx

ProfileService.js

validation.js

dummyProfileData.js

Use reusable components.

Use clean architecture.

Use dummy JSON data.

Separate validation logic.

Responsive code.

Accessible UI.

Professional comments.

Follow React best practices.