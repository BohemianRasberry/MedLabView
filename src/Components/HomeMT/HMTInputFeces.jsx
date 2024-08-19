import React, { useState, useRef, useEffect } from 'react';

import logo_icon from '../Assets/Logo.png';
import underline from '../Assets/Underline.png';
import './HMTInput.css';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const HMTFeces = () => {
    const navigate = useNavigate();
    const db = getFirestore();
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);

    const savePatientData = async () => {
        try {
          // Assuming you want to use the patientId as the document ID
          const patientId = formData.patientId;
          if (!patientId) {
            throw new Error('Patient ID is required.');
          }
      
          // Remove false values for tests that are not checked
          const testsToSave = Object.keys(initialTestState).reduce((acc, testName) => {
            if (formData[testName]) {
              acc[testName] = {};
              testParameters[testName].forEach(param => {
                acc[testName][param] = formData[`${testName}_${param}`];
              });
            }
            return acc;
          }, {});
      
          // Combine patient data and tests data
          const dataToSave = {
            ...formData,
            tests: testsToSave,
          };
      
          // Save to Firestore
          await db.collection('patient').doc(patientId).set(dataToSave);
          console.log('Patient data saved successfully!');
        } catch (error) {
          console.error('Error saving patient data:', error);
        }
      };

    const testParameters = {
        Fecalysis: ["color_apperance","consistency","mucus","blood","pus_cells","rbc","ova","cyst","bacteria","Other"],
        "Fecal Occult Blood Test": ["fobt"]

        // Add other tests and their parameters here
        // bloodtyping: ["param1", "param2", ...],
        // esr: ["param1", "param2", ...],
        // ...
    };

    const clearFormData = () => {
        setFormData({
          firstName: '',
          middleName: '',
          surname: '',
          sex: 'male',
          patientId: '',
          birthdate: '',
          age: '',
          dateRequested: '',
          dateReceived: '',
          specimenNumber: '',
          ...initialTestState,
        });
    };

    const initialTestState = Object.keys(testParameters).reduce((acc, test) => {
        acc[test] = false; // For checkbox state
        /*testParameters[test].forEach(param => {
            acc[`${test}_${param}`] = ''; // For parameter input values
        });*/
        return acc;
    }, {});

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        surname: '',
        sex: 'male',
        patientId: '',
        birthdate: '',
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

    const handleSwitchSummary = (e) => {
        navigate("/summary");
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            if (patientId) {
                const patientDocRef = doc(db, 'patient', `patient_${patientId}_id`);
                const docSnap = await getDoc(patientDocRef);

                if (docSnap.exists()) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        ...docSnap.data(),
                        patientId: `${patientId}` 
                    }));
                } else {
                    console.log('No such patient!');
                }
            }
        };
        fetchPatientData();
    }, [db, patientId]);

    const renderTestInput = (testName) => (
        <div className="test-section" key={testName}>
          <label className="test-label">
            <input
                type="checkbox"
                name={testName}
                checked={formData[testName]}
                onChange={handleCheckboxChange}
            />
            <div className="testname">{testName}</div>
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

    return (
        <div className="hmti-container">
            <div className="hmti-title">
                <img src={logo_icon} alt="Logo" />
                <div>Input Test Results</div>
            </div>

            <div className="hmti-row">
            <div className="hmti-tests">
                    <div className="hmti-tests-title">Fecal Laboratory Tests</div>
                    <img src={underline} alt="underline" />
                    <div className="hmti-for-scrollbar">
                        <div className="hmti-tests-row">
                            {Object.keys(initialTestState || {}).map(testName => renderTestInput(testName))}
                        </div>
                    </div>
                </div>   
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
                            <div className="hmti-checklist-left">
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
                            </div>

                            <div className="hmti-checklist-right">
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

                                <div className="hmti-checklist-row-buttons">
                                    <div className="hmti-c-r-buttons-1">
                                        <button className="hmti-c-r-next-clear" onClick={clearFormData}>Clear</button>
                                    </div>
                                    <div className="hmti-c-r-buttons-2">
                                        <button className="hmti-c-r-next" onClick={handleSwitchSummary}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Blood Laboratory Tests Section */}
                </div> 
            </div>
        </div>
    );
};

export default HMTFeces;