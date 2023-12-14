import logo_icon from '../Assets/Logo.png';
import './HDNPI.css';
 
const HDNPI = () => {
    return (
        <div className="hdnpi-container">
            <div className="hdnpi-title">
                <img src={logo_icon} alt="Logo" />
                <div className="hdnpi-title">Laboratory Test Portal</div>
            </div>

            <div className="hdnpi-info-container">
                <div className="hdnpi-patient-info-header-row">
                    <div className="hdnpi-p-i-h-t-indiv">Family Name: </div>
                    <div className="hdnpi-p-i-h-t-indiv">First Name: </div>
                    <div className="hdnpi-p-i-h-t-indiv">Date of Birth: </div>
                    <div className="hdnpi-p-i-h-t-indiv">Age </div>
                    <div className="hdnpi-p-i-h-t-indiv">Sex: </div>
                    <div className="hdnpi-p-i-h-t-indiv">Patient ID: </div>
                </div>

                <div className="hdnpi-patient-detailed-info-header-row">
                    <div className="hdnpi-patients-header">
                        <div className="hdnpi-p-h">Patient ID Number</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">Family Name</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">First Name</div>
                        <div className="hdnpi-p-h-separator">|</div>
                        <div className="hdnpi-p-h">Date of Birth</div>
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
