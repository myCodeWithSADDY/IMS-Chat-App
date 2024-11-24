import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import "dotenv/config";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;
  const isMatch = secretKey === adminSecretKey;

  if (!isMatch) return next(new ErrorHandler("invalid Admin key", 401));

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("JarvisToken", token, { ...cookieOptions, maxAge: 1000 * 60 * 15 })
    .json({
      success: true,
      message:
        "adminToken authentication successful, Welcom to Jarvis Admin control panel",
    });
});

const adminLogout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("JarvisToken", "", { ...cookieOptions, maxAge: 1000 * 60 * 15 })
    .json({
      success: true,
      message: "Jarvis Logging out successfully",
    });
});

const allUsers = TryCatch(async (req, res) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return { name, username, avatar: avatar.url, _id, groups, friends };
    })
  );

  return res.status(200).json({
    status: "success",
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChat = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "none",
          avatar: creator?.avatar.url || "none",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    transformedChat,
    message: "Chats fetched successfully",
  });
});
const AllMessages = TryCatch(async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ _id, sender, chat, content, createdAt, attachments }) => ({
      _id,
      attachments,
      content,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
      createdAt,
    })
  );

  transformedMessages.sort((a, b) => b.createdAt - a.createdAt);

  return res.status(200).json({
    success: true,
    transformedMessages,
    message: "Messages fetched successfully",
  });
});
const getDashboardStats = TryCatch(async (req, res) => {
  const [groupsCount, userCount, messagesCount, totalChatCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7days = new Date();
  last7days.setDate(last7days.getDate() - 7);

  const last7daysCount = await Message.find({
    createdAt: { $gte: last7days, $lte: today },
  }).select("createdAt");
  const messages = new Array(7).fill(0);
  const dayinMiliSec = 1000 * 60 * 60 * 24;
  last7daysCount.forEach((message) => {
    const indexApprox =
      today.getTime() - message.createdAt.getTime() / dayinMiliSec; // convert;
    const index = Math.floor(indexApprox);
    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    userCount,
    messagesCount,
    totalChatCount,
    messagesChart: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
    message: "Messages fetched successfully",
  });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

export {
  allUsers,
  allChats,
  AllMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
};
