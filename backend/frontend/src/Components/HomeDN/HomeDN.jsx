import React, { useState } from 'react';
import './HomeDN.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';

const initialPatientData = [
    { id: '12345', lastName: 'Doe', firstName: 'John', dob: '1980-01-01' },
    { id: '67890', lastName: 'Smith', firstName: 'Jane', dob: '1990-02-02' },
    { id: '13579', lastName: 'David', firstName: 'Agudo', dob: '2000-03-03' },
    // ... more data
];

const HomeDN = () => {
    const [searchInput, setSearchInput] = useState('');
    const [patients, setPatients] = useState(initialPatientData);

    const handleSearch = () => {
        if (searchInput) {
            setPatients(patients.filter(patient => patient.id === searchInput));
        } else {
            // Reset to initial data
            setPatients(initialPatientData);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

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

            <div className="dn-patients-header">
                <div className="dn-p-h">Patient ID Number</div>
                <div className="dn-p-h-separator">|</div>
                <div className="dn-p-h">Family Name</div>
                <div className="dn-p-h-separator">|</div>
                <div className="dn-p-h">First Name</div>
                <div className="dn-p-h-separator">|</div>
                <div className="dn-p-h">Date of Birth</div>
            </div>

            <div className="dn-patients-table">
                {patients.map((patient, index) => (
                    <div key={index} className="dn-patients-row">
                        <div className="dn-p-r-cell">{patient.id}</div>
                        <div className="dn-p-r-cell">{patient.lastName}</div>
                        <div className="dn-p-r-cell">{patient.firstName}</div>
                        <div className="dn-p-r-cell">{patient.dob}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeDN;
