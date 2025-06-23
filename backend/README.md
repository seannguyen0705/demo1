# Job Portal - Guideline run backend

## TechStack:

- NestJs
- JWT (Authen)
- Sentry (Error handle service)
- TypeORM
- Nodemailer (Email service)
- PostgreSQL
- Cloudinary (store file)

## Table of Contents

- [Link API document](#link-api-document)
- [Project Structure](#project-structure)
- [Precondition](#precondition)
- [Running the Application](#running-the-application)
- [Contributor](#contributor)
- [Contact](#contact)

---

## [Link API document](https://be.smartserve.click/api/documentation)

## Project Structure

          backend/
          ├── src/
          │   ├── api
          │   ├── app
          │   ├── database/
          │   │   ├── migrations
          │   │   └── seeds/
          │   │       └── index.js
          │   └── main.js
          ├── tsconfig.json
          └── package.json

## Precondition

- Node.js >= 18.x (I use version 22.15.0)
- yarn
- Docker

## Running the Backend

### Step 1: Run containers (Postgres)

```bash
docker compose up -d
```

### Step 2: Create file .env in folder backend

demo1/backend/.env

```bash
DB_TYPE= postgres
DB_HOST= localhost
DB_PORT= 5432
DB_NAME= demo1
DB_USERNAME= root
DB_PASSWORD= root
DB_SSL = false


PORT= 8080

JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_RESET_PASSWORD_SECRET=
JWT_ACTIVE_ACCOUNT_SECRET=

GITHUB_CALLBACK_URL = http://localhost:8080/api/v1/github/callback
GITHUB_CLIENT_ID =
GITHUB_CLIENT_SECRET =

GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
GOOGLE_CALLBACK_URL = http://localhost:8080/api/v1/google/callback

LINKEDIN_CLIENT_ID =
LINKEDIN_CLIENT_SECRET =
LINKEDIN_CALLBACK_URL = http://localhost:8080/api/v1/linkedin/callback

FRONTEND_URL =http://localhost:3000

CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
CLOUDINARY_CLOUD_NAME =

MAIL_PASSWORD =
MAIL_USERNAME =

DOMAIN = localhost

SENDGRID_FROM_NOREPLY_EMAIL =
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

```

### Step 3: Install packages & Run migration (at backend folder)

```bash
yarn  # install packages
yarn migration:run # run migration

```

### Step 4: Seed data

```bash
yarn db:seed
```

### Step 5: Build backend

```
  yarn build
```

### Step 6: Start backend

```
  yarn start
```

### Step 7: Open API document

```bash
http://localhost:8080/api/document
```

# Contributor

- Sean Nguyen (GOS)

# Contact

- ✉️ sean.nguyen.goldenowl@gmail.com
