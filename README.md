# React-Native---Next.js-Learning-Project

## Prerequisites

- Node.js: ^24.12.0
- pnpm: 12.2.0
- Docker

## Installing and running the project

1. Create env file and set up variables for root dir and `apps/mobile`:

```bash
    cp .env.example .env
```

2. Install packages:

```bash
    pnpm install
```

3. Run dev:

```bash
    pnpm turbo dev
```

4. Build:

```bash
    pnpm turbo build
```

5. Set up databases by starting `Docker` services:

```bash
    pnpm db:up
```

To connect to `Postgres` database with `psql` run:

```bash
    docker compose exec postgres_db psql -U <POSTGRES_USER> -d <POSTGRES_DB>
```

## Running the mobile app

To run the mobile app check mobile app [README](apps/mobile/README.md)
