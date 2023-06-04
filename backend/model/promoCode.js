const mongoose = require("mongoose");
const promoCodeList = require("../data/promoCode");

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please enter your promo code name"],
    unique: true,
  },
  discount: {
    type: Number, // 10% off
    required: true,
  },
  selectedProduct: {
    type: [
      {
        productId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// PromoCode = mongoose.model("PromoCode", promoCodeSchema);

// // check if any promo codes exist
// PromoCode.countDocuments().then((count) => {
//   if (count > 0) {
//     console.log("Promo codes already exist in the database");
//     return;
//   }
//   // insert promo codes to the database
//   PromoCode.insertMany(promoCodeList)
//     .then(() => {
//       console.log("Promo codes saved successfully!");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = mongoose.model("PromoCode", promoCodeSchema);
