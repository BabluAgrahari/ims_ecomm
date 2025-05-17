import { PERPAGE } from "../config/global.config.js";
import logger from "../config/logger.config.js";
import { isEmpty } from "../Helper/Helper.js";
import category from "../models/category.js";
import {
  recordsRes,
  successRes,
  failedRes,
  notFoundRes,
  serverError,
  validationRes,
} from "../services/response.js";
import { status } from "../generated/prisma/index.js";
import { categoryValidation } from "../validation/categoryValidation.js";

class CategoryController {
  static index = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.limit) || PERPAGE;
      const skip = (page - 1) * perPage;

      const records = await category.findMany({
        skip,
        take: perPage,
        orderBy: { createdAt: "desc" },
      });

      if (isEmpty(records)) {
        return notFoundRes(res, "No found any record.");
      }

      return recordsRes(res, records);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static show = async (req, res) => {
    try {
      const record = await category.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!record) {
        return notFoundRes(res, "No found any record.");
      }

      return recordsRes(res, record);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static store = async (req, res) => {
    try {
      const { error } = await categoryValidation(req.body);
      if (error) return validationRes(res, error?.details[0]?.message);

      let payload = {
        category: req.body.category,
        description: req.body.description,
        status: req.body.status ? status.active : status.inactive,
        userId: 1,
      };

      const result = await category.create({ data: payload });
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

  static update = async (req, res) => {
    try {
      const { error } = await categoryValidation(req.body);
      if (error) return validationRes(res, error?.details[0]?.message);

      let payload = {
        category: req.body.category,
        description: req.body.description,
        status: req.body.status ? status.active : status.inactive,
        userId: 1,
      };

      const record = await category.update({
        where: { id: parseInt(req.params.id) },
        data: payload,
      });

      if (!record) {
        return notFoundRes(res, "No found any record.");
      }

      return successRes(res, "Category Updated Successfully!", record);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static stateUpdate = async (req, res) => {
    try {
      const record = await category.update({
        where: { id: parseInt(req.params.id) },
        data: {
          status: req.body.status ? status.active : status.inactive,
        },
      });

      if (!record) {
        return notFoundRes(res, "No found any record.");
      }

      return successRes(res, "Category Status Updated Successfully!", record);
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };

  static destroy = async (req, res) => {
    try {
      const record = await category.delete({
        where: { id: parseInt(req.params.id) },
      });

      if (!record) {
        return notFoundRes(res, "No found any record.");
      }

      return successRes(res, "Category Deleted Successfully!");
    } catch (error) {
      logger.error(`${req.originalUrl}: ${error.message}`);
      return serverError(res, error.message);
    }
  };
}
export default CategoryController;
