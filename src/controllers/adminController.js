import {
  addUser,
  deleteUserDetails,
  editUserDetails,
  getAdminInfo,
  getUserDetails,
  getUserList,
} from "../services/adminServices.js";
import { decodeToken } from "../utils/jwtHelper.js";

export const renderAdminLogin = (req, res) => {
  return res.render("admin/login", { err: null });
};

export const adminLogin = async (req, res) => {
  console.log(req.body);

  let adminInfo = await getAdminInfo(req.body);

  if (typeof adminInfo != "string") {
    let { admin, token } = adminInfo;
    req.admin = await decodeToken(token);

    //cookie response
    res.cookie("admin_access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    return res.redirect("/admin/admin_dashboard");
  } else {
    return res.render("admin/login", { err: adminInfo });
  }
};

export const renderAdminDashboard = async (req, res) => {

  const searchKey = req.query.search || "" ;

  let userList = await getUserList(searchKey);
  console.log(userList);
  
  let admin = decodeToken(req.cookies.admin_access_token);
  let { username, email } = admin;
  res.render("admin/adminDashboard", { username, email, userList, searchKey });
};

export const renderNewUserForm = (req, res) => {
  return res.render("admin/addUser", { err: null });
};

export const addNewUser = async (req, res) => {
  let newUser = await addUser(req.body);
  if (newUser == "User already exists") {
    return res.render("admin/addUser", { err: newUser });
  }
  return res.redirect("/admin/admin_dashboard");
};

export const renderEditUserForm = async (req, res) => {
  const user = await getUserDetails(req.params.id);
  return res.render("admin/editUser", { user });
};

export const editUser = async (req, res) => {
  let user = await editUserDetails(req.params.id, req.body);
  if (user) {
    return res.redirect("/admin/admin_dashboard");
  }
};

export const deleteUser = async (req, res) => {
  await deleteUserDetails(req.params.id);
  
  return res.redirect("/admin/admin_dashboard");
};

export const filterdata = async (req, res) => {
  res.redirect(`/admin/admin_dashboard?search=${req.body.search}`);
};

export const adminLogout = (req, res) => {
  res.clearCookie("admin_access_token");
  res.redirect("/admin/login");
};
