import { FC, useState, useEffect } from "react";
import useForm from "../useForm";
import "./Registration.scss";
import { useNavigate } from "react-router-dom";
import { getWithExpiry, setWithExpiry } from "./authenticator";

type Gender = "male" | "female" | "non-binary";
interface User {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  password: string;
}

const Registration: FC = () => {
  const navigate = useNavigate();

  const [authenticated, setauthenticated] = useState<boolean | undefined>(
    false
  );
  useEffect(() => {
    //localStorage.removeItem("authenticated");
    const loggedInUser = getWithExpiry("authenticated"); //localStorage.getItem("authenticated");
    console.log(loggedInUser);
    if (loggedInUser) {
      console.log(loggedInUser);
      setauthenticated(true);
      navigate("/home");
    }
  }, [authenticated, navigate]);

  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<User>({
    validations: {
      name: {
        required: {
          value: true,
          message: "Name is required",
        },
        pattern: {
          value: "^[A-Za-z]*$",
          message:
            "You're not allowed to use special characters or numbers in your name.",
        },
      },
      age: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 17,
          message: "You have to be at least 18 years old.",
        },
      },
      email: {
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value: regex,
          message: "The email must be correctly.",
        },
      },
      password: {
        custom: {
          isValid: (value) => value !== undefined && value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
    },
    onSubmit: () => {
      console.log("User submitted!");
      // go to home page
      setauthenticated(true);
      setWithExpiry("authenticated", "true", 60000);
      //localStorage.setItem("authenticated", "true");
      navigate("/home");
    },
  });

  return (
    <form className="registration-wrapper" onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <input
        placeholder="Name*"
        value={user.name || ""}
        onChange={handleChange<string>("name")}
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        placeholder="Age"
        type="number"
        value={user.age || ""}
        onChange={handleChange<number>("age", (value) => parseInt(value, 10))}
      />
      {errors.age && <p className="error">{errors.age}</p>}
      <input
        placeholder="Email*"
        type="email"
        value={user.email || ""}
        onChange={handleChange("email")}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        placeholder="Password*"
        type="password"
        value={user.password || ""}
        onChange={handleChange("password")}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <select onChange={handleChange("gender")}>
        <option value="" disabled selected>
          Select gender*
        </option>
        <option value="male" selected={user.gender === "male"}>
          Male
        </option>
        <option value="female" selected={user.gender === "female"}>
          Female
        </option>
        <option value="non-binary" selected={user.gender === "non-binary"}>
          Non-binary
        </option>
      </select>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default Registration;
