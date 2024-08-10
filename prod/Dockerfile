# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Install sharp package
RUN yarn install sharp

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Create a production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install production dependencies
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production && yarn cache clean

# Copy the build output and next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Expose the port the app runs on
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s CMD curl -f http://localhost:3000/ || exit 1

# Command to run the application
CMD ["yarn", "start"]