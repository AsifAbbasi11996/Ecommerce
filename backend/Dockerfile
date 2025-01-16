# Use the Node.js LTS image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your backend uses (default: 5000)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
