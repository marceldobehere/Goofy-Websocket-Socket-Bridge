FROM node:16-bullseye


WORKDIR /srv
COPY . .
WORKDIR /srv
RUN npm install
WORKDIR /srv
ENTRYPOINT [ "bash", "entry.sh" ]