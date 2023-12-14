import React from 'react';
import logo_icon from '../Assets/Logo.png';
import './HDNPI.css';
 
const patientsData = [
    {
        familyName: 'Doe',
        firstName: 'David',
        dateOfBirth: '1990-01-01',
        age: '32',
        sex: 'M',
        patientId: 'P123456',
    },
];

const HDNPI = () => {
    return (
        <div className="hdnpi-container">
            <div className="hdnpi-title">
                <img src={logo_icon} alt="Logo" />
                <div>Laboratory Test Portal</div> {/* Fixed: Removed className to prevent conflict */}
            </div>

            <div className="hdnpi-info-container">
                {/* Patient Data Rows */}
                {patientsData.map((patient, index) => (
                    <div key={index} className="hdnpi-patient-info-header-row">
                        <div className="hdnpi-p-i-h-t-indiv">Family Name: {patient.familyName}</div>
                        <div className="hdnpi-p-i-h-t-indiv">First Name: {patient.firstName}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Date of Birth: {patient.dateOfBirth}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Age: {patient.age}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Sex: {patient.sex}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Patient ID: {patient.patientId}</div>
                    </div>
                ))}

                <div className="hdnpi-patient-detailed-info-header-row">
                    <div className="hdnpi-patients-header">
                        <div className="hdnpi-p-h">Date & Time Given</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">Specimen Number</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">Laboratory Test</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">Laboratory Test ID</div>
                    </div>

                    <div className="hdnpi-patients-table-container">
                        <div className="hdnpi-patients-table">
                            <div className="hdnpi-patients-row"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HDNPI;
