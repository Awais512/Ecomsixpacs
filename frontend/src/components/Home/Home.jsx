import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import './Home.css';
import ProductCard from './ProductCard';
import Loader from '../layout/Loader/Loader';
import { getProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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

export default Home;
