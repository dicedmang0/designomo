import React,{ useState } from "react";
import USD from '../Assets/usd.png';
import IDR from '../Assets/indonesia.png';

function CurrencyButton({ currency, setCurrency }) {
    const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setCurrency(value);
    setIsOpen(false);
  };
  return (
    <div className="currency-dropdown">
      <button onClick={handleToggle} className="currency-button">
        <img src={currency === "IDR" ? IDR : USD} alt={currency} />
      </button>
      {isOpen && (
        <div className="currency-options">
          <div onClick={() => handleOptionClick("IDR")} className="currency-option">
            <img src={IDR} alt="IDR" /> IDR
          </div>
          <div onClick={() => handleOptionClick("USD")} className="currency-option">
            <img src={USD} alt="USD" /> USD
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyButton