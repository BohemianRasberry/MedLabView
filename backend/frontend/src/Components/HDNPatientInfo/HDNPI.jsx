import React, { useState, useEffect } from 'react';
import logo_icon from '../Assets/Logo.png';
import './HDNPI.css';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; // Import the necessary functions
 
const labTestData = [
    {
        dateTimeGiven: '2023-04-01 09:00',
        specimenNumber: 'SN001',
        labTest: 'CBC',
        labTestId: 'LT001',
    },
    {
        dateTimeGiven: '2023-04-02 10:30',
        specimenNumber: 'SN002',
        labTest: 'Metabolic Panel',
        labTestId: 'LT002',
    },
    {
        dateTimeGiven: '2023-04-03 11:15',
        specimenNumber: 'SN003',
        labTest: 'Lipid Panel',
        labTestId: 'LT003',
    },
    {
        dateTimeGiven: '2023-04-04 08:45',
        specimenNumber: 'SN004',
        labTest: 'Liver Panel',
        labTestId: 'LT004',
    },
    {
        dateTimeGiven: '2023-04-05 14:00',
        specimenNumber: 'SN005',
        labTest: 'Thyroid Panel',
        labTestId: 'LT005',
    },
    {
        dateTimeGiven: '2023-04-06 16:00',
        specimenNumber: 'SN006',
        labTest: 'Iron Panel',
        labTestId: 'LT006',
    },
    {
        dateTimeGiven: '2023-04-07 09:30',
        specimenNumber: 'SN007',
        labTest: 'Hemoglobin A1C',
        labTestId: 'LT007',
    },
    {
        dateTimeGiven: '2023-04-08 10:45',
        specimenNumber: 'SN008',
        labTest: 'Vitamin D',
        labTestId: 'LT008',
    },
    {
        dateTimeGiven: '2023-04-09 13:20',
        specimenNumber: 'SN009',
        labTest: 'Electrolytes Panel',
        labTestId: 'LT009',
    },
    {
        dateTimeGiven: '2023-04-10 15:10',
        specimenNumber: 'SN010',
        labTest: 'Complete Blood Count',
        labTestId: 'LT010',
    },
    {
        dateTimeGiven: '2023-04-11 11:00',
        specimenNumber: 'SN011',
        labTest: 'Basic Metabolic Panel',
        labTestId: 'LT011',
    }
];


const HDNPI = () => {
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientDocRef = doc(db, 'patients', patientId);
                const patientDocSnapshot = await getDoc(patientDocRef);
                if (patientDocSnapshot.exists()) {
                    setPatientData({ ...patientDocSnapshot.data(), id: patientDocSnapshot.id });
                } else {
                    console.log(`No patient found with ID: ${patientId}`);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error.message);
            }
        };

        const fetchTransactions = async () => {
            try {
                const transactionsQuery = query(collection(db, 'transaction'), where('patientid', '==', patientId));
                const transactionsSnapshot = await getDocs(transactionsQuery);
                setTransactions(transactionsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching transactions:', error.message);
            }
        };

        fetchPatientData();
        fetchTransactions();
    }, [patientId]);

    return (
        <div className="hdnpi-container">
            
            <div className="hdnpi-title">
                <img src={logo_icon} alt="Logo" />
                <div>Laboratory Test Portal</div> {/* Fixed: Removed className to prevent conflict */}
            </div>

            <div className="hdnpi-info-container">
                {/* Patient Data Rows */}
                {patientData && (
                    <div className="hdnpi-patient-info-header-row">
                        <div className="hdnpi-p-i-h-t-indiv">Family Name: {patientData.patientlastname}</div>
                        <div className="hdnpi-p-i-h-t-indiv">First Name: {patientData.patientfirstname}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Date of Birth: {patientData.dateofbirth}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Age: {patientData.age}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Sex: {patientData.sex}</div>
                        <div className="hdnpi-p-i-h-t-indiv">Patient ID: {patientData.patientid}</div>
                    </div>
                )}
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
                    <div className="hdnpi-p-t-c-table">
                        {/* Display transactions */}
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="hdnpi-patients-row">
                                <div className="hdnpi-p-h-cell">{transaction.datetime}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{transaction.specimenid}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{transaction.testcode}</div>
                                <div className="hdnpi-p-h-separator">|</div>
                                <div className="hdnpi-p-h-cell">{transaction.transactionid}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default HDNPI;