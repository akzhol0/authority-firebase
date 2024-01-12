import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import { Link, useNavigate } from 'react-router-dom';

function Loader() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/login")
    }, 3000)
  }, [])

  return (
    <div className="wrapper-all">
      <div className="wrapper">
        <div className="loader-wrapper">
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
    </div>
    </div>
  );
}

export default Loader;
