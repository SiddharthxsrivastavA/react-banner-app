// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [banner, setBanner] = useState({
    description: 'Default Banner',
    timer: 60,
    link: 'https://example.com',
    isVisible: true,
  });

  const [timeLeft, setTimeLeft] = useState(banner.timer);

  useEffect(() => {
    if (banner.isVisible && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, banner.isVisible]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBanner({
      ...banner,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const updateBanner = async () => {
    try {
      await axios.post('http://localhost:3001/api/banner', banner);
      setTimeLeft(banner.timer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {banner.isVisible && timeLeft > 0 && (
        <div className="banner">
          <p>{banner.description}</p>
          <p>Time left: {timeLeft} seconds</p>
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </div>
      )}

      <div className="dashboard">
        <h2>Banner Settings</h2>
        <input
          type="text"
          name="description"
          value={banner.description}
          onChange={handleInputChange}
          placeholder="Banner Description"
        />
        <input
          type="number"
          name="timer"
          value={banner.timer}
          onChange={handleInputChange}
          placeholder="Timer (seconds)"
        />
        <input
          type="text"
          name="link"
          value={banner.link}
          onChange={handleInputChange}
          placeholder="Link"
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="isVisible"
              checked={banner.isVisible}
              onChange={handleInputChange}
            />
            Visible
          </label>
        </div>
        <button onClick={updateBanner}>Update Banner</button>
      </div>
    </div>
  );
}

export default App;
