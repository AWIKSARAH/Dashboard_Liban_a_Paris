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
import "./blogEdit.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageInput2 from "./imageInput";
import { toast } from "react-hot-toast";


const EditBlogDialog = ({ open, onClose, blogId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [imageObj, setImageObj] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blog/${blogId}`
        );
        console.log(response)
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
        setTags(response.data.data.tags?.join(','));
        setImage(response.data.data.image);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchPlace();
    }
  }, [open, blogId]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("blog", imageObj);
    try {
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files",
          formData
        );
      }
      var data = {
        title,
        description,
        tags:tags.split(",").map(e=>e.trim()),
        image: uploadResponse?.data.image,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/blog/${blogId}`,
        data
      );
      response.data.success === true &&
        toast.success("Blog Updated Successfully");

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
