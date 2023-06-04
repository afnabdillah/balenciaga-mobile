FROM node:18.12.1

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]