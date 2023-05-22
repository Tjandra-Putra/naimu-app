const mongoose = require("mongoose");
const favouriteList = require("../data/favourite");

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: Object, // _id, email for marketing purpose
      required: true,
    },
    favouriteItems: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

Favourite = mongoose.model("Favourite", favouriteSchema);

// check if any products exist
Favourite.countDocuments().then((count) => {
  if (count > 0) {
    console.log("Favourite already exist in the database");
    return;
  }
  // insert products to the database
  Favourite.insertMany(favouriteList)
    .then(() => {
      console.log("Favourite saved successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model("Favourite", favouriteSchema);
