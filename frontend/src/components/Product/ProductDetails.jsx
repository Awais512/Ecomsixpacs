import React, { useEffect } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productActions';
import Rating from 'react-rating-stars-component';

const ProductDetails = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className='ProductDetails'>
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className='CarouselImage'
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className='detailsBlock-1'>
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className='detailsBlock-2'>
            <Rating {...options} />
            <span className='detailsBlock-2-span'>
              {' '}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className='detailsBlock-3'>
            <h1>{`₹${product.price}`}</h1>
            <div className='detailsBlock-3-1'>
              <div className='detailsBlock-3-1-1'>
                <button>-</button>
                <input readOnly type='number' />
                <button>+</button>
              </div>
              <button disabled={product.Stock < 1 ? true : false}>
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
          </div>

          <div className='detailsBlock-4'>
            Description : <p>{product.description}</p>
          </div>

          <button className='submitReview'>Submit Review</button>
        </div>
      </div>
      <h3 className='reviewsHeading'>Reviews</h3>
      {/* {product.reviews && product.reviews[0]?(
          <div className="reviews">
              {product.reviews && product.reviews.map(review)=> (
                  <ReviewCard />
              )}
          </div>
      ):() } */}
    </>
  );
};

export default ProductDetails;
