FROM node:8
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "server.js"]
