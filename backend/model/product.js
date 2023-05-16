const mongoose = require("mongoose");
const productList = require("../data/product");

// define the schema
const productSchema = new mongoose.Schema({
  product_category: String,
  product_title: String,
  product_description: String,
  product_image_url: [
    {
      url: String,
    },
  ],
  product_reviews: [
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
    shop_avatar: {
      url: String,
    },
    ratings: Number,
  },
  product_price: Number,
  product_discount_price: Number,
  product_rating: Number,
  product_unit_sold: Number,
  quantity_in_stock: Number,
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
