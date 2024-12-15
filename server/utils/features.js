import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";

dotenv.config();

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, { dbname: "IMS-Chat-App" });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // Optional: Retry logic can be added here.
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  return res.status(code).cookie("Auth-Token", token, cookieOptions).json({
    success: true,
    user,
    token,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const userSockets = getSockets(users);
  io.to(userSockets).emit(event, data);
  TryCatch(console.log("emiting Event", event));
};

//upload to cloudinary server
const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 1024 * 1024 * 5) {
        // Limit file size to 5MB
        reject(new Error("File size is too large"));
      }
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid(), type: "upload" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    const formattedResult = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResult;
  } catch (error) {
    throw new Error("Error uploading files", error);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {
  const deletePromises = public_ids.map((public_id) =>
    cloudinary.uploader.destroy(public_id)
  );

  try {
    await Promise.all(deletePromises);
    console.log("Files deleted successfully");
  } catch (error) {
    console.error("Error deleting files:", error);
    throw error;
  }
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
