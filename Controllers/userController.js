const User = require("../Models/user");
const userController = {};

userController.saveUser = async (userName, sid) => {
  // Check if user exists
  let user = await User.findOne({ name: userName });
  // if user is not found, create new user
  if (!user) {
    user = new User({
      name: userName,
      token: sid,
      online: true,
    });
  }

  // if user exists in the db, just change connection token value
  user.token = sid;
  user.online = true;

  await user.save();
  return user;
};

userController.checkUser = async (sid) => {
  const user = await User.findOne({ token: sid });
  if (!user) throw new Error("user not found");
  return user;
};

module.exports = userController;
