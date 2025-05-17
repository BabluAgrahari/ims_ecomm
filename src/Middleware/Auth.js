import jwt from "jsonwebtoken";
import prisma from "../Libraries/Prisma.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: false, msg: "Authorization Token not found." });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: false, msg: "Please use token type Bearer." });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        email: decoded.email,
      },
      include: {
        authToken: true,
      },
    });

    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found." });
    }

    const matchedToken = (user.authToken || []).find((t) => t.token === token);
    if (!matchedToken) {
      return res.status(401).json({ status: false, msg: "Invalid token." });
    }

    if (new Date() > new Date(matchedToken.expiresAt)) {
      return res.status(401).json({ status: false, msg: "Token has expired." });
    }

    const userMod = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone_no: user?.phone_no,
      city: user?.city,
      state: user?.state,
      pincode: user?.pincode,
      address: user?.address,
      gender: user?.gender,
      dob: user?.dob,
      role: user?.role,
      status: user?.status,
    };
    req.user = userMod;
    req.token = token;
    next();
  } catch (error) {
    console.log("error", error.getMessage);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, msg: "Token has expired." });
    }
    return res
      .status(401)
      .json({ status: false, msg: `Authorization Token is Invaliad.` });
  }
};

export default auth;
