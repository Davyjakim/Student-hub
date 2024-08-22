import React, { useReducer } from "react";
import auth from "../ApiService/UserService";
import { Link } from "react-router-dom";
function reducer(state, action) {
  switch (action.type) {
    case "SetemailOrName": {
      return {
        ...state,
        emailOrName: action.NextState,
      };
    }
    case "Setpassword": {
      return {
        ...state,
        password: action.NextState,
      };
    }
    case "SetErrorEmail": {
      return {
        ...state,
        error: {
          ...state.error,
          emailOrName: action.NextState,
        },
      };
    }
    case "SetErrorPassword": {
      return {
        ...state,
        error: {
          ...state.error,
          password: action.NextState,
        },
      };
    }
    case "default": {
      return {
        emailOrName: "",
        password: "",
        error: { password: "", emailOrName: "" },
      };
    }
  }
}

function SignInPage() {
  const [state, dispatch] = useReducer(reducer, {
    emailOrName: "",
    password: "",
    error: { password: "", emailOrName: "" },
  });

  const inputsLabels = [
    {
      Title: "Name / email",
      htmlFor: "emailOrName",
      type: "text",
      id: "emailOrName",
      placeholder: "Enter your name or email",
      error: state.error.emailOrName,
      value: state.emailOrName,
    },
    {
      Title: "Password",
      htmlFor: "password",
      type: "password",
      id: "password",
      placeholder: "Enter your password",
      error: state.error.password,
      value: state.password,
    },
  ];

  const validateform = () => {
    if (state.emailOrName.length < 3) {
      dispatch({
        type: "SetErrorEmail",
        NextState: "Name/email or password is not valid",
      });
      return false;
    }
    if (state.password === "") {
      dispatch({
        type: "SetErrorPassword",
        NextState: "Name/email or password is not valid",
      });
      return false;
    }
    return true;
  };

  const setDefaultvalue = () => {
    dispatch({
      type: "default",
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validateform()) {
      auth
        .Login(state.emailOrName, state.password)
        .then(() => {
          window.location.href = "http://localhost:3000/";
        })
        .catch(() => {
          dispatch({
            type: "SetErrorEmail",
            NextState: "email/name or Password is invalid",
          });
        });
      setDefaultvalue();
    }
  };
  const inputLabelsStyles = "flex flex-col gap-2";
  const inputStyles =
    " h-full py-2  w-full bg-transparent rounded-l-md p-1 focus:outline-none focus:border-b focus:border-b-indigo-400";

  return (
    <form
      onSubmit={handleOnSubmit}
      className="min-h-screen flex lg:text-lg md:text-base sm:text-sm items-center justify-center min-w-screen bg-slate-300"
    >
      <div className="bg-white flex flex-col gap-4 p-4 h-2/4 w-2/4 max-w-[450px] min-w-[180px] rounded-[20px] border shadow-md">
        {state.error && (
          <div className="text-center text-red-500">
            {state.error.emailOrName
              ? state.error.emailOrName
              : state.error.password}
          </div>
        )}
        <div className="text-lg text-center mb-2 font-semibold ">
          LogIn with your Email or Name
        </div>
        <div className={` flex flex-col gap-2 `}>
          {inputsLabels.map((il, index) => (
            <div className={`  flex flex-col gap-1 `} key={index}>
              <label htmlFor="nameOrEmail">{il.Title}</label>
              <div className={` w-full  flex  items-center rounded-md border-b h-full`}>
                <input
                  className={`${inputStyles}`}
                  type={il.type}
                  id={il.id}
                  value={il.value}
                  placeholder={il.placeholder}
                  onChange={(e) => {
                    dispatch({
                      type: "Set" + il.id,
                      NextState: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/#" className="text-blue-500 underline">
            Forgot my password
          </Link>

          <button
            type="submit"
            className="disabled:bg-indigo-500  relative p-2 bg-indigo-600 text-white rounded-lg"
          >
            Login
          </button>
          <Link className="self-center text-blue-500 underline" to="/signup">
            i don't have an account
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignInPage;
