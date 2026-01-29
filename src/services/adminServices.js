import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, decodeToken } from "../utils/jwtHelper.js";
import { encryptPassword } from "../utils/encrption.js";

export const getAdminInfo = async (admin) => {
  try {
    // 1 Finding admin
    let { username, email, password } = admin;
    let adminInfo = await User.findOne({ username, email, role: "Admin" });

    // 2 verifying password and creating token
    if (adminInfo) {
      let isAccess = await bcrypt.compare(password, adminInfo.password);
      if (isAccess) {
        let token = createToken(adminInfo);
        return { admin: adminInfo, token };
      } else {
        return "Incorrect password";
      }
    } else {
      return "Invalid Credentials";
    }
  } catch (error) {
    console.log("error during admin verify from database : ", error.message);
  }
};

export const getUserList = async (searchKey) => {
  let userList;
    userList = await User.find({
      username: { $regex: `${searchKey}`, $options: "i" },
      role:"User"
    });
  return userList;
};

export const getAdminCookie = async ({ email, username }) => {
  let admin = await User.findOne({ email, username, role: "Admin" });
  return admin;
};

export const addUser = async ({ username, email, password }) => {
  //1 hashing password
  const hash = await encryptPassword(password);
  password = hash;
  //2 checking user exixts or not
  let isUser = await User.findOne({ email });
  if (isUser) {
    return "User already exists";
  }
  const user = await User.create({ username, email, password, role: "User" });
  return user;
};

export const getUserDetails = async (userId) => {
  try {
    let user = await User.findOne({ _id: userId });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.log(
      "User finding with _id error , admnin/edituser/getuserDetails :",
      error.message,
    );
    return null;
  }
};

export const editUserDetails = async (userId, user) => {
  try {
    const { username, email, role } = user;
    let userInfo = await User.updateOne(
      { _id: userId },
      { $set: { username, email, role } },
    );
    return userInfo;
  } catch (error) {
    console.log(
      "User Update error : admin/edit_user/editUserDetails :",
      error.message,
    );
    return null;
  }
};

export const deleteUserDetails = async (userId) => {
  try {
    await User.deleteOne({ _id: userId });
    return true;
  } catch (error) {
    console.log("unable to delete user : ", error.message);
    return false;
  }
};
