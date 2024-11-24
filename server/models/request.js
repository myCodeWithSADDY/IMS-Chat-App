import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "pending"],
      default: "pending",
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.models.Request || model("Request", schema);
