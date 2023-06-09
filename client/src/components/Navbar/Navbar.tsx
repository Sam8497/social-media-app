import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Avatar, Tooltip, Menu, MenuItem, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { createPost } from "../../actions/posts";
import axios from "axios"

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userboi = useSelector((user: any) => user.user);
  const user = userboi?.authData;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const logout = () => {
    handleClose();
    navigate("/auth");
    dispatch({
      type: "LOGOUT",
    });
  };
  const profileRedirect = () => {
    navigate(`/profile/${user?._id}`);
    handleClose();
  };

  const [opencreate, setOpencreate] = React.useState(false);

  const handleClickOpencreate = () => {
    setOpencreate(true);
  };

  const handleClosecreate = () => {
    setOpencreate(false);
  };

  const Input = styled('input')({
    display: 'none',
  });

  const [postData, setPostData] = useState({
    caption: "",
    image: ""
  })

  const [imageUrl, setImageUrl] = useState("")

  //@ts-ignore
  const imageUpload = async (e) => {
    setPostData({ ...postData, image: e?.target?.files[0] })
    setImageUrl(URL.createObjectURL(e?.target?.files[0]))
  }

  //@ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  //@ts-ignore  
  const tokenboi = token?.token

  const createPostboi = () => {
    const data = new FormData()
    data.append("caption", postData?.caption)
    data.append("image", postData?.image)
    dispatch(createPost(data, tokenboi))
    handleClose()
  }

  const [search, setSearch] = useState("")

  return (
    <nav>
      <div className="container">
        <h2 className="logo">social media app</h2>
        <form onSubmit={(e: React.FormEvent) => {
          e.preventDefault()
          navigate("/search/" + search)
        }}>
          <div className="searchbar">
            <i className="uil uil-search"></i>
            <Tooltip title="Search Something">
              <input type="text" placeholder="Search Something ..." onChange={(e) => {
                setSearch(e.target.value)
              }} />
            </Tooltip>
          </div>
        </form>
        <div className="leftstuff">
          <Tooltip title="Create post">
            <p className="create-btn" onClick={handleClickOpencreate}>Create</p>
          </Tooltip>
          {user ? <Tooltip arrow title={user?.username}>
            <IconButton
              onClick={handleClick}
              sx={{
                padding: "2px",
              }}
            >
              <Avatar
                alt=""
                sx={{
                  width: 45,
                  height: 45,
                }}
              />
            </IconButton>
          </Tooltip> : <Skeleton animation="wave" variant="circular" width={50} height={50} />}
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={profileRedirect}
          style={{
            fontSize: "1.2rem",
            display: "flex",
            gap: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <i className="uil uil-user"></i>
          Profile
        </MenuItem>
        <MenuItem
          onClick={profileRedirect}
          style={{
            fontSize: "1.2rem",
            display: "flex",
            gap: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <i className="uil uil-edit"></i>
          Update Profile
        </MenuItem>
        <MenuItem
          onClick={logout}
          style={{
            fontSize: "1.2rem",
            display: "flex",
            gap: "0.4rem",
            fontWeight: "bold",
          }}
        >
          <i className="uil uil-signout"></i>
          Logout
        </MenuItem>
      </Menu>
      {/* create post modal */}
      <Dialog
        open={opencreate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <p style={{
            color: "black",
            fontSize: "1.4rem",
            fontWeight: "bold"
          }}>Create Post</p>
          <IconButton onClick={handleClosecreate}>
            <i className="uil uil-multiply"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          alignItems: "center",
          gap: "1rem"
        }}>
          <TextField
            id="outlined-textarea"
            placeholder="Caption ..."
            multiline
            rows={4}
            sx={{
              width: "540px"
            }}
            onChange={(e) => {
              setPostData({ ...postData, caption: e.target.value })
            }}
          />
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" type="file" onChange={imageUpload} />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {imageUrl !== "" ? <img src={imageUrl} alt="" style={{
            width: "100%",
            height: "auto",
          }} /> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosecreate}>Close</Button>
          {postData?.image && postData?.caption?.trim()?.length > 5 && postData?.caption?.trim()?.length < 100 ? <Button onClick={createPostboi}>
            Create
          </Button> : <Button disabled>
            Create
          </Button>}
        </DialogActions>
      </Dialog>
    </nav >
  );
};

export default Navbar;
