# Use an official lightweight Nginx image
FROM nginx:alpine

# Remove the default server definition
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx config
COPY ./docker/default.conf /etc/nginx/conf.d/

# Copy the static site files to the nginx server directory
COPY ./Frontend /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# # Start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]