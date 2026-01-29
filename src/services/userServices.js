import User from "../models/userModel.js";
import { encryptPassword } from "../utils/encrption.js";
import { createToken, decodeToken } from "../utils/jwtHelper.js";
import bcrypt from "bcryptjs";

export const createUser = async (user) => {
  try {
    const { username, email, password, role } = user;
    let isUser = await User.findOne({ email });

    if (!isUser) {
      // 1 hashing password
      let hashedPassword = await encryptPassword(password);

      // 2 user data with hashed password
      let userDetails = {
        username,
        email,
        role: "User",
        password: hashedPassword,
      };

      //3 Insert user to database
      let createdUser = await User.create(userDetails);

      //4 Token creation
      let token = createToken(createdUser);

      //5 return created user , token decoded, token
      return {
        user: createdUser,
        auth_token: token,
      };
    } else {
      return "User already exists";
    }
  } catch (error) {
    console.log("Error while sign up : ", error.message);
  }
};

export const loginUser = async (user) => {
  const { username, email, password } = user;
  const dbUser = await User.findOne({ username, email });
  let isAccess = null;
  if (dbUser) {
    isAccess = await bcrypt.compare(password, dbUser.password);
  }
  if (isAccess) {
    return dbUser;
  }
  return false;
};

export const decodeUser = async (token) => {
  let decode = await decodeToken(token);
  return decode;
};

export const getUserData = async (token) => {
  try {
    let { _id } = await decodeUser(token);
    const user = await User.findOne({ _id });
    return user;
  } catch (err) {
    return null;
  }
};

export const findUser = async (token) => {
  const tokenUser = decodeToken(token);
  const { _id } = tokenUser;
  let user = await User.findOne({ _id });
  return user;
};
