FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Build stage
FROM base AS build
WORKDIR /app

# Build-time arguments
ARG NODE_ENV=production
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SHEETS_MACRO_URL
ARG NEXT_PUBLIC_CV_URL

# Set environment variables for build
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SHEETS_MACRO_URL=$NEXT_PUBLIC_SHEETS_MACRO_URL
ENV NEXT_PUBLIC_CV_URL=$NEXT_PUBLIC_CV_URL

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with caching
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build the Next.js app
RUN pnpm run build

FROM base AS deploy
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.ts ./
COPY --from=build /app/node_modules ./node_modules

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
   CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["pnpm", "start"]

