import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productActions';
import { Rating } from '@material-ui/lab';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const id = match.params.id;
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
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
                <h1>{`$${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input
                      readOnly
                      defaultValue={quantity}
                      type='number'
                      value={quantity}
                    />

                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'Out Of Stock' : 'In Stock'}
                  </b>
                </p>
                <p onChange={(e) => setQuantity(e.target.value)}>
                  Quantity:
                  <b>{quantity}</b>
                </p>
              </div>

              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>

              <button className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
