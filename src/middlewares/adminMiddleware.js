import { getAdminCookie } from "../services/adminServices.js";
import { decodeToken } from "../utils/jwtHelper.js";

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.admin_access_token;
    if (!token) return next();

    const admin = await decodeToken(token);
    const isAdmin = await getAdminCookie(admin);

    if (isAdmin) {
      return res.redirect("/admin/admin_dashboard");
    }

    next();
  } catch (err) {
    res.clearCookie("admin_access_token");
    next();
  }
};


export const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies?.admin_access_token;

    if (!token) {
      return res.redirect("/admin/login");
    }

    const admin = await decodeToken(token);
    const isAdmin = await getAdminCookie(admin);

    if (!isAdmin) {
      return res.redirect("/admin/login");
    }

    next();
  } catch (err) {
    // token expired or invalid
    res.clearCookie("admin_access_token");
    return res.redirect("/admin/login");
  }
};
