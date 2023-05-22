import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import React, { memo } from "react";
import toast from "react-hot-toast";

import "./Favourite.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { server } from "../../server";
import Loader from "../../components/Layout/Loader/Loader";

const Favourite = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // By memoizing the ProductCard component, it will only re-render if its props change, preventing unnecessary re-renders when other parts of the component tree update.
  const MemoizedProductCard = React.memo(ProductCard);

  // remove from favourite handler
  const removeFromFavouriteHandler = async (productId) => {
    console.log("productId: ", productId);
    try {
      const { data } = await axios.put(`${server}/favourite/remove/${productId}`, {}, { withCredentials: true });

      setFavourites(data.favourites);

      notifySuccess("Removed from Favourite");
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  useEffect(() => {
    // need to make sure cannot access other users's favourites
    // fetch favourites from backend

    const fetchFavourites = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${server}/favourite/${user.user._id}`, { withCredentials: true });
        setFavourites(data.favourites[0]);

        setLoading(false);
      } catch (error) {
        console.log("Something went wrong");
        notifyError(error.response.data.message);
      }
    };

    fetchFavourites();
  }, [user]);

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
                My Wishlist ({favourites[0]?.favouriteItems.length} items)
              </li>
            </ol>
          </nav>

          <div>Move All to Bag</div>
        </div>

        <div className="row">
          {favourites.favouriteItems?.map((item, index) => (
            <div className="col-md-3 mb-5" key={index}>
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

                <div className="d-grid gap-2">
                  <div className="btn btn-outline-dark btn-lg rounded-1">Add to Cart</div>
                </div>

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
