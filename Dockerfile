# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

ARG REACT_APP_SERVER_DOMAIN_NAME

ENV REACT_APP_SERVER_DOMAIN_NAME=$REACT_APP_SERVER_DOMAIN_NAME

COPY package*.json /app/
COPY .npmrc /app/

# Install project dependencies
# Using npm ci for more reliable builds in production
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Install a lightweight static server to serve the build
RUN npm install -g serve

EXPOSE 8080

# Modify the CMD to listen on all interfaces
CMD ["npx", "serve", "-s", "build", "-l", "8080"]