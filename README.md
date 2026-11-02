# React-Native---Next.js-Learning-Project

## Prerequisites

- Node.js: ^24.12.0
- pnpm: 12.2.0
- Docker

## Installing and running the project

1. Create `.env` file and set up variables, run the command in root dir and `apps/mobile`:

```bash
    cp .env.example .env
```

2. Install packages:

```bash
    pnpm install
```

3. Set up databases by starting Docker services:

```bash
    pnpm db:up
```

To connect to Postgres database with `psql` run (Use `test_db` instead of `POSTGRES_DB` for test database):

```bash
    docker compose exec postgres_db psql -U <POSTGRES_USER> -d <POSTGRES_DB>
```

To reset databases and erase local data run:

```bash
    pnpm db:reset
```

... Or to restart without erasing data:

```bash
    pnpm db:restart
```

To end services run:

```bash
    pnpm db:down
```

To connect to Postgres database via GUI client use following values for fields:

- Host: `127.0.0.1`
- Port: `POSTGRES_PORT` (`5432` by default)
- User: `POSTGRES_USER`
- Password: `POSTGRES_PASSWORD`
- DB name: `POSTGRES_DB` (`test_db` for test database)

4. Run dev:

```bash
    pnpm turbo dev
```

... Or build:

```bash
    pnpm turbo build
```

## Running the mobile app

To run the mobile app check mobile app [README](apps/mobile/README.md)
