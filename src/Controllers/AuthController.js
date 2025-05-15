import logger from "../config/logger.config.js";
import User from "../Models/User.js";
import AuthToken from "../Models/AuthToken.js";
import {
  failedRes,
  notFoundRes,
  serverError,
  successRes,
  validationRes,
} from "../Services/Response.js";
import { LoginValidation } from "../Validation/LoginValidation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthController {
  static login = async (req, res) => {
    try {
      //check here validation res
      const { error } = await LoginValidation(req.body);
      if (error) return validationRes(res, error?.details[0]?.message);

      const user = await User.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user) return failedRes(res, "Invaliad Credentails!");

      // Check if the user is correct
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return failedRes(res, "Invaliad Credentails!");

      const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
      const expiresIn = JWT_EXPIRES_IN || "24h";

      // Generate JWT token
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn }
      );
      if (token) {
        await AuthController.AuthToken(user, token);

        return successRes(res, "User logged in Successfully!", {
          token: token,
          expires_in: "24h",
        });
      } else {
        return failedRes(res, "Invalid Credentails!");
      }
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static AuthToken = async (user, token) => {
    // Delete old tokens for the user
    await AuthToken.deleteMany({
      where: { userId: user.id },
    });
    // Create a new token
    await AuthToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  };
}

export default AuthController;
