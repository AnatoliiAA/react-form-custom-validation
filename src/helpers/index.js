export const validateName = (nameStr) => {
  const regex = /^[a-zA-Zа-яА-Я]{2,}$/;
  return regex.test(nameStr);
};

export const validateEmail = (emailStr) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(emailStr);
};

export const validatePhone = (phoneStr) => {
  const regex = /^\+?[0-9]{12}$/;
  return regex.test(phoneStr);
};

export const validatePassword = (passwordStr) => {
  const regex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return regex.test(passwordStr);
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
