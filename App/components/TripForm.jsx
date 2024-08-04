"use client";
import React, { useState } from 'react';

const TripForm = ({ addTrip }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    transporter: '',
    tripStartTime: '',
    etaDays: 0,
    source: '',
    dest: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrip(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4 flex flex-col items-center">
      <div className='grid grid-cols-2 gap-4'>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input type="text" name="tripId" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Transporter</label>
          <input type="text" name="transporter" value={formData.transporter} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Trip Start Time</label>
          <input type="datetime-local" name="tripStartTime" value={formData.tripStartTime} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ETA (Days)</label>
          <input type="number" name="etaDays" value={formData.etaDays} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Source</label>
          <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input type="text" name="dest" value={formData.dest} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-[130px]">Add Trip</button>
    </form>
  );
};

export default TripForm;
