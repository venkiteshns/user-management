import { findUser } from "../services/userServices.js";

export const userAuth = async (req, res, next) => {
  console.log("post sign up");
  
  const token = req.cookies.user_access_token;
  if (token) {
    let user = await findUser(token);
    if (user && user.role === "User") {
      return res.redirect("/user_dashboard");
    }
    return next();
  } else {
    return next();
  }
};

export const verifyUser = async (req, res, next) => {
  const token = req.cookies?.user_access_token;
  if (token) {
    let user = await findUser(token);
    console.log("user blaa : ",user);
    if(user && user.role === "User"){
      return next();
    }
    return res.redirect('/')
  } else {
    return res.redirect('/');
  }
};
