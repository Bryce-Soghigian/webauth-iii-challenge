const db = require('../data/dbConfig.js');

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find(department) {
	const knexQuery = db('users').select('id', 'username', 'password' , 'department');

	if (department) {
		knexQuery.where({ department });
	  }

	  return knexQuery;
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	const [ id ] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}