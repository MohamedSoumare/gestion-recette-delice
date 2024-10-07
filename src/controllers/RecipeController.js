import RecipeModel from '../models/RecipeModel.js';

class RecipeController {
  static async getAllRecipes(req, res, next) {
    try {
      const recipes = await RecipeModel.getAll();
      res.json(recipes);
    } catch (error) {
      console.error('Erreur dans getAllRecipes:', error);
      next(error);
    }
  }

  static async getRecipeById(req, res, next) {
    const { id } = req.params;
    try {
      const recipe = await RecipeModel.getById(id);
      res.json(recipe);
    } catch (error) {
      console.error('Erreur dans getRecipeById:', error);
      next(error);
    }
  }

  static async addRecipe(req, res, next) {
    const { title, type, ingredient } = req.body;
    try {
      await RecipeModel.create(title, type, ingredient);
      res.status(201).json({ message: 'Recette créée avec succès' });
    } catch (error) {
      console.error('Erreur dans addRecipe:', error);
      next(error);
    }
  }

  static async updateRecipe(req, res, next) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      await RecipeModel.update(id, updatedData);
      res.status(200).json({ message: 'Recette mise à jour avec succès' });
    } catch (error) {
      console.error('Erreur dans updateRecipe:', error);
      next(error);
    }
  }

  static async deleteRecipe(req, res, next) {
    const { id } = req.params;
    try {
      await RecipeModel.delete(id);
      res.status(200).json({ message: 'Recette supprimée avec succès' });
    } catch (error) {
      console.error('Erreur dans deleteRecipe:', error);
      next(error);
    }
  }
}

export default RecipeController;
