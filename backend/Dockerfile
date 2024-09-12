# Use an official Node runtime as the base image
FROM node:18
# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY ./backend/package.json ./
COPY ./backend/pnpm-lock.yaml ./
COPY ./backend/tsconfig.json ./
COPY ./backend/src/ ./src
COPY ./backend/run-migrations.js ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Build the app
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["pnpm", "start"]
