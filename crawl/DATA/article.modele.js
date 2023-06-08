// Import necessary modules and setup Mongoose connection

var mongoose = require("mongoose");

// Define the source schema
const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  icon_url: {
    type: String,
  },
});

// Define the article schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  short_description: [
    {
      type: String,
    },
  ],
  article_url: {
    type: String,
  },
  article_image_src: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  isLive:{
    type:Boolean
  },
  source: {
    type: mongoose.Schema.ObjectId,
    ref: "source",
    required: [true, "An article must have a source"],
  },
});

// Create the source model
const Source = mongoose.model("Source", sourceSchema);

// Create the article model
const Article = mongoose.model("Article", articleSchema);

// Export the source and article models
module.exports = { Source, Article };

