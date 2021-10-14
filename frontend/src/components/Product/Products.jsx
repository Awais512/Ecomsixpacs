import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { clearErrors, getProducts } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className='productsHeading'>Products</h2>

          <div className='products'>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
