import React, { useState, useRef, useEffect } from 'react';
import './HomeTester.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const HomeTester = () => {
    const [searchInput, setSearchInput] = useState('');
    //const [patients, setPatients] = useState(initialPatientData);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);
    const [patients, setPatients] = useState([]);
    const patientsCollectionRef = collection(db, "patients")

    const handleSearch = () => {
    /*    if (searchInput) {
            setPatients(initialPatientData.filter(patient => patient.id === searchInput));
        } else {
            setPatients(initialPatientData);
        }*/
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

    const navigate = useNavigate();

    const redirectToPatientView = () => {
        navigate('/patient');
    };

    useEffect(() => {
        const getPatients = async () => {
            try{
                const data = await getDocs(patientsCollectionRef);
                console.log(data);
                setPatients(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch (error) {
                console.error('Error fetching data from Firestore:', error.message);
            }
        }
        
        getPatients()
      }, [patientsCollectionRef])
    
      useEffect(() => {
        // Check on mount
        checkForScrollbar();

        // Check on window resize or when the patient list changes
        window.addEventListener('resize', checkForScrollbar);
        return () => window.removeEventListener('resize', checkForScrollbar);
    }, [patients]);

    return (
        <div className='dn-container'>
            <div className="dn-logo">
                <img src={logo_icon} alt="Logo" />
                <div className='LTP'>Laboratory Test Portal</div>
            </div>
            
            <div className="dn-search">
                <input type="id" placeholder="Enter Patient ID Number" value={searchInput} onChange={handleInputChange} />
                <div className="dn-search-button" onClick={handleSearch}>
                    <span><img src={search_icon} alt="search"></img></span>
                </div>
            </div>
            <div className="dn-patients">
                <div className="dn-patients-header">
                    <div className="dn-p-h">Patient ID Number</div>
                    <div className="dn-p-h-separator">|</div>
                    <div className="dn-p-h">Family Name</div>
                    <div className="dn-p-h-separator">|</div>
                    <div className="dn-p-h">First Name</div>
                    <div className="dn-p-h-separator">|</div>
                    <div className="dn-p-h">Date of Birth</div>
                </div>

                <div className={`dn-patients-table-container ${!isScrollbarVisible ? 'add-padding' : ''}`} ref={tableContainerRef}>
                    <div className="dn-patients-table">
                        {patients.map((user) => (
                            <div key={user.id} className="dn-patients-row">
                                <button className="dn-p-r-cell" onClick={redirectToPatientView}>{user.patientid}</button>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{user.patientlastname}</div>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{user.patientfirstname}</div>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{user.dateofbirth}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default HomeTester;