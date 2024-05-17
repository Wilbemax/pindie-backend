// Создаём роут для запросов категорий
const categoriesRouter = require('express').Router();

const {
	findAllCategories,
	createCategory,
	findCategoryById,
	sendCategoryById,
	updateCategory,
	deleteCategory,
	checkIsCategoryExists,
	checkEmptyName,
} = require('../middleware/categories');
const {
	sendAllCategories,
	sendCategoryCreated,
	sendCategoryUpdated,
	sendCategoryDeleted,
} = require('../controllers/categories');
const { checkAuth } = require('../middleware/auth');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post(
	'/categories',
	findAllCategories,
	checkIsCategoryExists,
	checkAuth,
	checkEmptyName,
	createCategory,
	sendCategoryCreated
);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.put(
	'/categories/:id',
	checkEmptyName,
	checkAuth,
	updateCategory,
	sendCategoryUpdated
);
categoriesRouter.delete('/categories/:id',  checkAuth,deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;
