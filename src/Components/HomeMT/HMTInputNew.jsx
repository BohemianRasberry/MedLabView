import React, { useState, useRef } from 'react';

import logo_icon from '../Assets/Logo.png';
import underline from '../Assets/Underline.png';
import './HMTInput.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc , setDoc, doc } from 'firebase/firestore';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HMTInput = () => {
    const navigate = useNavigate();

    const firebaseConfig = {
        apiKey: "AIzaSyC0_oxrUWu1NoPuTBpCYOOTNAUXPUd_Y9c",
        authDomain: "medlabview.firebaseapp.com",
        projectId: "medlabview",
        storageBucket: "medlabview.appspot.com",
        messagingSenderId: "652128567946",
        appId: "1:652128567946:web:d613e20cfafbfcee366373",
        measurementId: "G-G5SSRYJVJZ"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      

    const db = getFirestore(app);

    const savePatientData = async () => {
        try {
            // Create a document reference with a specific path
            const patientDocRef = doc(db, 'patient', `patient_${formData.patientId}_id`);
        
            // Set data for the document at this reference
            await setDoc(patientDocRef, formData);
        
            console.log('Patient data saved successfully!');
          } catch (error) {
            console.error('Error saving patient data:', error);
          }
      };

    const testParameters = {
        cbc: ["whitebloodcell", "redbloodcell", "hematocrit", "hemoglobin", "mcv", "mch", "mchc", "plateletcount", "rdw", "neutrophil", "lymphocyte", "eosonophil", "monocyte", "basophil"],
        bloodtyping: ["blood group", "rhfactor"],
        esr: ["esr"],
        fbs: ["fbs"],
        cholesterol: ["cholesterol"],
        triglyceride: ["triglyceride"],
        hdl: ["hdl"],
        ldl: ["ldl"],
        vldl: ["vldl"],
        bun: ["bun"],
        creatine: ["creatine"],
        bua: ["bua"],
        ast: ["ast"],
        alt: ["alt"],
        alp: ["alp"],
        sodium: ["sodium"],
        potassium: ["potassium"],
        calcium: ["calcium"],
        aso: ["aso"],
        dengue_antibody: ["igg", "igm"],
        dengue_antigen: ["ns1"],

        // Add other tests and their parameters here
        // bloodtyping: ["param1", "param2", ...],
        // esr: ["param1", "param2", ...],
        // ...
    };

    const clearFormData = () => {
        setFormData({
        patientfirstname: '',
        patientmiddlename: '',
        patientlastname: '',
        sex: 'Male',
        patientid: '',
        dateofbirth: '',
        age: '',
          dateRequested: '',
          dateReceived: '',
          specimenNumber: '',
          ...initialTestState,
        });
      };

    const initialTestState = Object.keys(testParameters).reduce((acc, test) => {
        acc[test] = false; // For checkbox state
        testParameters[test].forEach(param => {
            acc[`${test}_${param}`] = ''; // For parameter input values
        });
        return acc;
    }, {});

    const [formData, setFormData] = useState({
        patientfirstname: '',
        patientmiddlename: '',
        patientlastname: '',
        sex: 'Male',
        patientid: '',
        dateofbirth: '',
        age: '',
        dateRequested: '',
        dateReceived: '',
        specimenNumber: '',
        ...initialTestState,
    });

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSwitchUrine = () => {
        navigate("/input_urine");
    };

    const renderTestInput = (testName) => (
        <div className="test-section" key={testName}>
          <label className="test-label">
            {testName.toUpperCase()}:
            <input
              type="checkbox"
              name={testName}
              checked={formData[testName]}
              onChange={handleCheckboxChange}
            />
          </label>
          {formData[testName] && (
            <div className="test-parameters">
              {testParameters[testName]?.map(param => (
                <div key={`${testName}_${param}`} className="test-parameter">
                  <label className="parameter-label">
                    {param.replace(/_/g, ' ').toUpperCase()}:
                  </label>
                  <input
                    type="text"
                    name={`${testName}_${param}`}
                    value={formData[`${testName}_${param}`]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );

      const handleNextButtonClick = () => {
        savePatientData();
        navigate("/input_urine");
      };

    return (
        <div className="hmti-container">
            <div className="hmti-title">
                <img src={logo_icon} alt="Logo" />
                <div>Input Test Results</div>
            </div>

            <div className="hmti-row">
                <div className="hmti-column">
                    <div className="hmti-basic-info">
                        {/* Basic Information Section */}
                        <div className="hmti-basic-info-1st-row">
                            {/* First Name */}
                            <div className="hmti-b-i-1-row">
                                First Name
                                <div className="firstname">
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Middle Name */}
                            <div className="hmti-b-i-1-row">
                                Middle Name
                                <div className="middlename">
                                    <input 
                                        type="text" 
                                        name="middleName" 
                                        value={formData.middleName} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Surname */}
                            <div className="hmti-b-i-1-row">
                                Surname
                                <div className="surname">
                                    <input 
                                        type="text" 
                                        name="surname" 
                                        value={formData.surname} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Sex */}
                            <div className="hmti-b-i-1-row">
                                Sex
                                <div className="sex">
                                    <select 
                                        name="sex" 
                                        value={formData.sex} 
                                        onChange={handleInputChange}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="hmti-basic-info-2nd-row">
                            {/* Patient ID */}
                            <div className="hmti-b-i-2-row">
                                Patient ID:
                                <div className="patientid">
                                    <input 
                                        type="text" 
                                        name="patientId" 
                                        value={formData.patientId} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Birthdate */}
                            <div className="hmti-b-i-2-row">
                                Birthdate:
                                <div className="birthdate">
                                    <input 
                                        type="date" 
                                        name="birthdate" 
                                        value={formData.birthdate} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Age */}
                            <div className="hmti-b-i-2-row">
                                Age: 
                                <div className="age">
                                    <input 
                                        type="text" 
                                        name="age" 
                                        value={formData.age} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checklist Section */}
                    <div className="hmti-checklist">
                        <div className="hmti-checklist-title">Checklist Page</div>
                        <img src={underline} alt="underline"/>
                        <div className="hmti-checklist-start">
                            {/* Date & Time Requested */}
                            <div className="hmti-checklist-row">
                                Date & Time Requested:
                                <div className="requested">
                                    <input 
                                        type="datetime-local" 
                                        name="dateRequested" 
                                        value={formData.dateRequested} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Date & Time Received */}
                            <div className="hmti-checklist-row">
                                Date & Time Received:
                                <div className="received">
                                    <input 
                                        type="datetime-local" 
                                        name="dateReceived" 
                                        value={formData.dateReceived} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                            {/* Specimen Number */}
                            <div className="hmti-checklist-row">
                                Specimen Number:
                                <div className="specimen_number">
                                    <input 
                                        type="text" 
                                        name="specimenNumber" 
                                        value={formData.specimenNumber} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>

                            <div className="hmti-checklist-row">
                                <div className="hmti-c-r-buttons">
                                    <button className="hmti-c-r-next" onClick={handleNextButtonClick}>Next</button>
                                </div>
                                <div className="hmti-c-r-buttons">
                                    <button className="hmti-c-r-next-clear" onClick={clearFormData}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blood Laboratory Tests Section */}
                </div>
                <div className="hmti-tests">
                        <div className="hmti-tests-title">Blood Laboratory Tests</div>
                        <img src={underline} alt="underline" />
                        <div className="hmti-tests-row">
                        {Object.keys(initialTestState || {}).map(testName => renderTestInput(testName))}

                        </div>
                    </div>  
            </div>
        </div>
    );
};

export default HMTInput;