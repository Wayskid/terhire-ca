import { useContext, useEffect, useState } from "react";
import AppBtn from "../components/reuseable/AppBtn.jsx";
import AppInput from "../components/reuseable/AppInput.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/appApi.js";
import appContext from "../context/AppContext.jsx";
import { SetCookie } from "../hooks/cookies.js";

export default function SignUp() {
  //Save inputs to state
  const [regVal, setRegVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleInputs(e) {
    setRegVal({ ...regVal, [e.target.name]: e.target.value });
  }

  //Register user
  const [registerUserApi, { error: registerUserError, isLoading }] =
    useRegisterUserMutation();

  const { setUserInfo } = useContext(appContext);
  const navigate = useNavigate();
  function handleRegisterUser(e) {
    e.preventDefault();
    registerUserApi({ body: regVal })
      .unwrap()
      .then((result) => {
        SetCookie("User", JSON.stringify(result));
        navigate(0);
      })
      .catch((err) => {});
  }

  return (
    <form
      className="grid gap-16 w-[min(40rem,100%)] mx-auto py-16 px-6"
      onSubmit={handleRegisterUser}
    >
      <p className="header font-light text-4xl md:text-5xl text-center">
        Create an account
      </p>
      <div className="grid gap-5">
        <div className="grid md:grid-cols-2 gap-5 md:gap-10">
          <div className="">
            <label htmlFor="firstName">First Name</label>
            <AppInput
              id="firstName"
              name="firstName"
              type="firstName"
              value={regVal.firstName}
              onChange={handleInputs}
              required
              placeholder="Enter First Name"
            />
          </div>
          <div className="">
            <label htmlFor="lastName">Last Name</label>
            <AppInput
              id="lastName"
              name="lastName"
              type="lastName"
              value={regVal.lastName}
              onChange={handleInputs}
              required
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="email">Email</label>
          <AppInput
            id="email"
            name="email"
            type="email"
            value={regVal.email}
            onChange={handleInputs}
            required
            placeholder="Enter Email"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <AppInput
            id="password"
            name="password"
            type="password"
            value={regVal.password}
            onChange={handleInputs}
            required
            placeholder="Enter Password"
          />
        </div>
        {registerUserError && (
          <p className="text-center text-red-400">{registerUserError.data}</p>
        )}
      </div>
      <div className="grid gap-1">
        <AppBtn
          isDisabled={Object.values(regVal).some((v) => v < 1) || isLoading}
          label={isLoading ? "CREATING ACCOUNT" : "CREATE ACCOUNT"}
        />
        <p className="text-base font-light justify-self-center">
          Have an account?{" "}
          <NavLink to="/login" className="underline mt-5">
            Login
          </NavLink>
        </p>
      </div>
    </form>
  );
}
