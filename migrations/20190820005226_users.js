exports.up = function(knex) {
	return knex.schema.createTable('users', (users) => {
		users.increments();

		users.text('username', 200).notNullable().unique();
		users.text('password', 200).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};