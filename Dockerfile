FROM node:14
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "server.js"]
