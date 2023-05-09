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
  InputLabel,
} from "@mui/material";
import "./blogEdit.css";
import axios from "axios";
import {  useState } from "react";
import ImageInput2 from "./imageInput";
import { toast } from "react-hot-toast";

const EditBlogDialog = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageObj, setImageObj] = useState("");

  const types = [
    "jobs",
    "housing",
    "sale",
    "activities",
    "invitations",
    "discounts",
    "blog",
    "tourism",
    "youth",
  ];
  const [type, setType] = useState("");


  const handleSave = async () => {
    const formData = new FormData();
    formData.append("blog", imageObj);
    try {
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files/blog",
          formData
        );
      }
      var data = {
        title,
        description,
        tags: tags.split(",").map((e) => e.trim()),
        image: uploadResponse?.data.image,
        type
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blog`,
        data
      );
      response.data.success === true &&
        toast.success("Blog Created Successfully");

      onClose(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={(e) => onClose(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Blog</DialogTitle>
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
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              margin="dense"
              label="Tags"
              type="text"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={type}
              onChange={e=>setType(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <ImageInput2 image={image} setImage={setImageObj} />
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
};

export default EditBlogDialog;
