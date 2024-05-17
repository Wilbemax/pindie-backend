const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
	req.categoriesArray = await categories.find({});
	next();
};

const createCategory = async (req, res, next) => {
	console.log('POST /categories');
	try {
		console.log(req.body);
		req.category = await categories.create(req.body);
		next();
	} catch (error) {
		res.status(400).send('Error creating category');
	}
};
const findCategoryById = async (req, res, next) => {
	console.log('GET /categories/:id');
	try {
		req.category = await categories.findById(req.params.id);
		next();
	} catch (error) {
		res.status(404).send({ message: 'Category not found' });
	}
};
const sendCategoryById = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(req.category));
};

const updateCategory = async (req, res, next) => {
	try {
		req.game = await categories.findByIdAndUpdate(req.params.id, req.body);
		next();
	} catch (e) {
		res.status(400).send({ message: 'ошибка оновления категории' });
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		req.game = await categories.findByIdAndDelete(req.params.id);
		next();
	} catch (error) {
		res.status(400).send({ message: 'Error deleting Category' });
	}
};

const checkIsCategoryExists = async (req, res, next) => {
	const isInArray = req.categoriesArray.find((category) => {
		return req.body.name === category.name;
	});
	if (isInArray) {
		res
			.status(400)
			.send({ message: 'Категория с таким названием уже существует' });
	} else {
		next();
	}
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
	if (!req.body.categories || req.body.categories.length === 0) {
		res.headers = { 'Content-Type': 'application/json' };
		res.status(400).send({ message: 'Выберите хотя бы одну категорию' });
	} else {
		next();
	}
};

const checkEmptyName = async (req, res, next) => {
	if (!req.body.name) {
		res.status(400).send({ message: 'Введите название категории' });
	} else {
		next();
	}
};

module.exports = {
	findAllCategories,
	createCategory,
	findCategoryById,
	sendCategoryById,
	updateCategory,
	deleteCategory,
	checkIsCategoryExists,
	checkIfCategoriesAvaliable,
	checkEmptyName,
};
