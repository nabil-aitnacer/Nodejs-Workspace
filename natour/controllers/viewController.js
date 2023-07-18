const Tour = require('../models/tourModel');
const catchAndSync = require('../Utils/catchAsync');

module.exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    tour: 'Hike the forest'
  });
};
module.exports.getOverview = catchAndSync(async (req, res) => {
  const tours = await Tour.find({});

  res.status(200).render('overview', {
    title: 'Hike the forest',
    tours
  });
});
