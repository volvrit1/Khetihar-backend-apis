import sequelizeToJoi from "#utils/joi";
import Joi from "joi";

/**
 * Creates a Joi validation middleware for Sequelize models
 * @param {Sequelize.Model} model - Sequelize model
 * @param {boolean} [isUpdate=false] - Flag for update mode
 * @returns {Function} - Express middleware
 */
export default function validateModel(model, isUpdate = false) {
  return (req, res, next) => {
    try {
      // Generate schema from model attributes
      const attributes = model.rawAttributes;
      let schema = {};

      for (const [fieldName, attribute] of Object.entries(attributes)) {
        // Skip auto-generated fields like id, createdAt, updatedAt
        if (
          attribute.autoIncrement ||
          fieldName === "createdAt" ||
          fieldName === "updatedAt"
        ) {
          continue;
        }
        schema[fieldName] = sequelizeToJoi(attribute);
      }

      if (isUpdate) {
        for (const key in schema) {
          schema[key] = schema[key].optional().allow(null);
        }
      }

      const joiSchema = Joi.object(schema);

      // Validate request body
      const { error, value } = joiSchema.validate(req.body, {
        abortEarly: false, // Show all errors
        stripUnknown: true, // Remove unknown fields
      });

      if (error) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.details.map((detail) => detail.message),
        });
      }

      req.validatedData = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}
