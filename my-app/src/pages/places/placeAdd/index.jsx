import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import "./placeEdit.css";
import axios from "axios";
import { useState } from "react";
import ScheduleDay from "./day";
import ImageInput2 from "./imageInput";
import SocialMedia from "./socialMedia";
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

const placeTypes = [
  "health",
  "food",
  "readytowear",
  "services",
  "places",
  "rentalspaces",
  "community",
  "caterers",
  "restaurants",
  "groceries",
  "pastryshops",
  "ouraddresses",
  "gastronomy",
  "streetfood",
  "restaurantofthemonth",
  "news",
  "associations",
  "courses",
];

// const socialMediaOptions = ["facebook", "twitter", "instagram", "linkedIn"];
const EditPlaceDialog = ({ open, onClose, placeId }) => {
  //   const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [description, setDescription] = useState("");
  const [socialMedia, setSocialMedia] = useState([
    { name: "facebook", url: "" },
  ]);
  const [tags, setTags] = useState("");
  const [schedule, setSchedule] = useState({
    monday: { status: "closed", fromTo: "" },
    tuesday: { status: "closed", fromTo: "" },
    wednesday: { status: "closed", fromTo: "" },
    thursday: { status: "closed", fromTo: "" },
    friday: { status: "closed", fromTo: "" },
    saturday: { status: "closed", fromTo: "" },
    sunday: { status: "closed", fromTo: "" },
  });
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageObj, setImageObj] = useState("");
  const authHeader = useAuthHeader();
  const [placeType, setPlaceType] = useState("");

  const handlePlaceTypeChange = (event) => {
    setPlaceType(event.target.value);
  };
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

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("place", imageObj);
    try {
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files/place",
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
        placeType
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/places/`,
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
      <DialogTitle id="form-dialog-title">Add Place</DialogTitle>
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
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
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
            <div>
              <Select value={placeType} onChange={handlePlaceTypeChange}>
                {placeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </div>
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
            <ImageInput2 image={image} setImage={setImageObj} />
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
