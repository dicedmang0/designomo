import { useLocation, useNavigate } from 'react-router-dom';
import BBTN from '../Assets/Back.png'
function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const isProductRoute = location.pathname.startsWith('/products/');

  return (
    <div style={{position: 'absolute',top:'170px',left:'20px'}}>
      {isProductRoute && (
        <button style={{fontFamily:'system-ui', backgroundColor:'transparent',border:'0px', fontWeight:'bold', fontSize:'16px', marginTop:'60px', letterSpacing: '-0.845px', cursor:'pointer',
    }} onClick={goBack}>
           &lt; BACK
        </button>
      )}
    </div>
  );
}

export default BackButton;
