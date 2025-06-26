FROM node:18

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8080

# Démarre le serveur Node (Express + SSR)
CMD ["sh", "/app/start.sh"]
