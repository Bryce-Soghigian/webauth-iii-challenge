const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
module.exports = (req, res, next) => {
 
	const token = req.headers.authorization;
  
	if (token) {
	  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
		if (err) {
		  
		  res.status(401).json({ you: 'you cant get in' });
		} else {
		  
		  req.jwtToken = decodedToken;
		  next();
		}
	  });
	} else {
	  res.status(400).json({ message: 'no token provided' });
	}
  };
