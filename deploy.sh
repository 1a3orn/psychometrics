#!/bin/bash

# Pull latest changes
git pull origin main

# Build and start containers
# while adding the .env.prod file env variables
export $(grep -v '^#' .env.prod | xargs) && docker-compose -f docker-compose.prod.yml up --build -d

# Run migrations
export $(grep -v '^#' .env.prod | xargs) && docker-compose -f docker-compose.prod.yml run --rm migration

# Remove unused images
docker image prune -f