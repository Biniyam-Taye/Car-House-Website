import React from "react";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./layout/LayoutWrapper";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();

  return (
    <>
      <Toaster />
      <LayoutWrapper />
    </>
  );
};

export default App;
