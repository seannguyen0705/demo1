# Job Portal - Guideline run frontend

## TechStack:

- NextJS 15
- Tanstack query (cache & fetching data)
- Date-fns
- Sentry (Error handle service)
- Multi-theme (light/dark)
- Recharts (staticstics)
- Tailwind

## Table of Contents

- [Link Website](#link-website)
- [Project Structure](#project-structure)
- [Precondition](#precondition)
- [Running the Application](#running-the-application)
- [Contributor](#contributor)
- [Contact](#contact)

---

## [Link Website](https://fe.smartserve.click)

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
DOMAIN = localhost

```

### Step 2: Install packages

```bash
yarn
```

### Step 3: Build App

```bash
yarn build
```

### Step 4: Start frontend

```bash
yarn start
```

### Step 5: Open frontend

```bash
http://localhost:3000
```

# Contributor

- Sean Nguyen (GOS)

# Contact

- ✉️ sean.nguyen.goldenowl@gmail.com
