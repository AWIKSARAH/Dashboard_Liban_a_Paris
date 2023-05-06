import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const categories = [
  "cinema",
  "theatre",
  "exposition",
  "concert",
  "enfant",
  "visite",
  "guide",
  "festival",
  "music",
  "workshops",
  "literature",
  "performance",
  "webinar",
];

function CategorySelect(props) {
  return (
    <FormControl>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        label="Category"
        defaultValue={props.category}
        onChange={e=>props.setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;
