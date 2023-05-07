import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./placeEdit.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import MyCheckbox from "./checkbox";

// const socialMediaOptions = ["facebook", "twitter", "instagram", "linkedIn"];
const EditUserDialog = ({ open, onClose, UserId }) => {
  //   const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [IsAdmin, setIsChecked] = useState(false);

  const authHeader = useAuthHeader();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSave = async () => {
    try {
      const data = {
        email,
        name,
        password,
        tel,
        IsAdmin,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        data,
        { headers: { Authorization: authHeader() } }
      );
      response.data.success === true &&
        toast.success("User Updated Successfully");

      onClose(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  useEffect(()=>{
    setLoading(false);
  },[]);
  return (
    <Dialog
      open={open}
      onClose={(e) => onClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
      {loading ? (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      ) : error ? (
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
            />

            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Tel"
              type="text"
              fullWidth
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <MyCheckbox checked={IsAdmin} onChange={handleCheckboxChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>{" "}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EditUserDialog;
