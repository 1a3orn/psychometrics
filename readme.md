# Local Run:

export $(grep -v '^#' .env.development.docker | xargs) && docker compose -f docker-compose.dev.yml up
