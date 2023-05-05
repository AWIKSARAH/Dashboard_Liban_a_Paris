import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const socialMediaOptions = ["facebook", "twitter", "instagram", "linkedIn"];

function SocialMedia(props) {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <FormControl sx={{ mr: 2,marginBottom:"10px" }}>
        <InputLabel>Social Media</InputLabel>
        <Select
        sx={{width:"130px"}}
          name="name"
          value={props.item.name}
          onChange={(e) => props.handleSocialMediaChange(props.index, e)}
        >
          {socialMediaOptions.map((option, index) => {
            return (
              <MenuItem value={option} key={index}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        name="url"
        type="text"
        placeholder="URL"
        value={props.item.url}
        onChange={(e) => props.handleSocialMediaChange(props.index, e)}
      />
    </Box>
  );
}

export default SocialMedia;
