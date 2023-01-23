const AppError = require('../Utils/AppError');
const Tour = require('../models/db/tour.model');
const APIFeatures = require('../Utils/APIFeatures');
const catchAndSync = require('../Utils/utils')
const fs = require('fs');
const path = require('path');
const tourJson = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);
const tours = JSON.parse(fs.readFileSync(tourJson));
module.exports.setTours = async (req, res) => {
  console.log(req.requestTime);
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllTour = catchAndSync( async (req, res,next) => {

    const feature = new APIFeatures(Tour, req.query);
    console.log(feature.couuntTotal);
    const tours = await feature.filter().sort().fields().pagination().query;
    const countTours = await Tour.count();
    const totalPages = Math.round(countTours / feature.limit);
    if (req.query.page > totalPages) {
      throw new Error('Page not Found');
    }

    res.status(200).json({
      message: 'success',
      result: tours.length,
      number_pages: totalPages,
      data: {
        tours: tours,
      },
    });
 
});

module.exports.getTourById = catchAndSync( async (req, res,next) => {
    const tour = await Tour.find({ _id: req.params.id });
    if(!tour){
      return next(new AppError(`No tour found for this is ${id} `,404))
    }
    res.status(200).json({
      message: 'success',
      data: {
        tour: tour,
      },
    });
  } );
module.exports.deleteTour =catchAndSync( async (req, res,next) => {
const id =req.params.id ;
    const tour = await Tour.findById(id);
      if(!tour){
        return next(new AppError(`No tour found for this is ${id} `,404))
      }
    await tour.remove();
    res.status(204).json({
      message: 'success',
      tour_deleted: tour,
    });

});
module.exports.updateTour = catchAndSync( async (req, res,next) => {
  const id = req.params.id;


    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if(!tour){
      return next(new AppError(`No tour found for this is ${id} `,404))
    }
    res.status(201).json({
      message: 'success',
      tour: tour,
    });

});

module.exports.addTour = catchAndSync( async (req, res,next) => {

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });

});

module.exports.checkId = (req, res, next, val) => {
  console.log('id : ', val);
  if (!val || val > 12) {
   
   return  next(AppError('please provie an ID', 404))
  }

  next();
};
module.exports.checkBody = function (req, res, next) {
  if (!req.body.name || !req.body.price) {
    
    return next(AppError('please provid valid Tour Data', 404))
    ;
  }

  next();
};

function returnError(statusCode, message, status) {
  const err = new Error(message)
  err.statusCode = statusCode;
  err.status=status
  return err;
}
module.exports.aliasCheapMiddle = (req, res, next) => {
  req.query.limit = 13;
  req.query.fields = 'name,ratingsAverage,difficulty,price,summary';
  req.query.sort = 'ratingsAverage,-price';
  console.log(req.query);
  next();
};
module.exports.getTop5CheapTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    from: '/top-5-cheap',
  });
};
module.exports.checkIdGoNext = (req, res, next) => {
  const id = req.params.id;
  

  if (!id) {
    next();
  }
};
module.exports.getToursStats = catchAndSync( async (req, res,next) => {
 
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: -1,
        },
      },
      /*,{
        $match :{
          _id:{$ne:'easy'}
        }
      }*/
    ]);

    res.status(201).json({
      status: 'success',
      data: {
        tours: stats,
      },
    });

});

module.exports.getToursByMonths =  catchAndSync( async (req, res,next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id:0
        },
      },
      {
        $sort: {
          numTours: -1,
       
        },
       
      },{
        $limit:12
      }
    ]);

    res.status(201).json({
      status: 'success',
      result: plan.length,
      data: {
        tours: plan,
      },
    });

});
