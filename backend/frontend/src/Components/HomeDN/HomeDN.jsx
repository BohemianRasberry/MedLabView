import React, { useState, useRef, useEffect } from 'react';
import './HomeDN.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';
import { useNavigate } from 'react-router-dom';

const initialPatientData = [
    { id: '12345', lastName: 'Doe', firstName: 'John', dob: '1980-01-01' },
    { id: '67890', lastName: 'Smith', firstName: 'Jane', dob: '1990-02-02' },
    { id: '13579', lastName: 'David', firstName: 'Agudo', dob: '2000-03-03' },
    { id: '24680', lastName: 'Brown', firstName: 'Chris', dob: '1985-04-04' },
    { id: '11223', lastName: 'Johnson', firstName: 'Patricia', dob: '1992-05-05' },
    { id: '33445', lastName: 'Lee', firstName: 'Bruce', dob: '1991-06-06' },
    { id: '55667', lastName: 'Garcia', firstName: 'Maria', dob: '1987-07-07' },
    { id: '77889', lastName: 'Miller', firstName: 'Thomas', dob: '1983-08-08' },
    { id: '99000', lastName: 'Wilson', firstName: 'Nancy', dob: '1995-09-09' },
    { id: '10101', lastName: 'Martinez', firstName: 'Jose', dob: '1999-10-10' },
    { id: '12121', lastName: 'Anderson', firstName: 'Lisa', dob: '2001-11-11' },
    { id: '14141', lastName: 'Taylor', firstName: 'Elizabeth', dob: '1996-12-12' },
    { id: '16161', lastName: 'Thomas', firstName: 'William', dob: '1994-01-13' },
    { id: '18181', lastName: 'Hernandez', firstName: 'Gabriel', dob: '1998-02-14' },
];

const HomeDN = () => {
    const [searchInput, setSearchInput] = useState('');
    const [patients, setPatients] = useState(initialPatientData);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
    const tableContainerRef = useRef(null);

    const handleSearch = () => {
        if (searchInput) {
            setPatients(initialPatientData.filter(patient => patient.id === searchInput));
        } else {
            setPatients(initialPatientData);
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

    const navigate = useNavigate();

    const redirectToPatientView = () => {
        navigate('/patient');
    };
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
                        {patients.map((patient, index) => (
                            <div key={index} className="dn-patients-row">
                                <button className="dn-p-r-cell" onClick={redirectToPatientView}>{patient.id}</button>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{patient.lastName}</div>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{patient.firstName}</div>
                                <div className="dn-p-h-separator">|</div>
                                <div className="dn-p-r-cell">{patient.dob}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDN;
