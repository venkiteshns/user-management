import express from "express";
import {
  defaultPage,
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

route.get("/", userAuth, cacheClear, defaultPage);

route.get("/login", userAuth, cacheClear, renderLogin);

route.get("/signup", userAuth, cacheClear, renderSignup);

route.post("/login", userAuth, cacheClear, userLogin);

route.post("/signup", userAuth, cacheClear, userSignUp);

route.get("/logout", cacheClear, logoutPage);

//Protected routes
route.get("/user_dashboard", verifyUser, cacheClear, renderDashboard);


export default route;
