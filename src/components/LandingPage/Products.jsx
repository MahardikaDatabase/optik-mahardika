import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AppDataContext } from '../../context/AppDataContext';
import './Products.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Products = () => {
  const { products } = useContext(AppDataContext);

  const randomProducts = React.useMemo(() => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [products]);

  const formatPrice = (price) => {
    if (!price) return '';
    const numericPrice = price.toString().replace(/[^0-9]/g, '');
    if (!numericPrice) return price;
    return `Rp ${parseInt(numericPrice, 10).toLocaleString('id-ID').replace(/,/g, '.')}`;
  };

  return (
    <section id="produk" className="products">
      <div className="container">
        <div className="products-header">
          <h2 className="section-title">Jelajahi Favorit Pelanggan</h2>
          <p className="section-desc">Koleksi kacamata terbaik pilihan pelanggan setia kami.</p>
        </div>

        <div className="products-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 }
            }}
            className="products-swiper"
          >
            {randomProducts.map((p, idx) => (
              <SwiperSlide key={idx}>
                <div className="product-card">
                  <div className="product-img-box">
                    {p.tag && <span className="product-tag">{p.tag}</span>}
                    <img src={p.img} alt={p.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p className="product-price">{formatPrice(p.price)}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="products-footer">
          <Link to="/catalogue">
            <button className="btn-view-all">Lihat semua produk</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
