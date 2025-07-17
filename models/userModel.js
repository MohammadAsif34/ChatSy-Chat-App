import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    bio: { type: String, trim: true },
    picture: { type: String },
    onlineStatus: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    lastSeen: { type: String },
    contact: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
