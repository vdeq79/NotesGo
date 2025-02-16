# Stage 1: Build the React frontend
FROM node:18 AS frontend-builder

WORKDIR /app/ui

# Copy the frontend source code
COPY ui/package.json ui/package-lock.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY ui/ ./

# If you have a TypeScript configuration file, ensure it's copied
COPY ui/tsconfig.json ./

# Build the React app
RUN npm run build

# Stage 2: Build the Go backend
FROM golang:1.24 AS backend-builder

WORKDIR /app/backend

# Copy the backend source code
COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go build -o server

# Stage 3: Create the final image
FROM alpine:3.18

WORKDIR /app

# Copy the Go server binary
COPY --from=backend-builder /app/backend/server .

# Copy the React build
COPY --from=frontend-builder /app/ui/build ./ui/build

# Install necessary packages
RUN apk add --no-cache ca-certificates

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./server"]