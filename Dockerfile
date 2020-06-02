FROM nginx:1.16.1-alpine

WORKDIR /app

COPY ./build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx"]