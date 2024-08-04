"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const UpdateStatusForm = ({ updateTrips }) => {
  const [formData, setFormData] = useState({
    transporter: '',
    tripStartTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrips(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4 flex flex-col items-center">
      <div className='grid grid-cols-2 gap-4'>
            <Box sx={{ minWidth: '240px', marginBottom: '16px' }}>
                <label className="block text-gray-700">Select Transporter</label>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.transporter}
                        name='transporter'
                        label="Select Transporter"
                        onChange={handleChange}
                    >
                    <MenuItem value={'Bluedart'}>Blue Dart</MenuItem>
                    <MenuItem value={'DTDC'}>DTDC</MenuItem>
                    <MenuItem value={'FedEx'}>FedEx</MenuItem>
                    <MenuItem value={'Gati'}>Gati</MenuItem>
                    <MenuItem value={'DHL'}>DHL</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <div className="mb-4">
                <label className="block text-gray-700">Trip Start Time</label>
                <input type="datetime-local" name="tripStartTime" value={formData.tripStartTime} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-[130px]">Update Status</button>
    </form>
  );
};

export default UpdateStatusForm;
