const Tour = require('../models/db/tour.model');
const APIFeatures = require('../Utils/APIFeatures')

module.exports.getAllTour = async (req, res) => {
  try {
    const feature = new APIFeatures(Tour, req.query);
      console.log(feature.couuntTotal)
    const tours = await feature.filter().sort().fields().pagination().query;
    const countTours = await Tour.count();

    res.status(200).json({
      message: 'success',
      result: tours.length,
      number_pages: Math.round(countTours / feature.limit),
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
  req.query.limit = 5;
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
