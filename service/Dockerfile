# Use official Node.js runtime as base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy app source code
COPY dist .

# Start the application
CMD [ "node", "index.js" ]