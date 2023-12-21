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
    <div style={{position: 'relative'}}>
      {isProductRoute && (
        <button style={{fontFamily:'Arial', width:'65px', right:'10px', top:'30px', backgroundColor:'transparent',border:'0px', fontWeight:'bold', fontSize:'14px', letterSpacing: '-0.845px', cursor:'pointer', position:'absolute'
    }} onClick={goBack}>
           &lt; BACK
        </button>
      )}
    </div>
  );
}

export default BackButton;
