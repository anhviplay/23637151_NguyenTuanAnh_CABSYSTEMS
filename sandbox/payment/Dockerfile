FROM node:24-alpine
WORKDIR /app
RUN mkdir -p /data && chown node:node /data
COPY --chown=node:node server.mjs server.test.mjs ./
USER node
ENV PORT=3000 DATABASE_PATH=/data/payments.sqlite
CMD ["node", "server.mjs"]
