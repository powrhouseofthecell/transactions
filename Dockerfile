# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Expose the port that the Express app will run on
EXPOSE 3000

# Set the command to start the Express app
CMD ["pnpm", "start"]
