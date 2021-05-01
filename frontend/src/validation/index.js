import * as yup from "yup";

let onlyLetters = /(^[a-zA-Z]+$)/;

// let lowerCase = /(?=.*[a-z])/;
// let upperCase = /(?=.*[A-Z])/;
// let numberRegex = /(?=.*[0-9])/;
// let specialChar = /(?=.*[!@#$%^&*])/;

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
    .min(1, "First name should contain atleast a single character !")
    .max(15, "First name should be less than 15 characters")
    .matches(onlyLetters, "Please enter only valid alphabets as first name")
    .required("Firstname is required"),
  lastName: yup
    .string()
    .min(1, "Last name should contain atleast a single character !")
    .max(15, "Last name should be less than 15 characters")
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
    .max(30, "Password should be less than 30 characters !")
    // .matches(lowerCase, "Password must contain a single lowercase character !")
    // .matches(upperCase, "Password must contain a single uppercase character !")
    // .matches(numberRegex, "Password must contain a single numeric digit !")
    // .matches(specialChar, "Password must contain a single special character !")
    .required("Password is required"),
});

export const AddRoomSchema = yup.object().shape({
  title: yup
    .string()
    .min(1, "Title should contain atleast a single character !")
    .max(10, "Title should be less than 10 characters")
    .required("Room title is required !"),
  subTitle: yup
    .string()
    .max(20, "Sub title should be less than 20 characters !"),
});

export const ProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(1, "First name should contain atleast a single character !")
    .max(15, "First name should be less than 15 characters")
    .matches(onlyLetters, "Please enter only valid alphabets as first name")
    .required("Firstname is required"),
  lastName: yup
    .string()
    .min(1, "Last name should contain atleast a single character !")
    .max(15, "Last name should be less than 15 characters")
    .matches(onlyLetters, "Please enter only valid alphabets as last name")
    .required("Lastname is required"),
  email: yup
    .string()
    .email("Please enter a valid email address !")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password is too short, must be atleast 8 characters !")
    .max(30, "Password should be less than 30 characters !"),
  // .matches(lowerCase, "Password must contain a single lowercase character !")
  // .matches(upperCase, "Password must contain a single uppercase character !")
  // .matches(numberRegex, "Password must contain a single numeric digit !")
  // .matches(specialChar, "Password must contain a single special character !"),
});
