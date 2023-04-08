FROM node:16.13.1

RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app

RUN npm install -g @angular/cli@15.2.5

COPY ./ ./