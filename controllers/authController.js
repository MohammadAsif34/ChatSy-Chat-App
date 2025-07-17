import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.json({
        code: 400,
        status: "INVALID_INPUT",
        message: "invalid input",
      });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({
        code: 400,
        status: "NOT_REGISTERED",
        message: "you have not registered",
      });
    }

    const passwordChecking = await bcrypt.compareSync(
      password,
      user.password,
      8
    );
    if (passwordChecking) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("chattoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        code: 200,
        status: "OK",
        message: "login successfully",
      });
    }

    res.json({
      code: 500,
      status: "BAB_CREDENTIAL",
      message: "login failed",
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "INTERNAL_ERROR",
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { password, ...data } = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = new User({ ...data, password: hashPassword });
    if (newUser) {
      await newUser.save();
      return res.json({
        code: 200,
        status: "OK",
        message: "register successfully",
      });
    }
    res.json({
      code: 500,
      status: "BAD",
      message: "register failed",
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "OK",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("chattoken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.json({
      code: 200,
      status: "OK",
      message: "logout successfully",
    });
  } catch (error) {
    res.json({
      code: 500,
      status: "BAD",
      message: error.message,
    });
  }
};

// login user info
export const myInfo = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password -contact");
    res.json({ code: 200, status: "OK", me: user });
  } catch (error) {
    res.json({ code: 500, status: "AUTH_ERR", message: error.message });
  }
};
