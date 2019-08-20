module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
      filename: './auth.db3',
      directory: './data'
		},
		useNullAsDefault: true
	}
};