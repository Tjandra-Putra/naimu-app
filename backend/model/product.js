const mongoose = require("mongoose");
const productList = require("../data/product");

console.log("productList: ", productList);

// define the schema
const productSchema = new mongoose.Schema({
  _id: String,
  product_category: String,
  product_title: String,
  product_description: String,
  product_image_url: [
    {
      public_id: String,
      url: String,
    },
  ],
  shop: {
    name: String,
    shop_avatar: {
      public_id: String,
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