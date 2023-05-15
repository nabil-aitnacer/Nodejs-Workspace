//review // rating // createdAt // ref to tour // ref to user
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAd: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "tours",
      required: [true, "A review must have a tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "A review must have a user"],
    },
    // Configures schema options for virtuals, enabling inclusion of computed properties when converting a document to JSON or JavaScript object.
    // The options toJSON and toObject are set to { virtuals: true }.
    // Virtuals are additional fields not stored in the database but computed on-the-fly based on other properties.
    // Including virtuals in the resulting JSON or object representation enhances the data returned from the MongoDB schema.
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const review = mongoose.model("review", reviewSchema);
module.exports = review;
