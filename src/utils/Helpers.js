import * as validator from "validator";
import { DEFAULT_USER_AUTH } from "./Consts";

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

export const validateNewTaskForm = (tasks, setError) => {
  const taskEndDates = tasks.map(task => new Date(task.endDate));
  const mainEndDate = taskEndDates[0];

  if (!taskEndDates.every(date => date <= mainEndDate)) {
    setError("Ending of task should be less than ending date of main task");
    return false;
  }
  return true;
};

export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

export const apiRequest = (url, method, bodyParams, token = null) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body = bodyParams ? { body: JSON.stringify(bodyParams) } : {};
  return fetch(url, {
    method,
    headers: headers,
    ...body
  }).then(res => res.json());
};
