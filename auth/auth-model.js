const secrets = require('./secrets');

module.exports = {
	generateToken
};

function generateToken(user) {
    const payload = {
        "sub": "1234567890", // standard - subject, normally the user id
        "name": "John Doe", // custom property
        "iat": 1516239022 // standard - The Date the token was issued, expressed in seconds since epoch.
      };
  
    const options = {
      expiresIn: '4h', // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  }