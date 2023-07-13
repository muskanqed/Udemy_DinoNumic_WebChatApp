const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models").Users;
const config = require("../config/app");
const { error } = require("console");

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const secure = require("crypto").randomBytes(64).toString("hex");
    //find the user

    const user = await Users.findOne({
      where: {
        email,
      },
    });
    //  check if user found

    if (!user) return response.status(404).json({ message: "User not Found" });

    // check if password matches

    if (!bcrypt.compareSync(password, user.password))
      return response.status(401).json({ message: "Incorrect Password" });

    //   generate auth token

    const userwithToken = generateToken(user.get({ raw: true }));
    return response.send(userwithToken);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

  return response.status(200);
};

const register = async (request, response) => {
  
const { email, password } = request.body;
  try {
    const user = await Users.create(request.body);

    const userwithToken = generateToken(user.get({ raw: true }));
    return response.send(userwithToken);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const generateToken = (user) => {
  ;
  delete user.password;

  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });

  return { ...user, ...{ token } };
};

module.exports = {
  login,
  register
}
