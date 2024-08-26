# Backend

## Setup

```bash
pnpm install
```

## DB

Make next:

```bash
DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=postgres DB_NAME=postgres pnpm run migration:generate:next
```

Run migrations:

```bash
DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=postgres DB_NAME=postgres pnpm run migration:run
```
