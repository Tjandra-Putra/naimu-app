import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import React, { memo } from "react";
import toast from "react-hot-toast";

import "./Favourite.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { server } from "../../server";
import Loader from "../../components/Layout/Loader/Loader";
import { getFavourite, removeFromFavourite } from "../../redux/actions/favourite";
import tagImage from "../../assets/images/tag.png";

const Favourite = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { favourites, loading, errorFavourite, successFavourite } = useSelector((state) => state.favouriteReducer);

  const [favouritesList, setFavouritesList] = useState([]);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });

  // By memoizing the ProductCard component, it will only re-render if its props change, preventing unnecessary re-renders when other parts of the component tree update.
  const MemoizedProductCard = React.memo(ProductCard);

  useEffect(() => {
    if (errorFavourite) {
      notifySuccess(errorFavourite);
      dispatch({ type: "ClearErrors" });
    }
    if (successFavourite) {
      notifySuccess(successFavourite);
      dispatch({ type: "ClearSuccess" });
    }
  }, [errorFavourite, successFavourite]);

  // remove from favourite handler
  const removeFromFavouriteHandler = async (productId) => {
    dispatch(removeFromFavourite(productId));
  };

  useEffect(() => {
    // note: getting favourites by user id
    dispatch(getFavourite(user));
  }, []);

  useEffect(() => {
    setFavouritesList(favourites);
  }, [favourites]);

  return loading ? (
    <Loader />
  ) : (
    <div className="favourite-wrapper">
      <div className="container">
        <div className="d-flex flex-row justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <Link to="/products" className="breadcrumb-item">
                Browse Products
              </Link>
              <li className="breadcrumb-item" aria-current="page">
                My Wishlist ({favouritesList?.favouriteItems?.length} items)
              </li>
            </ol>
          </nav>

          <div></div>
        </div>

        <div className="row">
          {favouritesList?.favouriteItems?.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card-wrapper">
                <MemoizedProductCard
                  productId={item.productId}
                  productStore={item.shop.name}
                  productTitle={item.title}
                  productPrice={item.price}
                  productDiscountPrice={item.discountPrice}
                  productSold={item.unitSold}
                  productCategory={item.category}
                  productImageUrl={item.imageUrl}
                  productRating={item.rating}
                />

                <div className="remove-from-favourite" onClick={() => removeFromFavouriteHandler(item.productId)}>
                  <i className="fa-regular fa-trash-can"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {favouritesList?.favouriteItems?.length === 0 && (
          <div className="favourite-empty">
            <img src={tagImage} alt={tagImage} className="img-fluid favourite-icon" />
            <div className="text">Your wishlist is empty</div>
            <div className="sub-text">Add something to make me happy :)</div>
            <Link to="/products" className="btn btn-browse">
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
