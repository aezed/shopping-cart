import React from 'react';
import ProductListItem from './product-list-item';

const ProductListing = (props) => (
  <div>
    {
      props.products.map(product=>
      <ProductListItem product={product} />)
    }
  </div>
);

export default ProductListing;
