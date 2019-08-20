const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();
const sessionConfig = {
	name: 'Im a name and do not forget it',
	secret: 'hey guys im a secret do not tell the others',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 60 * 1000,
		secure: false,
		httpOnly: true
	},
	store: new SessionStore({
		knex: require('../data/dbConfig'),
		tablename: 'sessions',
		sidfieldname: 'sid',
		createtable: true,
		clearInterval: 60 * 60 * 1000
	})
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.json({ api: 'we up earlier than an old man' });
});

module.exports = server;