const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

// Will call in any resolver that requries authentication
// Retrieves Authorization header which contains the users JWT from the context
// Then verifies the JWT and retrieves the users id from it which is in the payload
// If unsuccesful, it will throw an error
function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    console.log(token);
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
};
