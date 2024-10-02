import Recipe from '../src/models/RecipeModel.js ';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be created with valid data', async () => {
    const recipe = {
      title: 'Crêpes au chocolat',
      type: 'dessert',
      ingredient: 'Farine, oeufs, lait, chocolat, sucre',
    };

    const result = await Recipe.create(
      recipe.title,
      recipe.type,
      recipe.ingredient
    );
    recipeId = result.insertId;
    const recipeCreated = await Recipe.getById(recipeId);

    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
    expect(recipeCreated.title).toBe(recipe.title);
    expect(recipeCreated.type).toBe(recipe.type);
    expect(recipeCreated.ingredient).toBe(recipe.ingredient);
  });

  it('cannot be created with invalid data', async () => {
    const invalidRecipe = {
      title: 'Trop court',
      type: 'invalid',
      ingredient: 'Trop court',
    };

    let errorOccurred = false;
    try {
      await Recipe.create(
        invalidRecipe.title,
        invalidRecipe.type,
        invalidRecipe.ingredient
      );
    } catch (error) {
      errorOccurred = true;
      expect(error).toBeInstanceOf(Error);
    }

    expect(errorOccurred).toBe(true);
  });

  it('can get all recipes', async () => {
    const recipes = await Recipe.getAll();
    expect(recipes).not.toBeNull();
    expect(Array.isArray(recipes)).toBe(true);

    recipes.forEach((recipe) => {
      expect(recipe.title.length).toBeGreaterThan(3);
    });
  });

  it('can update a recipe with valid data', async () => {
    const updatedData = {
      title: 'Crêpes au chocolat et à la banane',
      type: 'dessert',
      ingredient: 'Farine, oeufs, lait, chocolat, sucre, bananes',
    };

    const result = await Recipe.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);

    const updatedRecipe = await Recipe.getById(recipeId);
    expect(updatedRecipe.title).toBe(updatedData.title);
    expect(updatedRecipe.type).toBe(updatedData.type);
    expect(updatedRecipe.ingredient).toBe(updatedData.ingredient);
  });

  it('cannot update recipe with invalid data', async () => {
    const invalidData = {
      title: 'Court',
      type: 'invalid',
      ingredient: 'Trop court',
    };

    let errorOccurred = false;
    try {
      await Recipe.update(recipeId, invalidData);
    } catch (error) {
      errorOccurred = true;
      expect(error).toBeInstanceOf(Error);
    }

    expect(errorOccurred).toBe(true);
  });

  it('can delete a recipe', async () => {
    const result = await Recipe.delete(recipeId);
    expect(result.affectedRows).toBe(1);
    const deletedRecipe = await Recipe.getById(recipeId);
    expect(deletedRecipe).toBeNull();
  });

  it('cannot get recipe by invalid ID', async () => {
    const invalidId = 9999;
    const recipe = await Recipe.getById(invalidId);
    expect(recipe).toBeNull();
  });
});
