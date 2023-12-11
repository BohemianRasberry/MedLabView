import './HomeLC.css';
import logo_icon from '../Assets/Logo.png';
import status1 from '../Assets/Status-ITR.png';
import separator from '../Assets/Separator.png';

const HomeLC = () => {
    return (
        <div className='lc-container'>
            <div className="lc-label">
                <img src={logo_icon} alt="Logo" />
                <div className='ITR'>Input Test Results</div>
            </div>
            
            <div className="lc-row">
                <div className="lc-r-a-p">
                    <div className="r-a-p-title">Results Approval Process</div>
                    <div className="lc-r-a-p-below">
                        <img src={status1} alt="status" />
                        <div className="lc-r-a-p-texts">
                            <div className="r-a-p">Input Test Result</div>
                            <div className="r-a-p">First Review</div>
                            <div className="r-a-p">Second Review</div>
                            <div className="r-a-p">Result Approval</div>
                        </div>
                    </div>       
                </div>
            
                <div className="lc-separator">
                    <img src={separator} alt="separator"/>
                </div>
                
                <div className="lc-column">
                    <div className="lc-new-c-p-r">
                        <button>Create New Patient Record</button>
                    </div>

                    <div className="lc-add-t-e-p-r">
                        <button>Add to Existing Patient Record</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLC;
