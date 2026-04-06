import React, { useContext } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import './Promo.css';
import promoImg from '../../assets/promo.png';

const Promo = () => {
  const { promo } = useContext(AppDataContext);
  
  return (
    <section className="promo">
      <div className="container">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-sup">{promo.sup}</span>
            <h2 className="promo-title">
              {promo.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <p className="promo-desc">
              {promo.desc}
            </p>
            <a href={promo.link} className="btn-primary" target="_blank" rel="noopener noreferrer">Ambil Promo Sekarang</a>
          </div>
          <div className="promo-image-box">
            <img src={promoImg} alt="Special Promo" className="promo-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
