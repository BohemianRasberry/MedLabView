import './Home.css';
import logo_icon from '../Assets/Logo.png';
import search_icon from '../Assets/SearchButton.png';

const Home = () => {
    return (
        <div className='ltp-container'>
            <div className="ltp-logo">
                <img src={logo_icon} alt="Logo" />
                <div className='Title'>Laboratory Test Portal</div>
            </div>
            <div className="ltp-search">
                <input type="id" placeholder="Enter Patient ID Number"/>
                <div className="ltp-search-button">
                    <span><img src={search_icon} alt="search"></img></span>
                </div>
            </div>
            <div className="ltp-patients-header">
                <div className="ltp-p-h">Patient ID Number</div>
                <div className="ltp-p-h-separator">|</div>
                <div className="ltp-p-h">Family Name</div>
                <div className="ltp-p-h-separator">|</div>
                <div className="ltp-p-h">First Name</div>
                <div className="ltp-p-h-separator">|</div>
                <div className="ltp-p-h">Birthdate</div>
                </div>
        </div>
    );
}

export default Home;
