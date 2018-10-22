import React from 'react';
import ProductListItem from './product-list-item';

const ProductListing = (props) => (
  <div className='product-listing'>
    {
      props.products.map(product =>
      <ProductListItem key={product.id} product={product} />)
    }
  </div>
);

export default ProductListing;
