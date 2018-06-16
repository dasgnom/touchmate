FROM node:8-alpine

RUN apk update && apk add nginx git
RUN git clone https://github.com/telegnom/touchmate.git
WORKDIR /touchmate
RUN yarn && yarn build && mkdir -p /srv/touchmate && cp -r index.html dist/ src/ node_modules/ /srv/touchmate && mkdir -p /run/nginx && \
      cp nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80:80
CMD /usr/sbin/nginx -g 'daemon off;'

