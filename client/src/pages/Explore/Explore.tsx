import React, { useEffect, useState } from "react";
import LeftSidebarDark from "../../components/LeftSidebarDark/LeftSidebarDark";
import Navbar from "../../components/Navbar/Navbar";
import NavbarDark from "../../components/NavbarDark/NavbarDark";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import "./Explore.css";
import RightSidebarDark from "../../components/RightSidebarDark/RightSidebarDark";
import ExploreMiddle from "../../components/ExploreMiddle/ExploreMiddle";
import ExploreMiddleDark from "../../components/ExploreMiddleDark/ExploreMiddleDark";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_user_by_id } from "../../actions/user";
import { getTrendingPosts } from "../../actions/posts";

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    const themeboi = localStorage.getItem("theme");
    if (!themeboi) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme(themeboi);
    }
  }, []);
  useEffect(() => {
    document.title = "Social Media App - Explore";
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#272729" : "#dae0e6";
  }, [theme]);
  useEffect(() => {
    let token = [];
    try {
      //@ts-ignore
      token = JSON.parse(localStorage.getItem("token"));
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    if (!token) {
      navigate("/auth");
    } else {
      const tokenboi = token?.token;
      const userinfo = jwt_decode(tokenboi);
      //@ts-ignore
      dispatch(get_user_by_id(userinfo?.user?._id, navigate));
    }
  }, [navigate, dispatch]);
  return (
    <div>
      {theme === "dark" ? <NavbarDark /> : <Navbar />}
      <main>
        <div className="container">
          {theme === "dark" ? <RightSidebarDark /> : <RightSidebar />}
          {theme === "dark" ? <ExploreMiddleDark /> : <ExploreMiddle />}
          {theme === "dark" ? <LeftSidebarDark /> : <LeftSidebar />}
        </div>
      </main>
    </div>
  );
};

export default Explore;
