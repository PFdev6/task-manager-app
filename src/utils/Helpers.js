import * as validator from "validator";

export const validateSingUpForm = (
  email,
  name,
  password,
  confirmPassword,
  setError
) => {
  if (!email || !name || !password || !confirmPassword) {
    setError(
      "Please enter a valid email name, password and confirmation password."
    );
    return false;
  }

  if (password !== confirmPassword) {
    setError("Password should match with confirmation password");
    return false;
  }

  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const validateLoginForm = (email, password, setError) => {
  if (!email || !password) {
    setError("Please enter a valid email and password.");
    return false;
  }

  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const apiRequest = async (url, method, bodyParams) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: bodyParams ? JSON.stringify(bodyParams) : {}
  });
  return await response.json();
};
