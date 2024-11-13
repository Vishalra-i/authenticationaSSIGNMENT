# Frontend Dockerfile
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the frontend app
CMD ["npm", "run", "dev"]
