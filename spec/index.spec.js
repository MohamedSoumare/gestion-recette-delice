import RecipeModel from '../src/models/RecipeModel.js ';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be created with valid data', async () => {
    const recipe = {
      title: 'Crêpes Bombom',
      type: 'dessert',
      ingredient: 'Farine, oeufs, lait, chocolat, sucre',
    };

    const result = await RecipeModel.create(
      recipe.title,
      recipe.type,
      recipe.ingredient
    );
    recipeId = result.insertId;
    expect(recipeId).not.toBeNull();
  });

  it('can get all recipes', async () => {
    const recipes = await RecipeModel.getAll();
    expect(recipes).not.toBeNull();
    expect(Array.isArray(recipes)).toBe(true);

    recipes.forEach((recipe) => {
      expect(recipe.title.length).toBeGreaterThan(3);
    });
  });

  it('can update a recipe with valid data', async () => {
    const updatedData = {
      title: 'Crêpes au la fromage',
      type: 'dessert',
      ingredient: 'Farine, chocolat, sucre, bananes',
    };

    const result = await RecipeModel.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);

    const updatedRecipe = await RecipeModel.getById(recipeId);
    expect(updatedRecipe.title).toBe(updatedData.title);
    expect(updatedRecipe.type).toBe(updatedData.type);
    expect(updatedRecipe.ingredient).toBe(updatedData.ingredient);
  });

  it('cannot update a recipe with an invalid ID', async () => {
    const invalidId = 95;
    const updatedRecipe = {
      title: 'gâteau',
      type: 'dessert',
      ingredient: 'farine, sucre',
    };
    const updateResult = await RecipeModel.update(invalidId, updatedRecipe);
    expect(updateResult.affectedRows).toBe(0);
  });

  it('can delete a recipe', async () => {
    const result = await RecipeModel.delete(recipeId);
    expect(result.affectedRows).toBe(1);

    const deletedRecipe = await RecipeModel.getById(recipeId);
    expect(deletedRecipe).toBeNull();
  });

  it('fails to delete a recipe that does not exist', async () => {
    const invalidId = 133;
    const deleteResult = await RecipeModel.delete(invalidId);
    expect(deleteResult.affectedRows).toBe(0);
  });

  it('cannot get recipe by invalid ID', async () => {
    const invalidId = 19;
    const recipe = await RecipeModel.getById(invalidId);
    expect(recipe).toBeNull();
  });
});
