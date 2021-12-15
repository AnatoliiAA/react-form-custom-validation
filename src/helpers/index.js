const patterns = {
  firstName: /^[a-zA-Zа-яА-Я]{2,}$/,
  lastName: /^[a-zA-Zа-яА-Я]{2,}$/,
  email: /\S+@\S+\.\S+/,
  phone: /^\+?[0-9]{12}$/,
  password: /^[a-zA-Z0-9!@#$%^&*]{8,}$/,
};

export const checkValidationObj = (obj) => {
  let valid = true;
  for (let key in obj) {
    if (obj[key] !== true) {
      valid = false;
    }
  }
  return valid;
};

export const validateField = (name, value) => {
  return patterns[name].test(value);
};
