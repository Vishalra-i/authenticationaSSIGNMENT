# Backend Dockerfile
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json (if present) to install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 4000

# Set the command to run the backend app
CMD ["npm", "run", "dev"]
