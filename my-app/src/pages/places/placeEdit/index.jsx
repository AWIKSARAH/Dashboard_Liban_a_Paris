import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./placeEdit.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ScheduleDay from "./day";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const socialMediaOptions = ["facebook", "twitter", "instagram", "linkedIn"];
const EditPlaceDialog = ({ open, onClose, placeId }) => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
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
  // const [image, setImage] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/places/${placeId}`
        );
        setPlace(response.data.data);
        setTitle(response.data.data.title);
        setEmail(response.data.data.email);
        setTel(response.data.data.tel);
        setDescription(response.data.data.description);
        setSocialMedia(response.data.data.socialMedia);
        setTags(response.data.data.tags);
        setSchedule(response.data.data.schedule);
        setLocation(response.data.data.location);
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

  // const handleAddSocialMedia = () => {
  //   setSocialMedia([...socialMedia, { name: "", url: "" }]);
  // };

  const handleSave = async () => {
    const data = {
      title,
      email,
      description,
      socialMedia,
      tags,
      // image,
      location,
      schedule,
    };
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/places/${placeId}`, data)
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={(e)=>onClose(false)} aria-labelledby="form-dialog-title">
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
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="social-media">Social Media</InputLabel>
              <Select
                multiple
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                input={<Input id="social-media" />}
                renderValue={(selected) =>
                  selected.map((item) => item.name + ": " + item.url).join(", ")
                }
              >
                {socialMediaOptions.map((option) => (
                  <MenuItem key={option.name} value={option}>
                    <Checkbox
                      checked={socialMedia.some(
                        (item) => item.name === option.name
                      )}
                    />
                    <ListItemText primary={option.name} />
                    <TextField
                      margin="dense"
                      type="url"
                      value={
                        socialMedia.find((item) => item.name === option.name)
                          ?.url || ""
                      }
                      onChange={(e) =>
                        handleSocialMediaChange(socialMedia.indexOf(option), e)
                      }
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Tags"
              type="text"
              fullWidth
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(",").trim())}
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
            {/* <ScheduleEditor schedule={schedule} onChange={setSchedule} /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={(e)=>onClose()} color="primary">
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
};

export default EditPlaceDialog;
