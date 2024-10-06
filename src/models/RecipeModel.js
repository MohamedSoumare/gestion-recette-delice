import db from '../config/db.js';

class RecipeModel {
  static async create(title, type, ingredient) {
    try {
      const recipeExists = await this.checkRecipe(title);
      if (recipeExists) {
        throw new Error(`La recette avec le titre "${title}" existe déjà.`);
      }

      const [result] = await db.query(
        'INSERT INTO recipes (title, ingredient, type) VALUES (?, ?, ?)',
        [title, ingredient, type]
      );
      return { insertId: result.insertId };
    } catch (error) {
      console.error(
        'Erreur lors de la création de la recette :',
        error.message
      );
      throw error;
    }
  }

  static async checkRecipe(title) {
    const [rows] = await db.query(
      'SELECT COUNT(*) AS count FROM recipes WHERE title = ?',
      [title]
    );
    return rows[0].count > 0;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, updatedData) {

    const recipe = await this.getById(id);
    if (!recipe) {
      return { affectedRows: 0 };
    }

    const query =
      'UPDATE recipes SET title = ?, type = ?, ingredient = ? WHERE id = ?';
    const [result] = await db.query(query, [
      updatedData.title,
      updatedData.type,
      updatedData.ingredient,
      id,
    ]);

    return { affectedRows: result.affectedRows };
  }

  static async delete(id) {
    const query = 'DELETE FROM recipes WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return { affectedRows: result.affectedRows }; 
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM recipes');
    return rows;
  }
}
export default RecipeModel;
