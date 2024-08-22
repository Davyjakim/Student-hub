import React, {
  createContext,
  useLayoutEffect,
  useEffect,
  useMemo,
  useState,
  Suspense,
} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./Component/Body.jsx";
import SignInPage from "./Component/SignInPage.jsx";
import UserService from "./ApiService/UserService.js";
import Cookie from "js-cookie";
import SignUpPage from "./Component/SignUpPage.jsx";
import EventForm from "./Component/Orline.jsx";
export const AuthContext = createContext();

const ProtectedLayout = () => {
  const { authtoken } = React.useContext(AuthContext);
  if (!authtoken) {
    // Redirect to the login page if the user is not authenticated
    window.location.href = "http://localhost:3000/login";
    return <div>...loading</div>;
  }
  return <Outlet />;
};
const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },{
    path:"/orline",
    element:<EventForm/>
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
    ],
  },
]);

const AppWithRouter = () => {
  const [userdetails, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [authtoken, setAuthToken] = useState(Cookie.get("token"));
  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, errors } = await UserService.getUser();
        //remove code if there before pushing changes
        const { friends, freindsfetchError } = await UserService.getfriends();
        setFriends(friends);
        setUser(user);
        if (errors || freindsfetchError) {
          //console.log(errors)
        }
      } catch (error) {}
    };

    fetchUser(); // Call the async function
  }, [authtoken]);
  useEffect(() => {
    const token = Cookie.get("token");
    if (token !== authtoken) {
      setAuthToken(token);
    }
  }, [authtoken]);

  const logout = () => {
    window.location.href = "http://localhost:3000/login";
    Cookie.remove("token");
    setUser({});
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  const contextValue = useMemo(
    () => ({
      userdetails,
      authtoken,
      friends,
      logout,
      updateUser,
    }),
    [userdetails, friends, authtoken]
  );

  return (
    <React.StrictMode>
      <AuthContext.Provider value={contextValue}>
        <Suspense
          fallback={
            <div className="fixed bg-white h-screen w-screen text-[200px] font-extrabold ">
              ...loading
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AppWithRouter />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
