# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build the app
RUN pnpm run build

# Expose port (Vite default preview port)
EXPOSE 4173

# Start the app in preview mode
CMD ["pnpm", "run", "preview"]
