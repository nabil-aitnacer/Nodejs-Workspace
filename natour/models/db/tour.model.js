const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A tour must have a name "],
      maxlength: [40, "A tour must have less or equal then 40 characters"],
      minlength: [10, "A tour must have more or equal then 10 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration "],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max group size "],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficulty"],
        message: "Difficulty is either: easy ,medium,difficulty",
      },
    },
    ratingsAverage: {
      type: Number,
      required: [true, "A tour must have a difficulty "],
      max: [5, "A Rating must be below 5.0"],
      min: [1, "A Rating must be above 5.0"],
    },
    ratingsQuantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price "],
    },
    discount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary "],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description "],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a imageCover "],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretTour: Boolean,

    startDates: {
      type: [Date],
      required: [true, "A tour must have a startDates "],
    },

    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations:[{
      type:{
        type:String,
        default:'Point',
        enim:['Point']
    },
    coordinates:[Number],
    address:String,
    description:String,
    day:Number 
    }],
    guides:[{
      type:mongoose.Schema.ObjectId,
      ref:'user'
    }]
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
//middleWare after getting document and start saving this middalwware run only before insert or create
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
tourSchema.pre("save", function (next) {
  console.log(this);
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.pre(/^find/,function(next){
  this.populate({
    path:'guides',
    select:'-__v -passwordChangeAt'
  })
  next()
})
//this run before aggregatiion
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: { $ne: true },
    },
  });
  next();
});

const Tour = mongoose.model("tours", tourSchema);
module.exports = Tour;
