const pagesRouter = require('express').Router();

const { sendIndex, sendDashboard } = require('../controllers/auth.js');
const { checkAuth, checkCookiesJWT } = require('../middleware/auth.js');

pagesRouter.get('/', sendIndex);
pagesRouter.get('/admin/**', checkCookiesJWT, checkAuth, sendDashboard);

module.exports = pagesRouter;
