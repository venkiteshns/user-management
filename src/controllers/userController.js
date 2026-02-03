import { createUser, getUserData, loginUser } from "../services/userServices.js";
import { createToken } from "../utils/jwtHelper.js";

export const renderSignup = (req, res) => {
  console.log("render sign up");
  
  return res.render("user/signup", { err: null });
};

export const userSignUp = async (req, res) => {
  //1 New user creation
  let createdUser = await createUser(req.body);
  if (createdUser == "User already exists") {
    return res.render("user/signup", { err: createdUser });
  }

  //2 cookie response
  res.cookie("user_access_token", createdUser.auth_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  return res.redirect("/user_dashboard");
};

export const renderLogin = (req, res) => {
  return res.render("user/login", { err: null });
};

export const defaultPage = (req,res) => {
  res.redirect('/login')
}

export const userLogin = async (req, res) => {
  let user = await loginUser(req.body);
  if (user) {
    if (user.role != "User") {
      return res.render("user/login", { err: "Only users are alowded !"});
    }
    //1 creating token
    const auth_token = createToken(user);
    
    //2 cookie response
    res.cookie("user_access_token", auth_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.redirect("/user_dashboard");
  } else {
    return res.render("user/login", { err: "Invalid credentials" });
  }
};

export const renderDashboard = async (req, res) => {
  let user = await getUserData(req.cookies.user_access_token)
  if(!user){
    res.clearCookie("admin_access_token");
    return res.redirect("/");
  }
  return res.render("user/userDashboard", {
    username: user.username,
    email: user.email,
  });
};

export const logoutPage = (req, res) => {
  res.clearCookie("user_access_token");
  res.set('Cache-Control', 'no-store');
  res.redirect("/");
}