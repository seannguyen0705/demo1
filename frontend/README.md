# Job Portal - Guideline run frontend

## TechStack:

- NextJS 15
- Tanstack query (cache & fetching data)
- Date-fns
- Sentry (Error handle service)
- Multi-theme (light/dark)
- Recharts (staticstics)

## Table of Contents

- [Link Website](#link-website)
- [Project Structure](#project-structure)
- [Precondition](#precondition)
- [Running the Application](#running-the-application)
- [Contributor](#contributor)
- [Contact](#contact)

---

## [Link Website](https://intern-assignment-cyan.vercel.app)

## Project Structure

    frontend/
    ├── api
    ├── app/
    │   ├── (auth)
    │   ├── (private)
    │   ├── (root)
    │   ├── hooks
    │   ├── page.tsx
    │   └── layout.tsx
    ├── components
    ├── config
    ├── lib
    ├── provider
    ├── public
    └── utils

## Precondition

- Node.js >= 18.x (I use version 22.15.0)
- yarn
- Docker

## Running the Frontend

### Step 1: Create file .env in folder frontend

demo1/frontend/.env

```bash
BACKEND_URL = http://localhost:8080

```

### Step 3: Install package

```bash
yarn
```

### Step 4: Build App

```bash
yarn build
```

### Step 5: Start app

```bash
yarn start
```

### Step 6: Open app

```bash
http://localhost:3000
```

# Contributor

- Nguyen Nhat Phap (GOS)

# Contact

- ✉️ sean.nguyen.goldenowl@gmail.com
