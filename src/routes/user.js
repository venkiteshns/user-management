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


route.get("/", userAuth, cacheClear, renderLogin);

route.get("/login", userAuth, cacheClear, renderLogin);

route.get("/signup", userAuth, cacheClear, renderSignup);

route.post("/login", userAuth, cacheClear, userLogin);

route.post("/signup", userAuth, cacheClear, userSignUp);

route.get("/user_dashboard", verifyUser, cacheClear, renderDashboard);

route.get("/logout", cacheClear, logoutPage);

export default route;
