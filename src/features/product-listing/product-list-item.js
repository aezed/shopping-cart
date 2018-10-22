import React from 'react';

const ProductListItem = (props) => (
  <div>
    <h3>{props.name}</h3>
    <img
      alt=""
      height={100}
      title={props.product.name}
      src={`/products/${props.product.image}`}
    />
    <div>{props.description}</div>
    <div>${props.product.price}</div>
    <div>
      <button>Add to Cart</button>
    </div>
  </div>
);

export default ProductListItem;
