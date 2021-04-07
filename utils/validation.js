const JOI = require("joi");

/**
 * requires what you'd use for api validation
 */
exports.createProductValidation = (data) => {
  const schema = JOI.object({
    name: JOI.string().required().trim().max(100),
    colour: JOI.string().required().trim().max(100),
    description: JOI.string().required().trim().max(1234),
    size: JOI.string().required().trim().max(100),
    productImg: JOI.string().required().trim(),
    price: JOI.string().required().trim(),
  });

  return schema.validate(data);
};

exports.updateProductValidation = (data) => {
  const schema = JOI.object({
    name: JOI.string().required().trim().max(100),
    colour: JOI.string().required().trim().max(100),
    description: JOI.string().required().trim().max(1234),
    size: JOI.string().required().trim().max(100),
    productImg: JOI.string().required().trim(),
    price: JOI.string().required().trim(),
  });
  return schema.validate(data);
};
