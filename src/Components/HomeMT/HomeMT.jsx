import React, { useState, useRef, useEffect } from 'react';
import './HomeMT.css';

import logo_icon from '../Assets/Logo.png';
import go_icon from '../Assets/GoButton.png';
import unfinished_tr_icon from '../Assets/UnfinishedTestResults.png';
import finished_tr_icon from '../Assets/FinishedTestResults.png';

import { useNavigate } from 'react-router-dom';

import { db } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomeMT = () => {
    const [searchInput, setSearchInput] = useState('');
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);
    const [patients, setPatients] = useState([]);
    const patientsCollectionRef = collection(db, "patient")

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            let q;
            if (searchInput) {
                q = query(patientsCollectionRef, where("patientid", "==", searchInput)); // use the correct field name
            } else {
                q = query(patientsCollectionRef);
            }
            const querySnapshot = await getDocs(q);
            setPatients(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        } catch (error) {
            console.error('Error fetching data from Firestore:', error.message);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const checkForScrollbar = () => {
        const el = tableContainerRef.current;
        if (el) {
            const hasScrollbar = el.scrollHeight > el.clientHeight;
            setIsScrollbarVisible(hasScrollbar);
        }
    };

    const handleCreateNewPatientRecord = () => {
        navigate('/input_blood_new')
    };

    const noUnfinishedTestResults = () => {
        // Make.
    }

    const redirectToUnfinishedTestResults = () => {
        navigate('/unfinished')
    }

    const redirectToPatientInputView = (patientId) => {
        navigate(`/input_blood/${patientId}`);
    };

    useEffect(() => {
        // Call handleSearch on component mount to load all patients initially
        handleSearch();
    }, []); 

    useEffect(() => {
        // Check for scrollbar on mount and window resize
        checkForScrollbar();
        window.addEventListener('resize', checkForScrollbar);
        return () => window.removeEventListener('resize', checkForScrollbar);
    }, [patients]);

    return (
        <div className='mt-container'>
            <div className="mt-label">
                <img src={logo_icon} alt="Logo" />
                <div className='mt-ITR'>MedTech Portal</div>
            </div>
            
            <div className="mt-row">
                <div className="mt-column">
                    <div className="mt-new-c-p-r">
                        <button className="mt-new-c-p-r-button" onClick={handleCreateNewPatientRecord}>
                            <div className="mt-new-c-p-r-text">Create New Patient Record</div>
                        </button>
                    </div>

                    <div className="mt-test-results-button">
                        {noUnfinishedTestResults ? (
                            <div className="mt-test-results">
                                <img src={finished_tr_icon} alt="u-t-r"></img>
                                <div className="mt-t-r-finished">All Tests Complete</div>
                            </div>
                        ) : (
                            <button className="mt-test-results" onClick={() => 
                                redirectToUnfinishedTestResults()}>
                                <img src={unfinished_tr_icon} alt="u-t-r"></img>
                                <div className="mt-t-r-unfinished">_ Unfinished Test Results</div>
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="mt-add-t-e-p-r">
                    <div className="mt-add-t-e-p-r-container">
                        <div className="mt-add-t-e-p-r-text">Add New Test to Existing Patient Record</div>

                        <div className="mt-smol">
                            <div className="mt-search"> 
                                <input type="id" placeholder="Enter Patient ID Number" value={searchInput} onChange={handleInputChange} />
                                <div className="mt-search-button" onClick={handleSearch}>
                                    <button><img src={go_icon} alt="search"></img></button>
                                </div>
                            </div>
                            <div className="mt-patients">
                                <div className="mt-patients-header">
                                    <div className="mt-p-h">Patient ID Number</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="mt-p-h">Family Name</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="mt-p-h">First Name</div>
                                    <div className="dn-p-h-separator">|</div>
                                    <div className="mt-p-h">Date of Birth</div>
                                </div>

                                <div className={`mt-patients-table-container ${!isScrollbarVisible ? 'add-padding' : ''}`} ref={tableContainerRef}>
                                    <div className="dn-patients-table">
                                        {patients.map((user) => (
                                            <button key={user.id} className="mt-patients-row" onClick={() => 
                                                redirectToPatientInputView(user.patientid)}>
                                                <div className="dn-p-r-cell">{user.patientid}</div>
                                                <div className="dn-p-h-separator">|</div>
                                                <div className="dn-p-r-cell">{user.patientlastname}</div>
                                                <div className="dn-p-h-separator">|</div>
                                                <div className="dn-p-r-cell">{user.patientfirstname}</div>
                                                <div className="dn-p-h-separator">|</div>
                                                <div className="dn-p-r-cell">{user.dateofbirth}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeMT;
