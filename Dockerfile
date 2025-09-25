FROM node:22.18.0

LABEL org.opencontainers.image.authors="Tamer Inawy <tamer.inawy@gmail.com>" \
      org.opencontainers.image.source="https://github.com/tamer-inawy/" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.title="Scuba Logbook API" \
      org.opencontainers.image.description="A RESTful API for managing scuba diving logs."

WORKDIR /usr/src

RUN npm install -g @nestjs/cli@11.0.10

EXPOSE 3000

CMD [ "tail -f /dev/null" ]
