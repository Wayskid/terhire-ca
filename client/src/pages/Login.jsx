import { useEffect, useState, useContext } from "react";
import AppBtn from "../components/reuseable/AppBtn.jsx";
import AppInput from "../components/reuseable/AppInput.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi.js";
import appContext from "../context/AppContext.jsx";
import { SetCookie } from "../hooks/cookies.js";

export default function Login() {
  //Save inputs to state
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: "",
  });

  function handleInputs(e) {
    setLoginVal({ ...loginVal, [e.target.name]: e.target.value });
  }

  //Login user
  const [loginUserApi, { error: loginUserError, isLoading }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  function handleLoginUser(e) {
    e.preventDefault();
    loginUserApi({ body: loginVal })
      .unwrap()
      .then((result) => {
        SetCookie("User", JSON.stringify(result));
        navigate(0);
      })
      .catch((err) => {});
  }

  return (
    <form
      className="grid gap-16 w-[min(40rem,100%)] mx-auto py-16 px-6 my-auto"
      onSubmit={handleLoginUser}
    >
      <p className="header font-light text-5xl text-center">Login</p>
      <div className="grid gap-5">
        <div className="">
          <label htmlFor="email">Email</label>
          <AppInput
            id="email"
            name="email"
            type="email"
            value={loginVal.email}
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
            value={loginVal.password}
            onChange={handleInputs}
            required
            placeholder="Enter Password"
          />
        </div>
        <button
          type="button"
          className="underline font-light justify-self-start"
        >
          Forgot Password
        </button>
        {loginUserError && (
          <p className="text-center text-red-400">{loginUserError.data}</p>
        )}
      </div>
      <div className="grid gap-1">
        <AppBtn
          isDisabled={Object.values(loginVal).some((v) => v < 1) || isLoading}
          onClick={() => {}}
          label={isLoading ? "Logging in" : "LOGIN"}
          version="primary"
        />
        <p className="text-base font-light justify-self-center">
          Don't have an account?{" "}
          <NavLink to="/sign_up" className="underline mt-5">
            Sign up
          </NavLink>
        </p>
      </div>
    </form>
  );
}
