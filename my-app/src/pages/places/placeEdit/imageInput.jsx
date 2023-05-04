import { useState } from "react";
import styled from "styled-components";

  const ImageInput = styled.input`
    display: none;
  `;
  
  const ImageLabel = styled.label`
    display: flex;
    background-color: #e8eeef;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height:300px;
    width:300px;
    min-width: 150px;
    min-height: 150px;
    overflow: hidden;
    `;
    
    const PreviewImage = styled.img`
    width: 100%;
    height: 50%;
    object-fit: cover;
    `;
    
    const ImageInput2 = (props) => {
      const [image, setImage] = useState(null);
      
      const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        if(file){
        props.setImage(file)

      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);}
    };
  
    return (
        <>
        <ImageInput
          type="file"
          id="image"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
        />
        <ImageLabel htmlFor="image">
          {image ? (
            <PreviewImage src={image} alt="Preview" />
          ) : (
              <span>Upload an image</span>
              )}
        </ImageLabel>
              </>
    );
  };
  
  export default ImageInput2