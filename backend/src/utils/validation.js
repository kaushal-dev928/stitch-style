const Joi = require("joi");

exports.orderSchema = Joi.object({
  clothType: Joi.string().required(),
  fabric: Joi.string().required(),
  measurements: Joi.object({
    chest: Joi.number().required(),
    waist: Joi.number().required(),
    hip: Joi.number().required(),
    length: Joi.number().required(),
  }).required(),
  paymentMethod: Joi.string().required(),
  totalAmount: Joi.number().required(), // ✅ Ye add karo
});
