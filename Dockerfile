FROM node:8
RUN npm install
RUN vue config --set packageManager npm
COPY . .
RUN npm run build
CMD ["node", "server.js"]
