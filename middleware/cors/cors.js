require('dotenv').config();

const ALLOWEDCORS = [
	'https://practicum.yandex.ru',
	'https://students-projects.ru',
	'http://localhost:3000',
	'http://localhost:3001',
	'https://wbm-front.nomoredomainswork.ru/'
];

function cors(req, res, next) {
	const { origin } = req.headers;

	if (ALLOWEDCORS.includes(origin)) {
		res.header('Access-Control-Allow-Origin' || 'application/json', origin);
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		res.header(
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
		);
	}
	next();
}
module.exports = cors;
