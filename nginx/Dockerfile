FROM nginx

EXPOSE 80

RUN rm /usr/share/nginx/html/*

COPY configs/default.conf /etc/nginx/conf.d/default.conf
COPY ./configs/certs /etc/nginx/certs

CMD ["nginx", "-g", "daemon off;"]