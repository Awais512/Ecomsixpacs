import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { clearErrors, getProducts } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';
import Pagination from 'react-js-pagination';

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, productsCount, error, resultPerPage, count } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

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

          <div className='paginationBox'>
            {resultPerPage < productsCount && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
