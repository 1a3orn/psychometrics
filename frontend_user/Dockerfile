# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY /frontend_user/package.json ./
COPY /frontend_user/pnpm-lock.yaml ./
COPY /frontend_user/tsconfig.json ./
COPY /frontend_user/src/ ./src
COPY /frontend_user/public/ ./public

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Build the app
RUN pnpm run build

# Install serve to run the application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]