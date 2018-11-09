const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMilestoneInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.when = !isEmpty(data.when) ? data.when : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.when)) {
    errors.when = "Date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
