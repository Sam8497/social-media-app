import React, { useState, useEffect } from "react";
import "./Profile.css";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_user_by_id } from "../../actions/user";
import NavbarDark from "../../components/NavbarDark/NavbarDark";
import Navbar from "../../components/Navbar/Navbar";
import RightSidebarDark from "../../components/RightSidebarDark/RightSidebarDark";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import ProfileMiddleStuffDark from "../../components/ProfileMiddleStuffDark/ProfileMiddleStuffDark";
import ProfileMiddleStuff from "../../components/ProfileMiddleStuff/ProfileMiddleStuff";
import ProfileSidebarDark from "../../components/ProfileSidebarDark/ProfileSidebarDark";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { getProfile } from "../../actions/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
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
    document.title = "Social Media App - Profile";
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
  useEffect(() => {
    const { profileid } = params;
    dispatch(getProfile(profileid as string));
  }, [params, dispatch]);
  const { profileData } = useSelector((profile: any) => profile.profile);
  return (
    <div>
      {theme === "dark" ? <NavbarDark /> : <Navbar />}
      <main>
        <div className="container">
          {theme === "dark" ? <RightSidebarDark /> : <RightSidebar />}
          {theme === "dark" ? (
            <ProfileMiddleStuffDark />
          ) : (
            <ProfileMiddleStuff />
          )}
          {theme === "dark" ? (
            <ProfileSidebarDark profileData={profileData} />
          ) : (
            <ProfileSidebar profileData={profileData} />
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Profile;
