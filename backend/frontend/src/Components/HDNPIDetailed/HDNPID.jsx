import React, { useState, useEffect } from 'react';
import logo_icon from '../Assets/Logo.png';
import './HDNPID.css';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; // Import the necessary functions

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