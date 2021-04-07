const JOI = require("joi");

/**
 * requires what you'd use for api validation
 */
exports.createUserProfile = (data) => {
  const schema = JOI.object({
    firstname: JOI.string().required().trim().max(100),
    lastname: JOI.string().required().trim().max(100),
    email: JOI.string().required().trim().max(100),
    profileImg: JOI.string().trim(),
    password: JOI.string().required().trim().max(20).min(8),
  });

  return schema.validate(data);
};

exports.updateUserProfile = (data) => {
  const schema = JOI.object({
    firstname: JOI.string().required().trim().max(100),
    lastname: JOI.string().required().trim().max(100),
    email: JOI.string().required().trim().max(100),
    profileImg: JOI.string().trim(),
    password: JOI.string().required().trim().max(20).min(8),
  });
  return schema.validate(data);
};
