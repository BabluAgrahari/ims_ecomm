import { PERPAGE } from "../config/global.config.js";
import logger from "../config/logger.config.js";
import { isEmpty } from "../helper/helper.js";
import User from "../models/user.js";
import {
  recordsRes,
  successRes,
  failedRes,
  notFoundRes,
  serverError,
} from "../services/response.js";
import { Status } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";
// const prisma = new PrismaClient();

class UserContoller {
  static list = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.limit) || PERPAGE;
      const skip = (page - 1) * perPage;

      const users = await User.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      });

      if (isEmpty(users)) {
        return notFoundRes(res, "No users found.");
      }

      return recordsRes(res, users);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res);
    }
  };

  static create = async (req, res) => {
    try {
      //   const { error } = await CategoryValidation(req.body);
      //   if (error) return validationRes(res, error?.details[0]?.message);

      let payload = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        phoneNo: req.body.phone_no,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
        status: req.body.status ? Status.active : Status.inactive,
        role: req.body.role,
        dob: new Date(req.body.dob),
        gender: req.body.gender,
      };

      const result = await User.create({ data: payload });
      if (result && result.id) {
        return successRes(res, "User Added Successfully!", result);
      } else {
        return failedRes(res, "User not Added!");
      }
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };
}
export default UserContoller;
