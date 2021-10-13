import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import './Home.css';
import Product from './Product';
import { getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <MetaData title={'Homepage'} />
      <div className='banner'>
        <p>Welcome to ecommerce</p>
        <h1>Find Amazing Products below</h1>
        <a href='#container'>
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className='container' id='container'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
