import { compare } from "bcrypt";
import { User } from "../models/user.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  const file = req.file;

  if (!file) return next(new ErrorHandler("Please Upload Avatar", 404));

  const result = await uploadFilesToCloudinary([file]);
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "user created");
});

//login user with username and password
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("invalid user or password", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("invalid user or password", 404));

  sendToken(res, user, 201, `Welcome Back ${username}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) return next(new ErrorHandler("user not found", 404));
  return res.status(200).json({
    success: true,
    user,
  });
});
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("gandu-token", " ", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "You have been logged out",
    });
});
const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;

  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);
  //global users excluding me and my friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  //modifying the response
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));
  return res.status(200).json({
    success: true,
    users,
  });
});
const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });
  if (request)
    return next(new ErrorHandler("Friend request already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });
  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend request sent",
  });
});
const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  if (!request) return next(new ErrorHandler("request not found", 404));

  if (request.receiver._id.toString() !== req.user.toString())
    return next(new ErrorHandler("Unauthorized friend request", 401));

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "request Accepted",
    senderId: request.sender._id,
  });
});

const GetAllNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});
const GetMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;
  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      _id: otherUser?._id,
      name: otherUser?.name,
      avatar: otherUser?.avatar.url,
    };
  });
  if (chatId) {
    const chat = await Chat.findById(chatId);
    const avaiableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );
    return res.status(200).json({
      success: true,
      friends: avaiableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  GetAllNotifications,
  GetMyFriends,
};
