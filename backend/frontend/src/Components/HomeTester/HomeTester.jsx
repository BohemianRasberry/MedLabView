import React, { useState, useRef, useEffect } from 'react';
import './HomeTester.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../Firebase';

const HomeTester = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
        
    }

  }, [])
};

export default HomeTester;