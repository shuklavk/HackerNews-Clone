const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

// async function signup(parent, args, context, info) {
//   // Uses the bcrypt library to encrypt the users password
//   const hashedPassword = await bcrypt.hash(args.password, 10);
//   // Storing username and hashed password in the database
//   const { password, ...user } = await context.prisma.createUser({
//     ...args,
//     password: hashedPassword
//   });
//   // creates a JWT token with a secret key
//   const token = jwt.sign({ userId: user.id }, APP_SECRET);
//   // Returns token and user in the AuthPayload format
//   return {
//     token,
//     user
//   };
// }
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}
async function login(parent, args, context, info) {
  // Retrieve existing user by finding the email, if no user found, then throw an error
  const { password, ...user } = await context.prisma.user({
    email: args.email
  });
  if (!user) {
    throw new Error('No such user found');
  }
  // Compare the hashed password with the provided password, throw an error if false
  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error('Invalid Password');
  }
  // Create a new jsonwebtoken
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // Return an AuthPayload object with token and the user
  return {
    token,
    user
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}
module.exports = {
  signup,
  login,
  post
};
