FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY shared ./shared
COPY services ./services
COPY gateway ./gateway
COPY proto ./proto
USER node
CMD ["node", "shared/launch.mjs"]
