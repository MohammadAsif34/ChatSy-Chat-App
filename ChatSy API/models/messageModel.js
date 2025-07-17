import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: { type: String },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);
export default Message;
