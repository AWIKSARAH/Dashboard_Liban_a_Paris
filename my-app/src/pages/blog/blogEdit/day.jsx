import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function ScheduleDay({ day, schedule, setSchedule }) {
  const handleFromTimeChange = (e) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        fromTime: e.target.value,
        fromTo: `${e.target.value}-${schedule[day].toTime}`,
      },
    });
  };

  const handleToTimeChange = (e) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        toTime: e.target.value,
        fromTo: `${schedule[day].fromTime}-${e.target.value}`,
      },
    });
  };

  return (
    <Box key={day} sx={{marginBottom:"10px"}}>
      <div style={{marginBottom:"10px"}}>
      {day.charAt(0).toUpperCase() + day.slice(1)}:
        
      </div>
        <Box display="flex">
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
        sx={{width:"100px"}}
          value={schedule[day].status}
          onChange={(e) =>
            setSchedule({
              ...schedule,
              [day]: { ...schedule[day], status: e.target.value },
            })
          }
        >
          <MenuItem value="closed">Closed</MenuItem>
          <MenuItem value="open">Open</MenuItem>
        </Select>
      </FormControl>
        <TextField
          type="time"
          label="From"
          value={schedule[day].fromTo.split("-")[0]}
          onChange={handleFromTimeChange}
          disabled={schedule[day].status === "closed"}
        />
        <TextField
          type="time"
          label="To"
          value={schedule[day].fromTo.split("-")[1]}
          onChange={handleToTimeChange}
          disabled={schedule[day].status === "closed"}
        />
      </Box>
    </Box>
  );
}

export default ScheduleDay;
