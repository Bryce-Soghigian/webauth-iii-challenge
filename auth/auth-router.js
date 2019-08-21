const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const restricted = require('./restricted-middleware.js');
const jwtmodel = require('./auth-model');
const secrets = require('./secrets');


router.post('/register', (req, res) => {
	let user = req.body; 

	
	if (!user.username || !user.password) {
		res.status(404).json({ message: 'pls submit a username and password, along with a department' });
	}
//The 12 means 12 rounds. Its for security measures
	const hash = bcrypt.hashSync(user.password, 12);
	user.password = hash; 
	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
  
	Users.findBy({ username })
	  .first()
	  .then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
		  // produce a token
		  const token = generateToken(user);
  
		  res.status(200).json({
			message: `Welcome ${user.username}!`,
			token,
		  });
		} else {
		  res.status(401).json({ message: 'please enter in valid userdata' });
		}
	  })
	  .catch(error => {
		res.status(500).json(error);
	  });
  });
  function generateToken(user) {
	const jwtPayload = {
	  subject: user.id,
	  username: user.username,
	  department: user.department,
	};
  
	const jwtOptions = {
	  expiresIn: '1d',
	};
	return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
  }

//Using the token. Can i get an f to pay respects to the /logout endpoint


// router.get('/logout', restricted, (req, res) => {
// 	if (req.session) {


// 		req.session.destroy((err) => {
// 			if (err) {
// 				console.log(err);
// 				return res.status(500).json({ message: 'Failed like your attempt to ask out your coworker loser' });
// 			}

// 			res.end();
// 		});
// 	} else {
// 		res.end();
// 	}
// });

module.exports = router;