# Job Portal

TechStack: NestJs, NextJs, Postgres, Cloudinary

## Table of Contents

- [Link Demo](#link-demo)
- [Dbdiagram](#dbdiagram)
- [Architecture Diagram](#architecture-diagram)
- [Project Structure](#project-structure)
- [Precondition](#precondition)
- [Running the Application](#running-the-application)
- [Contributor](#contributor)
- [Contact](#contact)

---

## [Link Demo](https://intern-assignment-cyan.vercel.app)

## Dbdiagram

![Dbdiagram](/images/db.png)

## Architecture Diagram

![Architecture diagram](/images/architecture.webp)

## Project Structure

    demo1
    ├── backend/
    │   ├── src/
    │   │   ├── api
    │   │   ├── app
    │   │   ├── database/
    │   │   │   ├── migrations
    │   │   │   └── seeds/
    │   │   │       └── index.js
    │   │   └── main.js
    │   └── tsconfig.json
    ├── frontend/
    │   ├── api
    │   ├── app/
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   └── components
    ├── docker-compose.yml
    ├── docker.env
    ├── .husky
    └── .prettierrc

## Precondition

- Node.js >= 18.x (I use version 22.15.0)
- yarn
- Docker

## Running the Application

### Step 1: Clone the Repository

```bash
git clone https://github.com/seannguyen0705/demo1
cd demo1
```

### Step 2: Check guideline run backend

[Guideline run backend](/backend//README.md)

### Step 3: Check guideline run frontend

[Guideline run frontend](/frontend//README.md)

### Step 4: Open service

```bash
    http://localhost:3000 (Front-End)
    http://localhost:8080 (Back-End)
    postgresql://root:root@localhost/demo1 (PostgreSQL)

```

⚠️ Notice:

- If you encounter any issues while running the application, don’t hesitate to contact me.

# Contributor

- Nguyen Nhat Phap (GOS)

# Contact

- ✉️ sean.nguyen.goldenowl@gmail.com
