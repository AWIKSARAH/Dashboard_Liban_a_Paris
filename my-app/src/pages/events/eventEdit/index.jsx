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
import "./eventEdit.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageInput2 from "./imageInput";
import SocialMedia from "./socialMedia";
import MyCheckbox from "./checkbox";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import CategorySelect from "./categorySelect";


const EditEventDialog = ({ open, onClose, eventId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [socialMedia, setSocialMedia] = useState([
    { name: "facebook", url: "" },
  ]);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageObj, setImageObj] = useState("");
  const authHeader = useAuthHeader();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/${eventId}`
        );
        // setEvent(response.data.data);
        setTitle(response.data.data.title);
        setEmail(response.data.data.email);
        setWebsite(response.data.data.website);
        setTel(response.data.data.tel);
        setDescription(response.data.data.description);
        setStartDate(response.data.data.start_date)
        setEndDate(response.data.data.end_date)
        setSocialMedia(response.data.data.socialMedia);
        setTags(response.data.data.tags?.join(","));
        setLocation(response.data.data.location);
        setImage(response.data.data.image);
        setIsChecked(response.data.data.confirmation);
        setCategory(response.data.data.category);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchEvent();
    }
  }, [open, eventId]);

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
    formData.append("event", imageObj);
    try {
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files/event",
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
        tel,
        confirmation: isChecked,
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/events/${eventId}`,
        data,
        { headers: { Authorization: authHeader() } }
      );
      response.data.success === true &&
        toast.success("Event Updated Successfully");

      onClose(true);
    } catch (error) {
      toast.log(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={(e) => onClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Event</DialogTitle>
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
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
             <TextField
              autoFocus
              margin="dense"
              label="Website"
              type="text"
              fullWidth
              defaultValue={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Tel"
              type="text"
              fullWidth
              defaultValue={tel}
              onChange={(e) => setTel(e.target.value)}
            />
              <TextField
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
                multiline
                defaultValue={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
                  <TextField
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                multiline
                defaultValue={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              defaultValue={description}
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
              defaultValue={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
            <CategorySelect category={category} setCategory={setCategory}/>
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {/* <ImageUploader onImageUpload={setImage} /> */}
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

export default EditEventDialog;
