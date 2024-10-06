## Gestion des recettes

Ceci est l'API backend pour l'application de gestion de recettes, développée avec Express.js. Elle fournit une interface RESTful pour gérer les recettes d'un restaurant delice, permettant de créer, lire, mettre à jour et supprimer des recettes dans une base de données. Le projet inclut des tests unitaires, des outils d'analyse et de formatage de code (ESLint, Prettier), ainsi qu'une containerisation avec **Docker** pour le déploiement.

## Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8 ou supérieure)
- Postman (pour tester l'API)
- Docker (version 20 ou supérieure)

## Installation

Pour configurer le projet, suivez ces étapes :

1. Cloner le dépôt :

```bash
   git clone https://github.com/MohamedSoumare/gestion-recette-delice.git
```

2. Accédez au dossier du projet :

```bash
   cd gestion-recette-delice
```

3. Installer les dépendances :

```bash
   npm install
```

4. Démarrer le serveur :

```bash
  npm start
```

## Configuration de la base de données

1. Importation de la base de données :
   Ouvrez le terminal dans le dossier courant, copiez le commande ci-dessous en remplaçant `UserName` par votre `nom d'utilisateur`

```bash
  mysql -u UserName -p script_recipes < script_recipes.sql
```

2. Créez une copie du fichier `.env.example` puis renommer le fichier en `.env` à la racine du projet et mettez vos information pour configuration de la connexion à la base de données :

L'API sera accessible à l'adresse `http://localhost:3090`

## Endpoints de l'API

1. Obtenir toutes les recettes

- Méthode : GET
- URL : /recipes
- Description : Récupère toutes les recettes de la base de données.
- Réponse:

```bash
 {
        "id": 1,
        "title": "Tarte aux pommes maison",
        "ingredient": "Laitue, Poulet, Parmesan, Croutons, Sauce César",
        "type": "Entrée",
  }
```


2. Voir les détails d'une recette

- Méthode : GET
- URL : /recipes/:id
- Description : Récupère la details d'une recette.
- Réponse:

```bash
 {
        "id": 1,
        "title": "Recette 1",
        "ingredient": "Ingrédients de la recette 1",
        "type": "Entrée",
},
{
    "id": 2,
    "title": "Recette 2",
    "ingredient": "Ingrédients de la recette 2",
    "type": "Plat"
}
```


3. Créer une recette

- Méthode : POST
- URL : /recipes/add
- Description : Ajoute une nouvelle recette dans la base de données.
- Corps de la requette :

```bash
  {
   "title": "Nouvelle Recette",
    "ingredient": "Ingrédients de la nouvelle recette",
    "type": "Plat"
}
```

- Réponse :
```bash
{
    "message": "Recette créée avec succès"
}

```

4. Mettre à jour une recette

- Méthode : PUT
- URL : /recipes/edit/:id
- Description : Met à jour une recette par son ID.
- Corps :

```bash
{
      "title": "Recette Modifiée",
      "ingredient": "Ingrédients de la recette modifiée",
      "type": "Dessert"
 }

```

- Réponse :

```bash
{
    "message": "Recette mise à jour avec succès"
}
```

5. Supprimer une recette.

- Méthode : DELETE
- URL : /recipes/delete/:id
- Description : Supprime une recette par son ID.
  -Réponse :

```bash
{
    "message": "Recette supprimée avec succès"
}
```

## Collection Postman

Pour tester les différents endpoints de l'API, vous pouvez utiliser la collection Postman incluse dans ce projet. Elle contient toutes les requêtes configurées pour interagir avec l'API.

- **Importer dans Postman** le fichier collection api `recettes_collection.json` et exécuter les requêtes.

## Tests

Les tests unitaires sont écrits avec Jasmine. Pour les exécuter, utilisez la commande :

```bash
  npm test
```

## Analyse et formatage de code

Ce projet utilise **ESLint** pour le linting du code et **Prettier** pour le formatage. Cela permet de garantir que le code respecte des normes de qualité et de style cohérentes.

- Eslint

```bash
  npm run lint:fix
```

- Prettier

```bash
 npm run format
```

## Conteneurisation et déploiement.
## Docker 

- Pour exécutez docker compose veuillez ouvrir le fichier `.env` que vous avez puis  remplacer le   `DB_HOST=localhost ` par  `DB_HOST=db` puis exécuter la commande suivante :

1. Builder l'image docker:

```bash
   docker compose build
```

2. Lancer le conteneurc

```bash
  docker compose up -d
```
3. Exécutez la commande suivante dans le terminal pour vous connecter au service MySQL:

```bash
  docker exec -it nom_du_conteneur_mysql  mysql -u root -p
```

## Auteurs

- **[Mohamed Soumare](https://github.com/MohamedSoumare)** - Développeur Full Stack
