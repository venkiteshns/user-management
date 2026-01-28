import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const { username, _id, email } = user;
  const payload = {
    _id,
    username,
    email,
  };
  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
  return token;
};

export const decodeToken = (token) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);    
    return decoded;
}