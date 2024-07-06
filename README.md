# Nextjs Express

<!--toc:start-->

- [Nextjs Express](#nextjs-express)
  - [Tools and Tech](#tools-and-tech)
  - [How to run](#how-to-run)
    - [Run Postgresql on docker](#run-postgresql-on-docker)
  - [How to test](#how-to-test)
  - [Credit](#credit)
  <!--toc:end-->

## Tools and Tech

- Infrastructure
  - Turborepo
  - Docker
  - Husky
  - Commitlint
  - Lint-staged
  - Release-it
- Front-End
  - Nextjs 14
  - UI
    - Chakra UI
  - form
    - react-hook-form
    - Validation form (yup)
  - Authenticate
    - login
    - logout
    - getme
    - refresh token
    - HttpOnly Cookie
  - middleware
  - Redux toolkit
- Back-End
  - Express
  - Logger
  - Response Handler
  - Error Handler
  - Database
    - Postgresql
    - Prisma ORM
  - Validation(Joi)
  - Testing(Vitest)

## How to run

### Run Postgresql on docker

```bash
make dev-postgres-local
```

## How to test

```bash
yarn workspace api test:int
yarn workspace api test:int -t [filter]
yarn workspace api test:int:watch
yarn workspace api test:cov
```

## Credit

[chakra-templates](https://chakra-templates.vercel.app/)
