FROM node:16.13.1

RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app

COPY ./ ./