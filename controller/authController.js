const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models").Users;
const config = require("../config/app");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const secure = require("crypto").randomBytes(64).toString("hex");
    //find the user

    const user = await Users.findOne({
      where: {
        email,
      },
    });
    //  check if user found

    if (!user) return res.status(404).json({ message: "User not Found" });

    // check if password matches

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Incorrect Password" });

    //   generate auth token

    const userwithToken = generateToken(user.get({ raw: true }));
    return res.send(userwithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }

  return res.send([email, password]);
};

const register = async (req, res) => {
  
const { email, password } = req.body;
  try {
    const user = await Users.create(req.body);

    const userwithToken = generateToken(user.get({ raw: true }));
    return res.send(userwithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const generateToken = (user) => {
  console.log(user);
  delete user.password;

  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });

  return { ...user, ...{ token } };
};

module.exports = {
  login,
  register
}
