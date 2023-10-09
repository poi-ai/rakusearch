import React from 'react';

function ProductCard({ title, price, description }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">価格: {price} 円</p>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
