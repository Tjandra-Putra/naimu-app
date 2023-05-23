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

const Favourite = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { favourites, error, success, loading } = useSelector((state) => state.favouriteReducer);

  const [favouritesList, setFavouritesList] = useState([]);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // By memoizing the ProductCard component, it will only re-render if its props change, preventing unnecessary re-renders when other parts of the component tree update.
  const MemoizedProductCard = React.memo(ProductCard);

  // remove from favourite handler
  const removeFromFavouriteHandler = async (productId) => {
    dispatch(removeFromFavourite(productId));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch({ type: "ClearErrors" });
    }
    if (success) {
      notifySuccess(success);
      dispatch({ type: "ClearSuccess" });
    }
  }, [error, success]);

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
      </div>
    </div>
  );
};

export default Favourite;
