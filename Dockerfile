# Multi-stage build for Nuxt frontend
FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

#=================================
# Development stage
#=================================
FROM base AS development

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Development command
CMD ["npm", "run", "dev"]

#=================================
# Build stage
#=================================
FROM base AS build

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

#=================================
# Production stage
#=================================
FROM node:20-alpine AS production

# Install system dependencies
RUN apk add --no-cache \
    curl \
    dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nuxt -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies (skip scripts to avoid nuxt prepare)
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy built application from build stage
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output

# Create necessary directories with proper permissions
RUN mkdir -p /app/.nuxt/dist \
    && chown -R nuxt:nodejs /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/_health || exit 1

# Switch to non-root user
USER nuxt

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", ".output/server/index.mjs"]