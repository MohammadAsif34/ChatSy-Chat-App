import User from "../models/userModel.js";

// user info
export const userInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const user_info = await User.findById(id).select("-password -contact");
    if (!user_info) {
      return res.json({
        code: 401,
        status: "INTERNAL_ERR",
        message: "something went wrong",
      });
    }
    res.json({ code: 200, status: "OK", user: user_info });
  } catch (error) {
    res.json({ code: 500, status: "SERVER_ERR", message: error.message });
  }
};

//add contact
export const addContact = async (req, res) => {
  try {
    const id = req.userId;
    const { phone } = req.body;
    console.log(id);
    console.log(phone);
    const isUser = await User.findOne({ phone });
    if (!isUser) {
      return res.json({
        code: 404,
        status: "USER_NOT_FOUND",
        message: "Contact not found",
      });
    }
    await User.findByIdAndUpdate(
      id,
      { $addToSet: { contact: isUser._id } },
      { new: true, runValidators: true }
    );

    res.json({
      code: 200,
      status: "OK",
      message: "Contact added successfully",
    });
    // const contact = await User.findById(id).populate("fullname picture phone");
  } catch (error) {
    res.json({ code: 500, status: "SERVER_ERR", message: error.message });
  }
};

// contact of curr user
export const getContact = async (req, res) => {
  try {
    const id = req.userId;
    const contact = await User.findById(id)
      .select("contact")
      .populate({ path: "contact", select: "fullname picture phone" });
    res.json({ code: 200, status: "OK", contact: contact.contact });
  } catch (error) {
    res.json({ code: 500, status: "SERVER_ERR", message: error.message });
  }
};
