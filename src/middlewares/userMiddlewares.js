import { findUser } from "../services/userServices.js";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.user_access_token;
    if (token) {
        console.log("sign up token found");

      let user = await findUser(token);
      if (user && user.role === "User") {
        console.log("sign up user found");

        return res.redirect("/user_dashboard");
      }
    }
    console.log("sign up next");
    
    return next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return next(); // Proceed to login even if DB check fails
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.user_access_token;
    if (!token) {
      return res.redirect("/");
    }

    const user = await findUser(token);
    if (user && user.role === "User") {
      return next();
    }

    res.clearCookie("user_access_token");
    return res.redirect("/");
  } catch (error) {
    console.error("Verify Middleware Error:", error);
    return res.redirect("/");
  }
};
