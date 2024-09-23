import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select, InputLabel, FormControl } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  // height: "80vh",
  bgcolor: "background.paper",
  borderRadius: '20px',
  boxShadow: 24,
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  pt: 2,
  px: 4,
  pb: 3,
  "&::-webkit-scrollbar": {
    display: "none"
  },
  "@media (max-width: 768px)": {
    width: "100%",
    borderRadius: 0,
  },
};

const courses = [
  'Web Development',
  //... other courses
  'Music Production'
];

const slots = [
  { day: 'Monday Wednesday Friday', time: '6:00 AM - 9:00 AM' },
  //... other slots
];

function HolidayModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">EDIT HOLIDAY</h2>
        <form>
          <TextField
            fullWidth
            margin="normal"
            id="holidayName"
            label="Holiday Name"
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            id="date"
            label="Date"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default HolidayModal;
