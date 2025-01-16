# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire backend directory into the container
COPY . .

# Expose the port that your app will run on (5000)
EXPOSE 5000

# Run the application
CMD ["npm", "run", "dev"]
