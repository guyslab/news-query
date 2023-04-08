FROM node:16.13.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN mv /app/src/assets/config/appsettings.production.json /app/src/assets/config/appsettings.json
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration
FROM nginx:1.15
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf