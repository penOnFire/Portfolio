# Build stage
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Production stage: serve with nginx
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 from the container
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
