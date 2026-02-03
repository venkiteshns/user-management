import express from "express";
import {
  addNewUser,
  adminLogin,
  adminLogout,
  deleteUser,
  editUser,
  filterdata,
  renderAdminDashboard,
  renderAdminLogin,
  renderEditUserForm,
  renderNewUserForm,
} from "../controllers/adminController.js";
import { cacheClear } from "../middlewares/cacheClear.js";
import { authAdmin, verifyAdminToken } from "../middlewares/adminMiddleware.js";

const route = express.Router();

route.get("/", authAdmin, cacheClear, renderAdminLogin);

route.get("/login", authAdmin, cacheClear, renderAdminLogin);

route.post("/login", cacheClear, adminLogin);

//Protected routes
route.get("/admin_dashboard", verifyAdminToken, cacheClear, renderAdminDashboard,);

route.get("/add_user", cacheClear, verifyAdminToken, renderNewUserForm);

route.post("/add_user", cacheClear, verifyAdminToken, addNewUser);

route.post( "/edit_user_details/:id", cacheClear, verifyAdminToken, renderEditUserForm );

route.post("/edit_user/:id", cacheClear, verifyAdminToken, editUser);

route.post("/delete_user/:id", cacheClear, verifyAdminToken, deleteUser);

route.post("/filter", verifyAdminToken, filterdata);

route.get("/logout", cacheClear, adminLogout);

export default route;
 