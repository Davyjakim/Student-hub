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

import { createBrowserRouter, Navigate,Outlet, RouterProvider } from "react-router-dom";
import Body from "./Component/Body.jsx";
import SignInPage from "./Component/SignInPage.jsx";
import UserService from "./ApiService/UserService.js";
import Cookie from "js-cookie";
import SignUpPage from "./Component/SignUpPage.jsx";
import Not_foundPage from "./Component/Not_foundPage.jsx";
export const AuthContext = createContext();

const ProtectedLayout = () => {
  const { authtoken } = React.useContext(AuthContext);
  console.log("Current auth token:", authtoken);
  if (!authtoken) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
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
    path:"*",
    element:<Not_foundPage/>
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
  }, [authtoken, Cookie.get("token")]);

  const logout = () => {
    Cookie.remove("token");
    setAuthToken(null);
    setUser({});
    window.location.href = `${window.location.origin}/login`;
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
    
  );
};

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<AppWithRouter />);
}


