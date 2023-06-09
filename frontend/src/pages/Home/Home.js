import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";

import "./Home.css";
import bannerImage1 from "../../assets/images/marketing/pexels-terje-sollie-298864.jpg";
import bannerImage3 from "../../assets/images/marketing/pexels-godisable-jacob-982010.jpeg";
import bannerVideo2 from "../../assets/videos/Sportswear-FW23-ZNE-global-Launch-HP-Masthead-t_gwoved.mp4";
import arrowLeft from "../../assets/images/left-chevron.png";
import arrowRight from "../../assets/images/chevron.png";

import ProductCard from "../../components/ProductCard/ProductCard";
import { server } from "../../server";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${server}/product/all-products`);
      setProductList(data.products);
    };

    fetchProducts();

    console.log(fetchProducts);
  }, []);

  return (
    <div className="home-wrapper">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="banner-arrow">
          <div className="btn-group">
            <button
              className="btn btn-light bg-white active"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span>
                <img src={arrowLeft} alt="" style={{ width: "30px" }} className="arrow-icon" />
              </span>
            </button>

            <button
              className="btn btn-light bg-white active"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span>
                <img src={arrowRight} alt="" style={{ width: "30px" }} className="arrow-icon" />
              </span>
            </button>
          </div>
        </div>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="banner-container">
              {/* <img src={bannerImage1} alt="banner" className="img-banner" /> */}
              <video src={bannerVideo2} autoPlay muted loop className="video-banner"></video>

              {/* <img src={bannerImage1} alt="banner" className="img-banner" /> */}

              <div className="banner-content">
                <div className="container">
                  <div className="title">
                    Slay Your Style. <br />
                    Own Your Confidence.
                  </div>
                  <div className="subtitle">
                    Are you ready to take your style game to the next level? Our fashion e-commerce site is the perfect
                    place to find the latest fashion trends, unique styles, and eye-catching accessories.
                  </div>
                  <div className="buttons">
                    <Link className="btn btn-light btn-lg rounded-2" to="/products">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="banner-arrow">
                <div className="btn-group">
                  <button
                    className="btn btn-light active"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span className="">
                      <img src={arrowLeft} alt="" style={{ width: "30px" }} />
                    </span>
                  </button>

                  <button
                    className="btn btn-light"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span className="">
                      <img src={arrowRight} alt="" style={{ width: "30px" }} />
                    </span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="carousel-item">
            <div className="banner-container">
              <img src={bannerImage1} alt="banner" className="img-banner" />
              <div className="banner-content">
                <div className="container">
                  <div className="title">
                    Elevate Your Look. <br />
                    Boost Your Confidence.
                  </div>
                  <div className="subtitle">
                    Looking to upgrade your wardrobe? Our fashion e-commerce store is the ideal destination for
                    discovering the hottest trends, distinctive styles, and striking accessories.
                  </div>
                  <div className="buttons">
                    <Link className="btn btn-light btn-lg rounded-2" to="/products">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="banner-container">
              <img src={bannerImage3} alt="banner" className="img-banner" />
              <div className="banner-content">
                <div className="container">
                  <div className="title">
                    Embrace Your Style Evolution. <br />
                    Command Your Confidence.
                  </div>
                  <div className="subtitle">
                    Are you ready to take your style game to the next level? Our fashion e-commerce site is the perfect
                    place to find the latest fashion trends, unique styles, and eye-catching accessories.
                  </div>
                  <div className="buttons">
                    <Link className="btn btn-light btn-lg rounded-2" to="/products">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-products">
        <div className="container">
          <div>
            {/* <div className="d-flex flex-row justify-content-between">
              <div className="featured-products-title">Best Sellers</div>
              <Link className="featured-products-title text-decoration-none text-dark" to="/products">
                Discover more <i className="fas fa-arrow-right fa-lg ps-1"></i>
              </Link>
            </div> */}

            <div className="row">
              <div className="col-md-4">
                <div className="featured-products-title">Best Seller Product</div>

                <div className="featured-products-sub-title">
                  Our Best Seller Product is meticulously crafted to provide an exceptional user experience. It boasts a
                  sleek and modern design that effortlessly combines style and functionality.
                </div>
                <div className="btn-learn-more-wrapper">
                  <button className="btn btn-outline-dark btn-learn-more rounded-5 mt-3 text-uppercase">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="col-md-8">
                <div className="row">
                  {/* https://react-glider.vercel.app/ */}
                  <Glider
                    className="glider-container"
                    draggable
                    hasDots
                    responsive={[
                      {
                        breakpoint: 775,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: "auto",
                          itemWidth: 150,
                          duration: 0.25,
                        },
                      },
                    ]}
                  >
                    {productList && productList.length > 0
                      ? productList?.map((item, index) => (
                          <div className="col-md-3 mx-3 mb-3" key={index}>
                            <ProductCard
                              productId={item._id}
                              productStore={item.shop.name}
                              productTitle={item.title}
                              productPrice={item.price}
                              productDiscountPrice={item.discountPrice}
                              productSold={item.unitSold}
                              productCategory={item.category}
                              productImageUrl={item.imageUrl[0].url}
                            />
                          </div>
                        ))
                      : null}
                  </Glider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="the-essentials">
        <div className="container">
          <div className="d-flex flex-row justify-content-between">
            <div className="the-essentials-title">The Essentials</div>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="img-wrapper">
                <img
                  src="https://images.pexels.com/photos/1698359/pexels-photo-1698359.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt=""
                  className="img-fluid"
                />
                <div className="content">
                  <div className="subtitle">Nike Tiger Woods '13</div>
                  <div className="title">Summer Special</div>
                  <button className="btn btn-light rounded-5 mt-3">Get It First</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="img-wrapper">
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
                  // src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_700,c_limit/2e0a5721-ef33-4d38-a8a8-132f72df955a/nike-just-do-it.png"
                  alt=""
                  className="img-fluid"
                />
                <div className="content">
                  <div className="subtitle">Nike App Track</div>
                  <div className="title">App Early Access</div>
                  <button className="btn btn-light rounded-5 mt-3">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stories">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-12 stories-container">
              <div className="title">Express Yourself &nbsp;with Fashion</div>
              <div className="description mt-3">
                <p>
                  Fashion is not just about following trends or looking good. It's about expressing who you are and what
                  you believe in. Every person has a unique style that reflects their personality, their culture, their
                  experiences, and their aspirations. At our store, we believe that fashion should empower you to be
                  yourself, to stand out, and to make a statement.
                </p>
                <p>
                  That's why we offer a wide range of high-quality clothing, accessories, and footwear that cater to
                  diverse tastes and needs. Whether you are looking for a casual outfit for the weekend, a formal dress
                  for a special occasion, or a bold statement piece that reflects your creativity, we have got you
                  covered.
                </p>
                <p>
                  Our collection features a mix of classic and contemporary styles, vibrant colors and prints, and
                  sustainable and ethical materials. We work with independent designers and brands that share our vision
                  of making fashion inclusive, innovative, and impactful.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xs-12 stories-container">
              <div className="title">Shop with confidence</div>
              <div className="description mt-3">
                <p>
                  We believe that fashion is not just a personal choice, but also a social responsibility. That's why we
                  are committed to reducing our carbon footprint, promoting fair labor practices, and supporting social
                  causes that matter to our community.
                </p>
                <p>
                  We believe that fashion can be a force for positive change, and we invite you to join us on this
                  journey. So, what's your fashion story? What makes you feel confident, comfortable, and authentic? We
                  want to hear from you, and we want to help you express yourself through fashion. Come visit us, browse
                  our collection, and let us inspire you to discover your unique style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="membership">
        <div className="title">BECOME A MEMBER & GET 15% OFF</div>
        <Link className="btn btn-light btn-lg ms-3 btn-register rounded-1" to="/register">
          Sign Up For Free <i className="fas fa-arrow-right fa-lg ms-2"></i>
        </Link>
      </section>
    </div>
  );
};

export default Home;
