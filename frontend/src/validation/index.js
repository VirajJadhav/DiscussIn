import * as yup from "yup";

let onlyLetters = /(^[a-zA-Z]+$)/;

let lowerCase = /(?=.*[a-z])/;
let upperCase = /(?=.*[A-Z])/;
let numberRegex = /(?=.*[0-9])/;
let specialChar = /(?=.*[!@#$%^&*])/;

export const LoginSchema = yup.object().shape({
  userName: yup
    .string()
    .min(4, "Username is too short, must be atleast 4 characters")
    .max(16, "Username must be less than 16 characters")
    .required("Username is required !"),
  password: yup
    .string()
    .min(8, "Password is too short, must be atleast 8 characters !")
    .required("Password is required"),
});

export const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(onlyLetters, "Please enter only valid alphabets as first name")
    .required("Firstname is required"),
  lastName: yup
    .string()
    .matches(onlyLetters, "Please enter only valid alphabets as last name")
    .required("Lastname is required"),
  email: yup
    .string()
    .email("Please enter a valid email address !")
    .required("Email is required"),
  userName: yup
    .string()
    .min(4, "Username is too short, must be atleast 4 characters")
    .max(16, "Username must be less than 16 characters")
    .required("User Name is required !"),
  password: yup
    .string()
    .min(8, "Password is too short, must be atleast 8 characters !")
    .matches(lowerCase, "Password must contain a single lowercase character !")
    .matches(upperCase, "Password must contain a single uppercase character !")
    .matches(numberRegex, "Password must contain a single numeric digit !")
    .matches(specialChar, "Password must contain a single special character !")
    .required("Password is required"),
});

export const AddRoomSchema = yup.object().shape({
  title: yup
    .string()
    .matches(onlyLetters, "Title must contain only alphabets !")
    .required("Room title is required !"),
});

export const ProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(onlyLetters, "Please enter only valid alphabets as first name")
    .required("Firstname is required"),
  lastName: yup
    .string()
    .matches(onlyLetters, "Please enter only valid alphabets as last name")
    .required("Lastname is required"),
  email: yup
    .string()
    .email("Please enter a valid email address !")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password is too short, must be atleast 8 characters !")
    .matches(lowerCase, "Password must contain a single lowercase character !")
    .matches(upperCase, "Password must contain a single uppercase character !")
    .matches(numberRegex, "Password must contain a single numeric digit !")
    .matches(specialChar, "Password must contain a single special character !"),
});
