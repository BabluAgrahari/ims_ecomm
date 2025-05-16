import logger from "../config/logger.config.js";
import user from "../models/user.js";
import authToken from "../models/authToken.js";
import {
  failedRes,
  serverError,
  successRes,
  validationRes,
} from "../services/response.js";
import { loginValidation } from "../validation/loginValidation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthController {
  static login = async (req, res) => {
    try {
      //check here validation res
      const { error } = await loginValidation(req.body);
      if (error) return validationRes(res, error?.details[0]?.message);

      const userRecord = await user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!userRecord) return failedRes(res, "Invaliad Credentails!");

      // Check if the user is correct
      const isMatch = await bcrypt.compare(
        req.body.password,
        userRecord.password
      );
      if (!isMatch) return failedRes(res, "Invaliad Credentails!");

      const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
      const expiresIn = JWT_EXPIRES_IN || "24h";

      // Generate JWT token
      const token = await jwt.sign(
        { id: userRecord.id, email: userRecord.email },
        JWT_SECRET,
        { expiresIn }
      );
      if (token) {
        await this.#storeAuthToken(userRecord, token);

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

  static async #storeAuthToken(user, token) {
    // Delete old tokens for the user
    await authToken.deleteMany({
      where: { userId: user.id },
    });
    // Create a new token
    await authToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
}

export default AuthController;
