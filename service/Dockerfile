# Use official Node.js runtime as base image
FROM node:20-slim

ARG TESLA_API_KEY

# Create app directory
WORKDIR /usr/src/app

# Copy app source code
COPY dist .
COPY .api ./.api
COPY node_modules ./node_modules

ENV TESLA_API_KEY=${TESLA_API_KEY}

# Start the application
CMD [ "node", "index.js" ]