const mongoose = require("mongoose");
const productList = require("../data/product");

// define the schema
const productSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  imageUrl: [
    {
      url: String,
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      title: {
        type: String,
      },
      comment: {
        type: String,
      },
      recommend: {
        type: Boolean,
        default: false,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  shop: {
    name: String,
    avatar: {
      url: String,
    },
    ratings: {
      type: Number,
      default: 0,
    }, // average ratings of all products belong to the shop
  },
  price: Number,
  discountPrice: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  unitSold: {
    type: Number,
    default: 0,
  },
  quantityInStock: {
    type: Number,
    default: 0,
  },
});

Product = mongoose.model("Product", productSchema);

// check if any products exist
Product.countDocuments().then((count) => {
  if (count > 0) {
    console.log("Products already exist in the database");
    return;
  }
  // insert products to the database
  Product.insertMany(productList)
    .then(() => {
      console.log("Products saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model("Product", productSchema);
