import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  LeaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  ChatIdValidator,
  newGroupValidator,
  RemoveMemberValidator,
  renameValidator,
  sendAttachmentValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

//after here user must be logged
app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put(
  "/removemember",
  RemoveMemberValidator(),
  validateHandler,
  removeMembers
);
app.delete("/leave/:id", ChatIdValidator(), validateHandler, LeaveGroup);

//send Attachment
app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentValidator(),
  validateHandler,
  sendAttachments
);

//get messages
app.get("/message/:id", ChatIdValidator(), validateHandler, getMessages);

//get chat details, Rename, Delete
app
  .route("/:id")
  .get(ChatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(ChatIdValidator(), validateHandler, deleteChat);

export default app;
