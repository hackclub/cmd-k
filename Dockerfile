# Use official Node.js LTS image
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the SvelteKit app
RUN npm run build

# Production image
FROM node:20-alpine AS prod
WORKDIR /app

# Only copy production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy built app from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/.svelte-kit ./svelte-kit
COPY --from=build /app/static ./static
COPY --from=build /app/.env* ./

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the SvelteKit app
CMD ["node", "build"]
