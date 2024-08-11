import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [bannerData, setBannerData] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios.get('/api/banner').then((response) => {
      setBannerData(response.data);
      setTimeLeft(response.data.timer);
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!bannerData.isVisible || timeLeft <= 0) {
    return null;
  }

  return (
    <div className="banner">
      <p>{bannerData.description}</p>
      <p>Time left: {timeLeft} seconds</p>
      <a href={bannerData.link}>Learn more</a>
    </div>
  );
};

export default Banner;
