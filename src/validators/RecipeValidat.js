import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/RecipeModel.js ';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  next();
};

const addRequestValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Le titre ne peut pas être vide.')
    .isLength({ min: 5, max: 100 })
    .withMessage('Le titre doit comporter entre 5 et 100 caractères.')
    .custom(async (value) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),
  check('ingredient')
    .not()
    .isEmpty()
    .withMessage('Les ingrédients sont requis.')
    .isLength({ min: 10, max: 500 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 500 caractères.'),
  check('type')
    .not()
    .isEmpty()
    .withMessage('Le type de recette est requis.')
    .isIn(['Entrée', 'Plat', 'Dessert'])
    .withMessage('Le type doit être Entrée, Plat ou Dessert.'),
  handleValidationErrors,
];

const updateRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis.')
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  check('title')
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage('Le titre doit comporter entre 5 et 100 caractères.')
    .custom(async (value, { req }) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe && existingRecipe.id !== parseInt(req.params.id)) {
        throw new Error('Ce titre est déjà utilisé par une autre recette.');
      }
      return true;
    }),
  check('ingredient')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 500 caractères.'),
  check('type')
    .optional()
    .isIn(['Entrée', 'Plat', 'Dessert'])
    .withMessage('Le type doit être Entrée, Plat ou Dessert.'),
  handleValidationErrors,
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID est obligatoire.')
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const getByIdRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('L\'ID de la recette est requis.')
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

export {
  addRequestValidator,
  updateRequestValidator,
  deleteRequestValidator,
  getByIdRequestValidator,
};