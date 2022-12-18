const bannedPasswords = require("../utils/bannedPasswords");

exports.isValidEmailAddress = function (email) {
  return new Promise((resolve) => {
    let emailCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let isValid = false;
    if (emailCheckRegex.test(email)) {
      isValid = true;
    }
    resolve(isValid);
  });
};

exports.isValidPassword = function (password) {
  return new Promise((resolve) => {
    let isValid = false;
    let isBanned = bannedPasswords.includes(password.toLowerCase());
    if (
      !isBanned &&
      password.length >= process.env.VUE_APP_MINIMUM_PASSWORD_LENGTH
    ) {
      isValid = true;
    }
    resolve(isValid);
  });
};
