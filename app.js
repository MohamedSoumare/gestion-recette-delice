import express from 'express';
import dotenv from 'dotenv';
import RecipeRoutes from './src/routes/RecipeRoutes.js ';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', RecipeRoutes);

// Utilise APP_PORT pour le serveur Express
const port = process.env.APP_PORT || 3090;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
