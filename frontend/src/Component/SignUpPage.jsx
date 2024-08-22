import React, { useReducer, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import UserService from "../ApiService/UserService";
import { ImSpinner } from "react-icons/im";
import { Link } from "react-router-dom";
function reducer(state, action) {
  switch (action.type) {
    case "setname": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "setemail": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "setpassword": {
      return {
        ...state,
        password: action.payload,
      };
    }
    case "setConfirm_Pasword": {
      return {
        ...state,
        confirmpassword: action.payload,
      };
    }
    case "setnameError": {
      return {
        ...state,
        errors: {
          ...state.errors,
          name: action.payload,
        },
      };
    }
    case "setpasswordError": {
      return {
        ...state,
        errors: {
          ...state.errors,
          password: action.payload,
        },
      };
    }
    case "set_Confirmpassword_Error": {
      return {
        ...state,
        errors: {
          ...state.errors,
          confirmpassword: action.payload,
        },
      };
    }

    default: {
      return {
        state,
      };
    }
  }
}

function SignUpPage() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      name: "",
      password: "",
      confirmpassword: "",
    },
  });
  const [signupSucess, setsignupSucess]=useState(false)
  const [errormessage, seterrormessage] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isvisiblePassword, setIsviblePassword] = useState(false);
  const [isvisibleCPassword, setIsvibleCPassword] = useState(false);
  const validatePassword = () => {
    let passwordErrors = ["Password"];
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(state.password);
    const hasLowerCase = /[a-z]/.test(state.password);
    const hasNumber = /[0-9]/.test(state.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(state.password);
    if (state.password.length < minLength) {
      passwordErrors.push("should be longer than 6 characters");
    }
    if (!hasUpperCase) {
      passwordErrors.push("should atleast have one uppercase letter");
    }
    if (!hasLowerCase) {
      passwordErrors.push("should atleast have one lowercase letter");
    }
    if (!hasNumber) {
      passwordErrors.push("should atleast contain one number");
    }
    if (!hasSpecialChar) {
      passwordErrors.push("should atleast contain one special character");
    }
    if (
      hasUpperCase &&
      hasLowerCase &&
      state.password.length >= minLength &&
      hasSpecialChar &&
      hasNumber
    ) {
      passwordErrors = [];
    }
    dispatch({
      type: "setpasswordError",
      payload: passwordErrors.join(", "),
    });
    return passwordErrors.join(", ").length > 0;
  };

  const validateConfirmPassWord = () => {
    let confirmPassError = "";
    if (state.password !== state.confirmpassword) {
      confirmPassError = "password do not match";
    }
    dispatch({
      type: "set_Confirmpassword_Error",
      payload: confirmPassError,
    });
    return confirmPassError.length > 0;
  };
  const validateName = () => {
    let ErrorName = "";
    if (state.name.length < 4) {
      ErrorName = "Name should be 4 or more character long";
    }
    dispatch({
      type: "setnameError",
      payload: ErrorName,
    });
    return ErrorName.length > 0;
  };

  const ValidateForm = () => {
    const passwordErrors = validatePassword();
    const confirmPassErrors = validateConfirmPassWord();
    const ErrorName = validateName();
    if (passwordErrors || confirmPassErrors || ErrorName) {
      return false;
    } else {
      return true;
    }
  };

  const inputLabelsStyles = "flex flex-col gap-2";
  const inputStyles =
    " h-full w-full py-2    bg-transparent rounded-l-md p-1 focus:outline-none focus:border-b focus:border-b-indigo-400";
  const inputsLabels = [
    {
      Title: "Name",
      htmlFor: "name",
      type: "text",
      id: "name",
      placeholder: "Enter your name",
      error: state.errors.name,
    },
    {
      Title: "Email",
      htmlFor: "email",
      type: "email",
      id: "email",
      placeholder: "Enter your email",
    },
    {
      Title: "Password",
      htmlFor: "password",
      type: "password",
      id: "password",
      placeholder: "Enter your password",
      error: state.errors.password,
    },
    {
      Title: "Confirm Pasword",
      htmlFor: "Confirm_Pasword",
      type: "password",
      id: "Confirm_Pasword",
      placeholder: "Renter your password",
      error: state.errors.confirmpassword,
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (ValidateForm()) {
      setisloading(true);
      UserService.SignUp(state.name, state.email, state.password)
        .then((res) => {
          console.log(res.data);
          setsignupSucess(true)
          seterrormessage("");
        })
        .catch((error) => {
          seterrormessage(error.response.data);
        })
        .finally(() => {
          setisloading(false);
        });
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="min-h-screen flex out items-center lg:text-lg md:text-base sm:text-sm justify-center min-w-screen bg-slate-300"
    >
      {signupSucess && (
        <div className="bg-black bg-opacity-30 fixed z-10 flex justify-center h-screen w-full">
          <div className=" relative w-2/4 max-w-[250px] min-w-[180px] flex flex-col gap-4 rounded-[20px] h-max z-10 transform translate-y-6 p-3  bg-white">
            <div>
              Thank you for signing up. You will receive an email once your
              acount is ready
            </div>
            <a onClick={()=>{
                setsignupSucess(false)
            }} href="/login" className="bg-indigo-600 text-center text-white w-full h-full rounded-md">
             close
            </a>
          </div>
        </div>
      )}
      <div className="h-2/4 w-2/4 max-w-[450px] min-w-[180px] flex gap-3 flex-col bg-white p-5 rounded-[20px] shadow-md">
        {errormessage ? (
          <div className=" text-red-600">{errormessage}</div>
        ) : (
          ""
        )}

        {inputsLabels.map((iL, index) => (
          <div key={index} className={`${inputLabelsStyles}`}>
            <label htmlFor={iL.htmlFor}>{iL.Title}</label>
            <div className="w-full flex  items-center rounded-md border-b h-full ">
              <input
                className={`${inputStyles}`}
                type={
                  iL.id === "password"
                    ? isvisiblePassword
                      ? "text"
                      : "password"
                    : iL.id === "Confirm_Pasword"
                    ? isvisibleCPassword
                      ? "text"
                      : "password"
                    : iL.id
                }
                id={iL.id}
                placeholder={iL.placeholder}
                onChange={(e) => {
                  dispatch({
                    type: "set" + iL.id,
                    payload: e.target.value,
                  });
                }}
                onBlur={() => {
                  if (iL.id === "password") {
                    validatePassword();
                  }
                  if (iL.id !== "Confirm_Password") {
                    validateConfirmPassWord();
                  }
                  if (iL.id === "name") {
                    validateName();
                  }
                }}
                autocomplete="off"
                required
              />
              {iL.id === "password" &&
                (isvisiblePassword ? (
                  <FaRegEye
                    onClick={() => setIsviblePassword(!isvisiblePassword)}
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setIsviblePassword(!isvisiblePassword)}
                  />
                ))}
              {iL.id === "Confirm_Pasword" &&
                (isvisibleCPassword ? (
                  <FaRegEye
                    onClick={() => setIsvibleCPassword(!isvisibleCPassword)}
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setIsvibleCPassword(!isvisibleCPassword)}
                  />
                ))}
            </div>
            {iL.error && (
              <div className="rounded-lg p-1  text-red-600">{iL.error}</div>
            )}
          </div>
        ))}

        <Link className="  text-blue-500 mt-2 underline" to="/login">
            i have an account
        </Link>
        <button
          className={` disabled:bg-indigo-500  relative p-2 bg-indigo-600 text-white rounded-lg `}
          disabled={isloading}
        >
          <div>SignUp</div>
          {isloading && (
            <ImSpinner className="absolute h-5 w-5  animate-spin spinning top-[30%]" />
          )}
        </button>
        
      </div>
    </form>
  );
}

export default SignUpPage;
