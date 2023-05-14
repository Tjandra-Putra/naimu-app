import "./Footer.css";
import visaCardImage from "../../../assets/images/visa.png";
import paypalCardImage from "../../../assets/images/paypal.png";
import googleCardImage from "../../../assets/images/google-pay.png";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="brand">NAIMU.</div>
            <div className="description">Shop anytime, anywhere - ecommerce delivers convenience to your doorstep.</div>
          </div>
          <div className="col-md-2">
            <div className="heading">Shop</div>
            <ul>
              <li>All Collections</li>
              <li>Winter Edition</li>
              <li>Discount</li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="heading">Company</div>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Affiliate</li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="heading">Support</div>
            <ul>
              <li>FAQs</li>
              <li>Cookie Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="heading">Payment Methods</div>
            <div className="payment-cards">
              <div className="card-wrapper">
                <img src={visaCardImage} alt="" className="payment-card-img" />
              </div>
              <div className="card-wrapper">
                <img src={googleCardImage} alt="" className="payment-card-img" />
              </div>
              <div className="card-wrapper">
                <img src={paypalCardImage} alt="" className="payment-card-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
