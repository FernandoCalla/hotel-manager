FROM node:16

# Create app directory
# RUN mkdir /app
WORKDIR /app

COPY package*.json ./


# COPY . .

RUN npm install

COPY . .

RUN npm run build



EXPOSE 3000

CMD npm start