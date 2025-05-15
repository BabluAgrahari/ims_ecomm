FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

# Clean previous node_modules and reinstall
RUN rm -rf node_modules && yarn install --force

COPY . .

# Install nodemon globally for watch mode
RUN yarn global add nodemon

CMD ["nodemon", "--watch", ".", "--exec", "yarn", "start"]
