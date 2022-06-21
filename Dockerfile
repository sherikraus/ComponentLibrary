FROM alpine:3

# Create app directory
WORKDIR /usr/src/app

RUN apk add --update npm

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Bundle app source
COPY . .

#expose same port used in server.js
EXPOSE 3000

#spin up the app
RUN npm run build
CMD npm run server
