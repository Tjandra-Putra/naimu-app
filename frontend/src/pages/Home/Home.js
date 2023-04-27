import "./Home.css";
import bannerImage1 from "../../assets/images/marketing/pexels-terje-sollie-298864.jpg";
import bannerImage2 from "../../assets/images/marketing/pexels-danik-prihodko-15759583.jpeg";
import bannerImage3 from "../../assets/images/marketing/pexels-godisable-jacob-982010.jpeg";

import arrowLeft from "../../assets/images/left-chevron.png";
import arrowRight from "../../assets/images/chevron.png";

import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div className="banner-arrow">
          <div class="btn-group">
            <button
              class="btn btn-light bg-white active"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span class="">
                <img src={arrowLeft} alt="" style={{ width: "30px" }} />
              </span>
            </button>

            <button
              class="btn btn-light bg-white active"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span class="">
                <img src={arrowRight} alt="" style={{ width: "30px" }} />
              </span>
            </button>
          </div>
        </div>
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
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
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div className="banner-container">
              <img src={bannerImage1} alt="banner" className="img-banner" />
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
                    <button className="btn btn-light btn-lg rounded-2">Shop Now</button>
                  </div>
                </div>
              </div>
              {/* <div className="banner-arrow">
                <div class="btn-group">
                  <button
                    class="btn btn-light active"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span class="">
                      <img src={arrowLeft} alt="" style={{ width: "30px" }} />
                    </span>
                  </button>

                  <button
                    class="btn btn-light"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span class="">
                      <img src={arrowRight} alt="" style={{ width: "30px" }} />
                    </span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div class="carousel-item">
            <div className="banner-container">
              <img src={bannerImage2} alt="banner" className="img-banner" />
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
                    <button className="btn btn-light btn-lg rounded-2">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
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
                    <button className="btn btn-light btn-lg rounded-2">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>

        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button> */}
      </div>

      <div className="container">
        <section className="featured-products">
          <div className="d-flex flex-row justify-content-between">
            <div className="featured-products-title">Shop our featured products</div>
            <div className="featured-products-title">
              View all <i class="fas fa-arrow-right fa-lg"></i>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ProductCard
                productStore="Adidas"
                productTitle="Adidas Rekive Woven Track Pants"
                productPrice={139}
                productSold={24}
                productCategory="Pants"
                productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
              />
            </div>
            <div className="col">
              <ProductCard
                productStore="Adidas"
                productTitle="Island Club Adilette Premium Slides"
                productPrice={99}
                productSold={24}
                productCategory="Slides"
                productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/06aaccf76fde4c35ae48afc700fc1548_9366/Island_Club_Adilette_Premium_Slides_Beige_GY2557_HM1.jpg"
              />
            </div>
            <div className="col">
              <ProductCard
                productStore="Adidas"
                productTitle="X-city heat.rdy shorts"
                productPrice={79}
                productSold={24}
                productCategory="Shorts"
                productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cb963f36178c49c884c5af7200c6a9ba_9366/X-City_HEAT.RDY_Shorts_Black_HN0789_21_model.jpg"
              />
            </div>
            <div className="col">
              <ProductCard
                productStore="Adidas"
                productTitle="Adidas Basketball Crew Sweatshirt"
                productPrice={109}
                productSold={24}
                productCategory="Sweatshirts"
                productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1777da19a81f41ac87a3af6d0157688d_faec/adidas_Basketball_Crew_Sweatshirt_Grey_IA3435_HM1.jpg"
              />
            </div>
          </div>
        </section>

        <section className="the-essentials">
          <div className="d-flex flex-row justify-content-between">
            <div className="the-essentials-title">The Essentials</div>
          </div>
          <div className="row">
            <div className="col">
              <div className="img-wrapper">
                <img
                  // src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_700,c_limit/d62ad2b8-9231-4fdb-9f4a-3ff76a34b26b/nike-just-do-it.png"
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
            <div className="col">
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
        </section>
      </div>

      <section className="stories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title">Express Yourself with Fashion</div>
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
            <div className="col">
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
        <button className="btn btn-light btn-lg rounded-2 ms-3">
          Sign Up For Free <i class="fas fa-arrow-right fa-lg ms-2"></i>
        </button>
      </section>
    </div>
  );
};

export default Home;
