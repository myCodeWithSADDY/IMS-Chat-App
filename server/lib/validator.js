import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMsg = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  console.log(errorMsg);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMsg, 400));
};
const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter UserName").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];
const loginValidator = () => [
  body("username", "Please Enter UserName").notEmpty(),

  body("password", "Please Enter Password").notEmpty(),
];
const newGroupValidator = () => [
  body("name", "Please Enter name").notEmpty(),

  body("members")
    .notEmpty()
    .withMessage("please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Group must have at least 3 members"),
];
const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),

  body("members")
    .notEmpty()
    .withMessage("please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Group must have at least 3 members"),
];
const RemoveMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),

  body("userId", "please Enter UserID").notEmpty(),
];
const LeaveGroupValidator = () => [param("id", "invalid Request").notEmpty()];

const sendAttachmentValidator = () => [
  body("chatId", "Please provide ChatId").notEmpty(),
];
const ChatIdValidator = () => [param("id", "invalid Request").notEmpty()];

const renameValidator = () => [
  param("id", "invalid Request").notEmpty(),
  body("name", "Please provide new name").notEmpty(),
];
const sendRequestValidator = () => [
  body("userId", "Please provide User ID").notEmpty(),
];
const acceptRequestValidator = () => [
  body("requestId", "Please provide Request ID").notEmpty(),
  body("accept", "Please accept Request")
    .notEmpty()
    .withMessage("please Add Accept")
    .isBoolean()
    .withMessage("accept must be boolean"),
];
const adminLoginValidator = () => [
  body("secretKey", "Please provide Secret Key").notEmpty(),
];

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  ChatIdValidator,
  LeaveGroupValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  RemoveMemberValidator,
  renameValidator,
  sendAttachmentValidator,
  sendRequestValidator,
  validateHandler,
};
