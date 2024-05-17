const gamesRouter = require('express').Router();
const { checkAuth } = require("../middleware/auth");
const {
	findAllGames,
	createGame,
	findGameById,
	sendGameById,
	updateGame,
	deleteGame,
	checkEmptyFields,
	checkIfUsersAreSafe,
	checkIfCategoriesAvaliable,
	checkIsGameExists,
	checkIsVoteRequest,
} = require('../middleware/games');
const {
	sendAllGames,
	sendGameCreated,
	sendGameUpdated,
	sendGameDeleted,
} = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post(
	'/games',
	findAllGames,
	checkIsGameExists,
	checkIfCategoriesAvaliable,
	checkAuth,
	checkEmptyFields,
	createGame,
	sendGameCreated,
	
);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.put(
	'/games/:id',
	findGameById,
	checkIsVoteRequest,
	checkIfUsersAreSafe,
	checkIfCategoriesAvaliable,
	checkEmptyFields,
	checkAuth,
	updateGame,
	sendGameUpdated,
	
);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
