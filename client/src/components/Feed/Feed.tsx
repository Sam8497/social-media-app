import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Divider, IconButton, List, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField, Toolbar, Tooltip, Typography, Skeleton } from "@mui/material";
import "./Feed.css";
import { format } from "timeago.js"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { commentStuff, deletePost, likePost, updatePost } from "../../actions/posts"
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button"
import Checkbox from '@mui/material/Checkbox';
import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

type Props = {
  posts: any,
}

type UserType = {
  username: string
  email: string
  _id: number
}

const Feed = (props: Props) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [postUser, setPostUser] = useState<UserType>({
    username: "",
    email: "",
    _id: 0
  })
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/getbyid/${props?.posts?.userId}`).then((response) => {
      setPostUser(response.data);
      setLoading(false)
    })
  }, [axios, props?.posts?.userId])
  const profileRedirect = () => {
    navigate("/profile/" + postUser?._id);
  }
  const userboi = useSelector((user: any) => user?.user?.authData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //@ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  //@ts-ignore  
  const tokenboi = token?.token

  const deletePostboi = () => {
    handleClose()
    dispatch(deletePost(props?.posts?._id, tokenboi))
  }

  const [openreport, setOpenreport] = React.useState(false);

  const handleClickOpenreport = () => {
    setOpenreport(true);
  };

  const handleClosereport = () => {
    setOpenreport(false);
  };

  const reportPost = () => {
    handleClosereport()
    toast.success("Post Reported", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  const likePostBoi = () => {
    dispatch(likePost(props?.posts?._id, tokenboi))
  }

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenUpdate = () => {
    handleClose()
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const Input = styled('input')({
    display: 'none',
  });

  const [postDataUpdate, setPostDataUpdate] = useState({
    caption: props?.posts?.caption,
    image: "http://localhost:8000/images/" + props?.posts?.image
  })

  const [imageUrl, setImageUrl] = useState("")

  //@ts-ignore
  const imageUpload = async (e) => {
    setPostDataUpdate({ ...postDataUpdate, image: e?.target?.files[0] })
    setImageUrl(URL.createObjectURL(e?.target?.files[0]))
  }

  const updatePostBoi = () => {
    const data = new FormData()
    data.append("caption", postDataUpdate?.caption)
    data.append("image", postDataUpdate?.image)
    dispatch(updatePost(data, tokenboi, props?.posts?._id))
    handleCloseUpdate()
  }

  const [opencomment, setOpencomments] = React.useState(false);

  const handleClickOpencomments = () => {
    setOpencomments(true);
  };

  const handleClosecomments = () => {
    setOpencomments(false);
  };

  const [commentData, setCommentData] = useState("")

  const comment = {
    comment: commentData
  }

  const sendComment = () => {
    setCommentData("")
    dispatch(commentStuff(props?.posts?._id, comment, tokenboi))
  }

  return (
    <>
      {loading ? <div className="feed">
        <div className="header">
          <div className="user">
            <div className="pfpboi">
              <Skeleton variant="circular" width={48} height={48} animation="wave" />
            </div>
            <div className="userinfo">
              <Skeleton variant="text" width={120} height={28} animation="wave" />
              <Skeleton variant="text" width={60} height={28} animation="wave" />
            </div>
          </div>
          <Skeleton variant="text" width={8} height={48} animation="wave" />
        </div>
        <div className="image">
          <Skeleton variant="rectangular" width={"100%"} height={250} animation="wave" />
        </div>
        <div className="buttons">
          <div className="rightbuttons">
            <div style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px"
            }}>
              <Skeleton variant="circular" width={24} height={24} animation="wave" />
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px"
            }}>
              <Skeleton variant="circular" width={24} height={24} animation="wave" />
            </div>
            <Skeleton variant="circular" width={24} height={24} animation="wave" />
          </div>
          <div className="leftbuttons">
            <Skeleton variant="circular" width={24} height={24} animation="wave" />
          </div>
        </div>
        <div className="caption">
          <Skeleton variant="text" width={140} height={15} animation="wave" />
        </div>
        <Skeleton variant="text" width={60} height={15} animation="wave" /></div> :
        <div className="feed">
          <div className="header">
            <div className="user">
              <div className="pfpboi">
                <Tooltip title={postUser?.username}>
                  <Avatar src="" alt="" sx={{
                    width: 48,
                    height: 48,
                    cursor: "pointer"
                  }} onClick={profileRedirect} />
                </Tooltip>
              </div>
              <div className="userinfo">
                <h3>{postUser?.username}</h3>
                <small>{format(props?.posts?.createdAt)}</small>
              </div>
            </div>
            {props?.posts?.userId === userboi?._id ? <span className="edit" onClick={handleClick}>
              <i className="uil uil-ellipsis-v"></i>
            </span> : ""}
          </div>
          <div className="image">
            <img
              alt=""
              src={"http://localhost:8000/images/" + props?.posts?.image}
            />
          </div>
          <div className="buttons">
            <div className="rightbuttons">
              <div style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px"
              }}>
                <span onClick={likePostBoi}>
                  {props?.posts?.likes.includes(userboi?._id) ? <Tooltip title="Remove like"><i className="material-icons" style={{
                    fontSize: "1.3rem"
                  }}>
                    favorite
                  </i></Tooltip> : <Tooltip title="Add like"><i className="uil uil-heart"></i></Tooltip>}
                </span>
                <p style={{
                  color: "black",
                  fontSize: "16px"
                }}>{props?.posts?.likes?.length}</p>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px"
              }}>
                <span onClick={handleClickOpencomments}>
                  <Tooltip title="Comment">
                    <i className="uil uil-comment"></i>
                  </Tooltip>
                </span>
                <p style={{
                  color: "black",
                  fontSize: "16px"
                }}>{props?.posts?.comments?.length}</p>
              </div>
              <span onClick={handleClickOpenreport}>
                <Tooltip title="Report">
                  <i className="uil uil-megaphone"></i>
                </Tooltip>
              </span>
            </div>
            <div className="leftbuttons">
              <span onClick={() => {
                toast.info("This feature is not available yet", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
              }}>
                <Tooltip title="Save">
                  <i className="uil uil-bookmark"></i>
                </Tooltip>
              </span>
            </div>
          </div>
          <div className="caption">
            <span>
              {props?.posts?.caption}
            </span>
          </div>
          <p className="viewcomments" onClick={handleClickOpencomments}>View all comments</p>
          {/* edit delete menu  */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClickOpenUpdate} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <i className="uil uil-edit" style={{
                fontSize: "1.2rem",
                color: "#1d94d6"
              }}></i>
              <p style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#1d94d6"
              }}>Edit Post</p>
            </MenuItem>
            <MenuItem onClick={deletePostboi} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <i className="uil uil-trash-alt" style={{
                fontSize: "1.2rem",
                color: "#d74545"
              }}></i>
              <p style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#d74545"
              }}>Delete Post</p>
            </MenuItem>
          </Menu>
          {/* report dialog */}
          <Dialog
            open={openreport}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Report Post"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{
                width: "100%",
                display: "flex",
                gap: "1rem",
                flexDirection: "column"
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox />
                  <p>He/She copied my post :uganda:</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox defaultChecked disabled />
                  <p>post</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox />
                  <p>Siuuuuuuuuuuuuuuu</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox />
                  <p>Wait you dont know what karlson is ?</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox />
                  <p>Idk what i am doing with my lyfe help</p>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosereport}>Close</Button>
              <Button onClick={reportPost}>
                Report
              </Button>
            </DialogActions>
          </Dialog>
          {/* update post dialog */}
          <Dialog
            open={openUpdate}
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
              }}>Update Post</p>
              <IconButton onClick={handleCloseUpdate}>
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
                  setPostDataUpdate({ ...postDataUpdate, caption: e.target.value })
                }}
                defaultValue={postDataUpdate?.caption}
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
              }} /> : <img src={postDataUpdate?.image} alt="" style={{
                width: "100%",
                height: "auto",
              }} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {postDataUpdate?.image && postDataUpdate?.caption?.trim()?.length > 5 && postDataUpdate?.caption?.trim()?.length < 100 ? <Button onClick={updatePostBoi}>
                Update
              </Button> : <Button disabled>
                Update
              </Button>}
            </DialogActions>
          </Dialog>
          {/* comments dialog */}
          <Dialog
            fullScreen
            open={opencomment}
            style={{
              height: "100vh"
            }}
          >
            <AppBar sx={{ position: 'sticky' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClosecomments}
                  aria-label="close"
                >
                  <i className="uil uil-times"></i>
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Comments
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              {props?.posts?.comments?.map((comment: any) => (
                <>
                  <ListItem button>
                    <ListItemAvatar>
                      <Tooltip title={comment?.userboi?.username}>
                        <Avatar alt="" src="" sx={{
                          width: 50,
                          height: 50
                        }} onClick={() => {
                          navigate(`/profile/${comment?.userboi?._id}`)
                        }} />
                      </Tooltip>
                    </ListItemAvatar>
                    <ListItemText primary={comment?.userboi?.username} secondary={comment?.comment} />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
            <div style={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              background: "#e0dede",
              display: "flex",
              alignItems: "center",
              padding: "20px",
              gap: "1rem",
              borderRadius: "20px 20px 0 0px"
            }}>
              <Avatar alt="" src="" sx={{
                width: 50,
                height: 50,
                cursor: "pointer"
              }} />
              <TextField id="outlined-basic" label="Type Your comment ..." variant="outlined" style={{
                width: "56%"
              }} onChange={(e) => {
                setCommentData(e.target.value)
              }} />
              {commentData?.trim()?.length >= 5 && commentData?.trim()?.length <= 100 ? <Button variant="contained" onClick={sendComment}>Send</Button> : <Button variant="contained" disabled>Send</Button>}
            </div>
          </Dialog>
        </div>
      }
    </>
  );
};

export default Feed;
