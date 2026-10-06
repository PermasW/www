FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node package.json server.mjs ./
COPY --chown=node:node index.html privacy.html styles.css app.js ./public/
COPY --chown=node:node hero.webp permas-logo.png ./public/assets/
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
