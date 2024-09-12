#!/bin/bash

# Pull latest changes
git pull origin main

# Build and start containers
docker-compose -f docker-compose.prod.yml up --build -d

# Run migrations
docker-compose -f docker-compose.prod.yml run --rm migration

# Remove unused images
docker image prune -f