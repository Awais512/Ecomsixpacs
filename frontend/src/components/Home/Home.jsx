import React from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData';
import './Home.css';
import Product from './Product';

const product = {
  name: 'Blue Shirt',
  img: [
    {
      url: 'https://assets.abfrlcdn.com/img/app/product/4/493432-3694265-large.jpg',
    },
  ],
  price: '$300',
  _id: '1234435',
};
const Home = () => {
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
