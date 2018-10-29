import React from 'react';
import { connect } from 'react-redux';
import Checkout from './checkout';

const sort = items => items.sort((a, b) => a.id < b.id);

const Cart = (props) => {
  const total = props.cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
  const displayTotal = total.toLocaleString("en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {
            sort(props.cart).map((item, key) => {
              const subTotal = (item.price * item.quantity).toLocaleString("en-US",
                {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });

              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString("en-US",
                      {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</td>
                  <td>{subTotal}</td>
                  <td>
                    <button onClick={() => props.addToCart(item)}>+</button>
                  </td>
                  <td>
                    <button onClick={() => props.removeFromCart(item)}>-</button>
                  </td>
                  <td>
                    <button onClick={() => props.removeAllFromCart(item)}>Remove All</button>
                  </td>
                </tr>
              );
            })
          }
          <tr>
            <td>
              <h4>Total: {displayTotal}</h4>
            </td>
          </tr>
        </tbody>
      </table>
      <Checkout amount={total} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: item => {
      dispatch({ type: 'ADD', payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: 'REMOVE', payload: item });
    },
    removeAllFromCart: item => {
      dispatch({ type: 'REMOVE_ALL', payload: item });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
