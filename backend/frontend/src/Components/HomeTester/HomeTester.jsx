import React, { useState, useRef, useEffect } from 'react';
import './HomeTester.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const HomeTester = () => {
    console.log("Hello world")
  const [patients, setPatients] = useState([]);
  const patientsCollectionRef = collection(db, "patients")

  useEffect(() => {
    const getPatients = async () => {
        const data = await getDocs(patientsCollectionRef);
        console.log(data);
        setPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    
    getPatients()
  }, [])

  return (
    <div className='App'>
        {patients.map((user) => {
            return <div>
                {" "}
                <h1> Patient ID: {user.patientid}</h1>
                <h1> Patient Last Name: {user.patientlastname}</h1>
            </div>;
        })}
        </div>
  );
};

export default HomeTester;