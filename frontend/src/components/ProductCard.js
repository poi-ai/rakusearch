import React from 'react';

function ProductCard({ title, price, description }) {
  return (
<div class="card">
  <img src="..." class="card-img-top" alt="..."></img>
  <div class="card-body">
    <h5 class="card-title">{title} {price}</h5>
    <p class="card-text">{description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  );
}

export default ProductCard;
