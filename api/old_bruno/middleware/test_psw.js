const passwordValidator = require("password-validator");
// Create a schema
let schema = new passwordValidator();

schema
  .is()
  .min(4) // Minimum length 4
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["0000", "1234"]); // Blacklist these values
