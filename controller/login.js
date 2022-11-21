//jwt login in nodejs?

const User = require("../models/User");

exports.login = async (req, res) => {
  const user = await User.find({ googleId: req.user.googleId }).lean();
  //   console.log(user[0]);
  const foundUser = user[0];
  //   console.log(req.user.displayName);
  res.redirect("/dashboard");
};
