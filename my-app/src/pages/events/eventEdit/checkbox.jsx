import { Checkbox, FormControlLabel } from '@mui/material';

function MyCheckbox(props) {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label="Confirmation"
      {...props}
    />
  );
}

export default MyCheckbox;
