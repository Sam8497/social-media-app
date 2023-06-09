import React, { useEffect, useState } from "react";
import "./LeftSidebar.css";
import axios from "axios"
import { Avatar, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const [profileToFollow, setprofileToFollow] = React.useState([])
  const navigate = useNavigate()
  //@ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  //@ts-ignore  
  const tokenboi = token?.token
  const [loading, setloading] = useState(true)
  console.log(loading)
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/whotofollow", {
      headers: {
        "token": tokenboi
      }
    }).then(res => {
      setprofileToFollow(res.data)
      setloading(false)
    })
  }, [axios])
  const profileRedirect = (id: any) => {
    navigate(`/profile/${id}`)
  }
  const { authData } = useSelector((user: any) => user.user);
  return (
    <div className="leftsidebarfollow">
      <div className="whotofollow">
        <div className="upper">
          <h2>Who to follow</h2>
          <h3>View more</h3>
        </div>
        <div className="body">
          {loading ? <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <CircularProgress />
            <CircularProgress />
            <CircularProgress />
          </div> :
            profileToFollow?.map((profile: any) => (
              <div className="idiots">
                <div className="idiotinfo">
                  <Avatar src="" alt="" sx={{
                    width: 43,
                    height: 43
                  }} onClick={() => { profileRedirect(profile?._id) }} />
                  <p>{profile?.username?.length > 4 ? profile?.username?.slice(0, 5) + "..." : profile?.username}</p>
                </div>
                <p className="follow" onClick={() => { profileRedirect(profile?._id) }}>{profile?.followers?.includes(authData?._id) ? "Unfollow" : "Follow"}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="topicsfollow">
        <div className="upper">
          <h2>Topics to follow</h2>
          <h3>More topics</h3>
        </div>
        <div className="tags-wrapper">
          <span className="tag">
            <small>TypeScript</small>
          </span>
          <span className="tag">
            <small>ReactJS</small>
          </span>
          <span className="tag">
            <small>NodeJs</small>
          </span>
          <span className="tag">
            <small>JavaScript</small>
          </span>
          <span className="tag">
            <small>MongoDB</small>
          </span>
          <span className="tag">
            <small>CSS</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
