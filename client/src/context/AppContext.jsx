import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isHeadAdmin, setIsHeadAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  //Function to fetch the user data
  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsHeadAdmin(data.user.role === "head_admin");
        setIsOwner(
          data.user.role === "owner" && data.user.approvalStatus === "approved"
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUserLoading(false);
    }
  };
  //function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to log out the user
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    setIsHeadAdmin(false);

    axios.defaults.headers.common["Authorization"] = "";

    toast.success("You have been logged out");
  };

  //useEffect to retrive the token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchCars();

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data?.message) {
          error.message = error.response.data.message;
        }
        if (error.response?.status === 401) {
          if (localStorage.getItem("token")) {
            logOut();
          }
          return new Promise(() => { });
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  //useEffect to fetch user data when  token is availiable
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);
  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    isHeadAdmin,
    setIsHeadAdmin,
    fetchUser,
    showLogin,
    setShowLogin,
    loginMode,
    setLoginMode,
    logOut,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    userLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
