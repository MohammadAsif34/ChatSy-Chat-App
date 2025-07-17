import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.cookies.chattoken;
  // console.log("middleware token :: ", token);
  if (!token)
    return res.json({
      code: 401,
      status: "UNAUTHORIZE",
      message: "Unauthorize user",
    });

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify._id;
    next();
  } catch (error) {
    res.json({
      code: 403,
      status: "INVALID",
      message: "invalid token",
    });
  }
};
