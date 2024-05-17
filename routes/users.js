const usersRouter = require('express').Router();

const {
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
} = require('../middleware/users');
const {
	sendAllUsers,
	sendUserCreated,
	sendUserUpdated,
	sendUserDeleted,
	sendMe,
} = require('../controllers/users');
const { checkAuth } = require('../middleware/auth');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post(
	"/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.put(
	'/users/:id',
	checkEmptyNameAndEmail,
	checkAuth,
	updateUser,
	sendUserUpdated
);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted);



usersRouter.get("/me", checkAuth, sendMe);

module.exports = usersRouter;
