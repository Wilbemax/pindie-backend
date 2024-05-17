const users = require('../models/user');
const bcrypt = require("bcryptjs")


const hashPassword = async (req, res, next) => {
	try {
	  // Создаём случайную строку длиной в десять символов
	  const salt = await bcrypt.genSalt(10);
	  // Хешируем пароль
	  const hash = await bcrypt.hash(req.body.password, salt);
	  // Полученный в запросе пароль подменяем на хеш
	  req.body.password = hash;
	  next();
	} catch (error) {
	  res.status(400).send({ message: "Ошибка хеширования пароля" });
	}
  };


const findAllUsers = async (req, res, next) => {
	req.usersArray = await users.find({}, {password: 0});
	next();
};
const createUser = async (req, res, next) => {
	console.log('POST /users');
	try {
		console.log(req.body);
		req.user = await users.create(req.body);
		next();
	} catch (error) {
		res.status(400).send('Error creating user');
	}
};
const findUserById = async (req, res, next) => {
	console.log('GET /users/:id');
	try {
		req.user = await users.findById(req.params.id, {password: 0});
		next();
	} catch (error) {
		res.status(404).send({ message: 'User not found' });
	}
};
const sendUserById = (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(req.user));
};

const updateUser = async (req, res, next) => {
	try {
		req.game = await users.findByIdAndUpdate(req.params.id, req.body);
		next();
	} catch (e) {
		res.status(400).send({ message: 'ошибка оновления пользователя' });
	}
};

const deleteUser = async (req, res, next) => {
	try {
		req.game = await users.findByIdAndDelete(req.params.id);
		next();
	} catch (error) {
		res.status(400).send({ message: 'Error deleting user' });
	}
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.status(400).send({ message: "Пользователь с таким email уже существует" });
  } else {
    next();
  }
}; 

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.status(400).send({ message: "Введите имя и email" });
  } else {
    next();
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
	  res.setHeader("Content-Type", "application/json");
		  res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
	} else {
	  next();
	}
  };


  

module.exports = {
	findAllUsers,
	createUser,
	findUserById,
	sendUserById,
	updateUser,
	deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  hashPassword
};
