import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { configDotenv } from "dotenv";
import { adminSecretKey } from "../app.js";
import { gandu_token } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[gandu_token];
  if (!token)
    return next(new ErrorHandler("please login to access this page", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});
const adminOnly = (req, res, next) => {
  const token = req.cookies["JarvisToken"];
  if (!token)
    return next(new ErrorHandler("only admin can Access this Route", 401));

  const adminId = jwt.verify(token, process.env.JWT_SECRET);

  const isMatch = secretKey === adminSecretKey;
  if (!isMatch) return next(new ErrorHandler("invalid Admin key", 401));
  req.user = decodedData._id;

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[gandu_token];
    if (!authToken)
      return next(new ErrorHandler("please Login to access this Route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);
    if (!user) return next(new ErrorHandler("Invalid User", 401));
    socket.user = user;

    return next();
  } catch (error) {
    return next(new ErrorHandler("please Login to access this Route", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
