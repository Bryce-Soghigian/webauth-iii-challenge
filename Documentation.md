#ENDPOINTS</br>
**Home --GET**
/
A simple '/' will get this endpoint. This endpoints purpose is used to see if a server is live.

#Auth Endpoints

**Register--POST**
/api/auth/register  
 accepts a username and password, and department
in order to post a new user to the database. The login endpoint won't work without a registered user
#

**Login --POST**
/api/auth/login   
Only accepts a previously registered name and password.
#

**Logout --GET**
/api/auth/logout

logs you session out. A very simple get request.
#
#User Endpoints



