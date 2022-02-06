# use alpine node image
FROM node:17.4.0-alpine3.14

ARG BUILDPLATFORM=linux/x86_64

# install 
RUN apk add --no-cache git bash curl postgresql cmake

# work dir
RUN mkdir matchstick
WORKDIR /matchstick

# volume
# VOLUME [ "/matchstick" ]

# ports
EXPOSE 9000/udp
EXPOSE 9000/tcp
