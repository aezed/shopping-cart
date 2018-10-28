import React from 'react';

const AddButton = (props) => (
  <button
    onClick={() => props.addToCart(props.product)}
  >
    Add to Cart ({
      (props.cartItem && props.cartItem.quantity) || 0
    })
  </button>
);

export default AddButton;
