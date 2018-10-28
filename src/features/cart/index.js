import React from 'react';
import { connect } from 'react-redux';

export const cartItemsWithQuantities = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    let filteredItem = acc.filter(accItem => accItem.id === item.id)[0];
    filteredItem !== undefined
      ? filteredItem.quantity++
      : acc.push({...item, quantity: 1});
    return acc;
  }, []);
}
