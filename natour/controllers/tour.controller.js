const Tour = require('../models/db/tour.model');
const APIFeatures = require('../Utils/APIFeatures');
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

module.exports.getAllTour = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    returnJsonError(404, error.message, res);
  }
};

module.exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.find({ _id: req.params.id });
    res.status(200).json({
      message: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    returnJsonError(404, error.message, res);
  }
};
module.exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);
    if (!tour) {
      returnJsonError(404, 'Tour not Found', res);
    }
    await tour.remove();
    res.status(204).json({
      message: 'success',
      tour_deleted: tour,
    });
  } catch (error) {
    returnJsonError(404, error, res);
  }
};
module.exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: 'success',
      tour: tour,
    });
  } catch (error) {
    returnJsonError(404, error, res);
  }
};

module.exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fails',
      data: {
        tours: error.message,
      },
    });
  }
};

module.exports.checkId = (req, res, next, val) => {
  console.log('id : ', val);
  if (!val || val > 12) {
    return res.status(404).json({
      status: 'failed',
      message: 'please provie an ID',
    });
  }

  next();
};
module.exports.checkBody = function (req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'please provid valid Tour Data',
    });
  }
  console.log('Body : ', req.body);
  next();
};

function returnJsonError(statusCode, message, res) {
  return res.status(statusCode).json({
    status: 'failed',
    message: message,
  });
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
  console.log('check id : ', req.params.id);

  if (!id) {
    next();
  }
};
module.exports.getToursStats = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'fails',
      data: {
        tours: error.message,
      },
    });
  }
};

module.exports.getToursByMonths = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'fails',

      data: {
        tours: error.message,
      },
    });
  }
};
