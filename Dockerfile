FROM node:8-alpine

COPY . .
RUN apk update && apk add nginx && yarn && yarn build && mkdir -p /srv/touchmate && cp -r /dist /srv/touchmate && cp /index.html /srv/touchmate && mkdir -p /run/nginx && \
      sed -i 's/return 404/root \/srv\/touchmate/' /etc/nginx/conf.d/default.conf && \
      echo -e "location /v3/ {\nproxy_pass http://localhost:2342/;\n}"

CMD /usr/sbin/nginx -g 'daemon off;'

