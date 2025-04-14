import Joi from "joi";
import { DataTypes } from "sequelize";

/**
 * Converts Sequelize attribute to Joi schema
 * @param {Object} attribute - Sequelize attribute definition
 * @returns {Joi.Schema} - Joi schema
 */
export default function sequelizeToJoi(attribute) {
  let joiSchema;

  // Map Sequelize types to Joi types
  switch (true) {
    case attribute.type instanceof DataTypes.STRING:
    case attribute.type instanceof DataTypes.TEXT:
      joiSchema = Joi.string();
      break;
    case attribute.type instanceof DataTypes.INTEGER:
    case attribute.type instanceof DataTypes.BIGINT:
      joiSchema = Joi.number().integer();
      break;
    case attribute.type instanceof DataTypes.FLOAT:
    case attribute.type instanceof DataTypes.DOUBLE:
      joiSchema = Joi.number();
      break;
    case attribute.type instanceof DataTypes.BOOLEAN:
      joiSchema = Joi.boolean();
      break;
    case attribute.type instanceof DataTypes.DATE:
      joiSchema = Joi.date();
      break;
    case attribute.type instanceof DataTypes.JSON:
      // Only allow objects for JSON type, not arrays
      joiSchema = Joi.object().unknown(true); // Allow any object structure
      break;
    default:
      joiSchema = Joi.any();
  }

  // Custom error messages without quotes around field names
  joiSchema = joiSchema.messages({
    "any.required": `${attribute.fieldName} is required`,
    "string.base": `${attribute.fieldName} must be a string`,
    "number.base": `${attribute.fieldName} must be a number`,
    "number.integer": `${attribute.fieldName} must be an integer`,
    "boolean.base": `${attribute.fieldName} must be a boolean`,
    "date.base": `${attribute.fieldName} must be a valid date`,
    "object.base": `${attribute.fieldName} must be an object`,
  });

  // Handle nullability
  return attribute.allowNull === false
    ? joiSchema.required()
    : joiSchema.allow(null, "").optional();
}
