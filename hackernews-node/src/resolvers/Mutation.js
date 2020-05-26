async function signup(parent, args, context, info) {
  // Uses the bcrypt library to encrypt the users password
  const hashedPassword = await bcrypt.hash(args.password, 10);
  // Storing username and hashed password in the database
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword
  });
  // creates a JWT token with a secret key
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // Returns token and user in the AuthPayload format
  return {
    token,
    user
  };
}
