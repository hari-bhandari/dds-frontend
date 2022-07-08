import logo from './logo.svg';
import './App.css';
import React,{useEffect,useContext} from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import 'antd/dist/antd.min.css';
import authContext from "./context/auth/authContext";
import Documentation from "./components/Documentation";
function App() {
    const auth = useContext(authContext);
    const {loadUser} = auth;
    useEffect(() => {
        loadUser();
    }, [])
  return (
    <>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path={'/docs'} element={<Documentation/>} />
      </Routes>
    </>
  );
}

export default App;
