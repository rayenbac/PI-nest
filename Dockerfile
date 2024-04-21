# Utilisation d'une image Node.js comme base
FROM node:14-alpine

# Création du répertoire de travail dans l'image Docker
WORKDIR /app

# Copie des fichiers du projet dans l'image Docker
COPY . .

# Installation des dépendances du projet
RUN npm install

# Exposition du port sur lequel l'application va écouter
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npm", "start"]
