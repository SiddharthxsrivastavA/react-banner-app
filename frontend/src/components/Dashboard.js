import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    description: '',
    timer: 0,
    link: '',
    isVisible: false,
  });

  useEffect(() => {
    axios.get('/api/banner').then((response) => {
      setFormData(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/banner', formData).then((response) => {
      alert(response.data.message);
    });
  };

  return (
    <div className="dashboard">
      <h2>Banner Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Timer (seconds):
          <input type="number" name="timer" value={formData.timer} onChange={handleChange} />
        </label>
        <label>
          Link:
          <input type="text" name="link" value={formData.link} onChange={handleChange} />
        </label>
        <label>
          Visible:
          <input type="checkbox" name="isVisible" checked={formData.isVisible} onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })} />
        </label>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
};

export default Dashboard;
