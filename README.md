# EduManage — CodSoft Task 1

A full-stack Student Management System built for the CodSoft Full Stack Web Development Internship.

## Features

- Dashboard with student, teacher, attendance, fee and examination statistics
- Student CRUD: create, search, edit and delete
- Teacher directory
- Attendance records
- Examination results and grades
- Fee/payment tracking
- Academic records
- PostgreSQL database
- Prisma ORM
- Responsive dashboard UI

## Technology

- Next.js 16
- React 19
- TypeScript
- Prisma
- PostgreSQL
- CSS

## Requirements

- Node.js 20.9+
- PostgreSQL 14+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a PostgreSQL database named `student_management`.

3. Copy `.env.example` to `.env` and update `DATABASE_URL`.

4. Generate Prisma Client:

```bash
npm run db:generate
```

5. Push the schema:

```bash
npm run db:push
```

6. Seed sample data:

```bash
npm run db:seed
```

7. Start the application:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Important

Do not commit `.env`, passwords, API keys or other secrets to GitHub.

## Demo data

The seed creates sample students, teachers, attendance, exam results, fees and academic records.
