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

// import { CheckBox } from "@mui/icons-material";
import MyCheckbox from "./checkbox";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
// const socialMediaOptions = ["facebook", "twitter", "instagram", "linkedIn"];
const EditPlaceDialog = ({ open, onClose, placeId }) => {
  //   const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");



  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/places/${placeId}`
        );
        // setPlace(response.data.data);
        setTitle(response.data.data.title);
        setEmail(response.data.data.email);
        setTel(response.data.data.tel);
        setDescription(response.data.data.description);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchPlace();
    }
  }, [open, placeId]);

  const handleSocialMediaChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...socialMedia];

    list[index][name] = value;
    setSocialMedia(list);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { name: "", url: "" }]);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("place", imageObj);
    try {
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files",
          formData,
          { headers: { Authorization: authHeader() } }
        );
      }
      const data = {
        title,
        email,
        description,
        socialMedia,
        tags: tags.split(",").map((e) => e.trim()),
        image: uploadResponse?.data.image || image,
        location,
        schedule,
        tel,
        confirmation: isChecked,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/places/${placeId}`,
        data,
        { headers: { Authorization: authHeader() } }
      );
      response.data.success === true &&
        toast.success("Place Updated Successfully");

      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={(e) => onClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Place</DialogTitle>
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
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Tel"
              type="text"
              fullWidth
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {socialMapper()}
            <Button
              name="add-social-media"
              type="button"
              onClick={handleAddSocialMedia}
            >
              Add Social Media
            </Button>
            <TextField
              margin="dense"
              label="Tags"
              type="text"
              fullWidth
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {/* <ImageUploader onImageUpload={setImage} /> */}
            {scheduleMapper()}
            <MyCheckbox checked={isChecked} onChange={handleCheckboxChange} />

            {/* <ScheduleEditor schedule={schedule} onChange={setSchedule} /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
  function scheduleMapper() {
    return days.map((day) => (
      <ScheduleDay
        day={day}
        key={day}
        schedule={schedule}
        setSchedule={setSchedule}
      />
    ));
  }
  function socialMapper() {
    return socialMedia.map((item, index) => (
      <SocialMedia
        key={index}
        handleSocialMediaChange={handleSocialMediaChange}
        item={item}
        index={index}
      ></SocialMedia>
    ));
  }
};

export default EditPlaceDialog;
