import React from 'react';
import ProductListItem from './product-list-item';
import { connect } from 'react-redux';

const ProductListing = (props) => (
  <div className='product-listing'>
    {
      props.products.map(product =>
      <ProductListItem
        key={product.id}
        product={product}
        addToCart={props.addToCart}
        removeFromCart={props.removeFromCart}
        cartItem={props.cart.filter(cartItem => cartItem.id === product.id)[0]}
      />)
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: item => {
      dispatch({type: 'ADD', payload: item});
    },
    removeFromCart: item => {
      dispatch({type: 'REMOVE', payload: item});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
