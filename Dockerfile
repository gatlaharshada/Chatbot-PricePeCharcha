# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source code
COPY . .

# Copy frontend build files to serve statically
# COPY ../frontend ./frontend
# The above line causes error because ../frontend is outside the build context.
# Instead, copy frontend build files manually into backend/frontend before building the Docker image,
# or build the Docker image from the project root and update paths accordingly.

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
