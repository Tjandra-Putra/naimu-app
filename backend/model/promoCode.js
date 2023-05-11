const mongoose = require("mongoose");
const promoCodeList = require("../data/promoCode");

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please enter your promo code name"],
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PromoCode = mongoose.model("PromoCode", promoCodeSchema);

// check if any promo codes exist
PromoCode.countDocuments().then((count) => {
  if (count > 0) {
    console.log("Promo codes already exist in the database");
    return;
  }
  // insert promo codes to the database
  PromoCode.insertMany(promoCodeList)
    .then(() => {
      console.log("Promo codes saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model("PromoCode", promoCodeSchema);
