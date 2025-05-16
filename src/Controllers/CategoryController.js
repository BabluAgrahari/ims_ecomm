import { PERPAGE } from "../config/global.config.js";
import logger from "../config/logger.config.js";
import { isEmpty } from "../Helper/Helper.js";
import Category from "../Models/Category.js";
import {
  recordsRes,
  successRes,
  failedRes,
  notFoundRes,
  serverError,
} from "../Services/Response.js";

class CategoryController {
  static list = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.limit) || PERPAGE;
      const skip = (page - 1) * perPage;

      const category = await Category.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      });

      if (isEmpty(category)) {
        return notFoundRes(res, "No found any record.");
      }

      return recordsRes(res, category);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static create = async (req, res) => {
    try {
      //   const { error } = await CategoryValidation(req.body);
      //   if (error) return validationRes(res, error?.details[0]?.message);

      let payload = {
        category: req.body.category,
        description: req.body.description,
        status: req.body.status ? Status.active : Status.inactive,
        userId: req.user.id,
      };

      const result = await User.create({ data: payload });
      if (result && result.id) {
        return successRes(res, "Category Added Successfully!", result);
      } else {
        return failedRes(res, "Category not Added!");
      }
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };
}
export default CategoryController;
