FROM node:18

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies en ignorant les conflits de peer dependencies
RUN npm install --legacy-peer-deps

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN ls -la /app
RUN npm run build

RUN chmod +x ./copy_assets.sh
RUN ./copy_assets.sh

EXPOSE 8080
CMD [ "http-server", "dist" ]
