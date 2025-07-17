import Message from "../models/messageModel.js";

export const getChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    console.log("current chat");
    if (!senderId || !receiverId) {
      return res.json({
        code: 401,
        status: "INTERNAL_ERR",
        message: "something went wrong",
      });
    }
    const chat = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.json({ code: 200, status: "OK", chat });
  } catch (error) {
    res.json({ code: 200, status: "OK", message: error.message });
  }
};

export const setChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    console.log(senderId);
    if (!senderId || !receiverId || !message) {
      return res.json({
        code: 401,
        status: "INTERNAL_ERR",
        message: "something went wrong",
      });
    }
    const newMsg = new Message({ senderId, receiverId, message });
    await newMsg.save();
    res.json({ code: 200, status: "OK", message: "message sent" });
  } catch (error) {
    res.json({ code: 200, status: "OK", message: error.message });
  }
};
