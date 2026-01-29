import express from "express";
import {
  logoutPage,
  renderDashboard,
  renderLogin,
  renderSignup,
  userLogin,
  userSignUp,
} from "../controllers/userController.js";
import { cacheClear } from "../middlewares/cacheClear.js";
import { userAuth, verifyUser } from "../middlewares/userMiddlewares.js";

const route = express.Router();

route.get("/", userAuth, renderLogin);

route.get("/login", userAuth, renderLogin);

route.get("/signup", userAuth, renderSignup);

route.post("/login", userAuth, userLogin);

route.post("/signup", userAuth, userSignUp);

route.get("/logout", logoutPage);

//Protected routes
route.get("/user_dashboard", verifyUser, cacheClear, renderDashboard);


export default route;
