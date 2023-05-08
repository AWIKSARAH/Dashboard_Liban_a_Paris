import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import { toast } from "react-hot-toast";
import ImageInput2 from "../places/placeEdit/imageInput";

const ContactInfoModal = ({
  isOpen,
  handleClose,
  initialData,
  id,
  handleRefresh,
}) => {
  const authHeader = useAuthHeader();
  const [formData, setFormData] = useState(initialData);
  const [image, setImage] = useState(initialData.logo);
  const [imageObj, setImageObj] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialMedia: prevFormData.socialMedia.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleAddSocialMedia = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      socialMedia: [
        ...prevFormData.socialMedia,
        {
          name: "",
          url: "",
        },
      ],
    }));
  };

  const handleSave = async () => {
    // axios
    // .patch(`${process.env.REACT_APP_API_URL}/info/${id}`, formData, {
    //   headers: { Authorization: authHeader() },
    // })
    // .then(() => {
    //   // Send the second request to upload the image
    //   if (logoFile) {
    //     const imageFormData = new FormData();
    //     imageFormData.append("logo", logoFile);

    //     axios
    //       .post(`${process.env.REACT_APP_API_URL}/files/logo`, imageFormData, {
    //         headers: { Authorization: authHeader() },
    //       })
    //       .then(() => {
    //         handleClose();
    //         handleRefresh();
    //         toast.success("The About Updated Successfully");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         toast.error(err.message);
    //       });
    //   } else {
    //     handleClose();
    //     handleRefresh();
    //     toast.success("The About Updated Successfully");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   toast.error(err.message);
    // });
    const formDataImage = new FormData();
    formDataImage.append("logo", imageObj);
    try {
      console.log(formDataImage);
      if (imageObj) {
        var uploadResponse = await axios.post(
          "http://localhost:5000/api/files/logo",
          formDataImage,
          { headers: { Authorization: authHeader() } }
        );
      }
      setFormData ( {
        ...formData,
        logo: uploadResponse?.data.image || image,
      });
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/info/${id}`,
        formData,
        { headers: { Authorization: authHeader() } }
      );
      response.data.success === true && handleClose();
      handleRefresh();
      toast.success("About Updated Successfully");
      handleClose();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Contact Information</DialogTitle>
      <DialogContent>
        <TextField
          label="About Us"
          name="aboutUs"
          value={formData.aboutUs}
          onChange={handleInputChange}
          multiline
          sx={{ mb: 5, ml: 5 }}
        />
        {formData.socialMedia.map((socialMedia, index) => (
          <div key={index}>
            <TextField
              label="Social Media Name"
              name="name"
              value={socialMedia.name}
              onChange={(event) => handleSocialMediaChange(event, index)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Social Media URL"
              name="url"
              value={socialMedia.url}
              onChange={(event) => handleSocialMediaChange(event, index)}
              sx={{ mb: 5, ml: 5 }}
            />
          </div>
        ))}
        <Button onClick={handleAddSocialMedia}>Add Social Media</Button>
        <ImageInput2 image={image} setImage={setImageObj} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactInfoModal;
