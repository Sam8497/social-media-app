import React, { useState } from "react";
import "./ProfileSidebarDark.css";
import { Avatar, Tooltip, Button, IconButton, TextField, Skeleton, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { followUser, updateProfile } from "../../actions/profile"
import { toast } from "react-toastify";


interface Sample {
  profileData: any;
}

const ProfileSidebarDark = (props: Sample) => {
  const profileData = props.profileData;
  const { authData } = useSelector((user: any) => user.user);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  type updateProfileDataType = {
    username: string;
    email: string;
    bio: string;
  }

  const [updateProfileData, setUpdateProfileData] = useState<updateProfileDataType>({
    username: authData?.username,
    email: authData?.email,
    bio: authData?.bio
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //@ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  //@ts-ignore  
  const tokenboi = token?.token

  const updateProfileboi = () => {
    handleClose()
    dispatch(updateProfile(updateProfileData, tokenboi))
  }

  const [reloading, setreloading] = useState(false)

  const followBoi = () => {
    setreloading(true)
    //@ts-ignore
    dispatch(followUser(profileData._id, tokenboi))
    setTimeout(() => {
      setreloading(false)
      //@ts-ignore
    }, [1700])
  }
  return (
    <div className="profilesidebardark">
      <div className="profilesidebarboi">
        <div className="body">
          <div className="stuff">
            {profileData ? <Tooltip title={profileData?.username} arrow>
              <Avatar
                alt=""
                style={{
                  cursor: "pointer",
                  height: "12rem",
                  width: "12rem",
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                }}
              />
            </Tooltip> : <Skeleton animation="wave" variant="circular" width={200} height={200} sx={{ bgcolor: 'grey.900' }}
            />}
            {profileData ? <h1>{profileData?.username}</h1> : <Skeleton animation="wave" variant="text" width={140} height={30} style={{
              marginTop: "5px"
            }} sx={{ bgcolor: 'grey.900' }} />}
            {profileData ? <p>{profileData?.bio}</p> : <Skeleton animation="wave" variant="text" width={190} height={40} style={{
              marginTop: "5px"
            }} sx={{ bgcolor: 'grey.900' }} />}
            <div className="stats">
              <div>
                {profileData ? <h6>Followers</h6> : <Skeleton animation="wave" variant="text" width={90} height={20} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
                {profileData ? <p>{profileData?.followers?.length}</p> : <Skeleton animation="wave" variant="text" width={50} height={20} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
              </div>
              <div>
                {profileData ? <h6>Following</h6> : <Skeleton animation="wave" variant="text" width={90} height={20} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
                {profileData ? <p>{profileData?.following?.length}</p> : <Skeleton animation="wave" variant="text" width={50} height={20} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
              </div>
            </div>
            {authData?._id === profileData?._id ? (
              <div className="buttons">
                {profileData ? <Button variant="outlined" onClick={handleClickOpen}>
                  Update Profile
                </Button> : <Skeleton animation="wave" variant="text" width={200} height={40} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
              </div>
            ) : (
              <div className="buttons">
                {profileData ? !reloading ? <Button variant="outlined" onClick={followBoi}>
                  {profileData?.followers?.includes(authData?._id) ? "Unfollow" : "Follow"}
                </Button> : <CircularProgress /> : <Skeleton animation="wave" variant="text" width={100} height={40} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
                {profileData ? <Button variant="outlined" onClick={() => {
                  toast.info("This feature is not available yet", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  })
                }}>Message</Button> : <Skeleton animation="wave" variant="text" width={100} height={40} style={{
                  marginTop: "5px"
                }} sx={{ bgcolor: 'grey.900' }} />}
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Update Profile
          <IconButton onClick={handleClose}>
            <i className="uil uil-multiply"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              defaultValue={updateProfileData.username}
              onChange={(e) => setUpdateProfileData({ ...updateProfileData, username: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              defaultValue={updateProfileData.email}
              onChange={(e) => setUpdateProfileData({ ...updateProfileData, email: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              multiline
              rows={4}
              defaultValue={updateProfileData.bio}
              onChange={(e) => setUpdateProfileData({ ...updateProfileData, bio: e.target.value })}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {updateProfileData?.username?.trim()?.length > 3 && updateProfileData?.username?.trim()?.length < 16 && updateProfileData?.email?.includes("@") ? <Button onClick={updateProfileboi}>Update</Button> : <Button disabled>Update</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileSidebarDark;
