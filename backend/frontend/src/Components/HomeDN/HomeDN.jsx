import './HomeDN.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';

const HomeDN = () => {
    return (
        <div className='dn-container'>
            <div className="dn-logo">
                <img src={logo_icon} alt="Logo" />
                <div className='LTP'>Laboratory Test Portal</div>
            </div>
            
            <div className="dn-search">
                <input type="id" placeholder="Enter Patient ID Number"/>
                <div className="dn-search-button">
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
        </div>
    );
}

export default HomeDN;
