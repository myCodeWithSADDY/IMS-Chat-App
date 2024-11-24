import express from "express";
import {
  acceptFriendRequest,
  GetAllNotifications,
  GetMyFriends,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

//after here user must be logged
app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", isAuthenticated, logout);
app.get("/searchuser", isAuthenticated, searchUser);
app.put(
  "/sendrequest",
  isAuthenticated,
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  isAuthenticated,
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notifications", isAuthenticated, GetAllNotifications);
app.get("/friends", isAuthenticated, GetMyFriends);

export default app;
