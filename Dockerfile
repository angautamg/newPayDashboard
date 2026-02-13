# FROM ubuntu:latest
# RUN apt-get update
# RUN apt-get install -y curl

# # Pull the Node.js Docker image:
# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# RUN apt-get upgrade -y
# RUN apt-get install -y nodejs

# COPY package*.json  package.json
# COPY package-lock.json  package-lock.json
# COPY 
# RUN npm install
# Use Node.js official image (Alpine for small footprint)
ARG NODE_VERSION=20.20.0-alpine
FROM node:${NODE_VERSION} AS dev

ENV NODE_ENV=development

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm install

# Copy all source files
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Start the Angular dev server
CMD ["npm", "start", "--", "--host=0.0.0.0"]
    