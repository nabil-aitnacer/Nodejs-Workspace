const path = require('path');
const fs = require('fs');
const tourFilePath = path.resolve(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);

const tours = JSON.parse(fs.readFileSync(tourFilePath));

module.exports.getAllTour = (req, res) => {
  res.status(200).json({
    message: 'success',
    result: tours.length,
    data: {
      tours: tours
    }
  });
};

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports.getTourById = async (req, res) => {
  const tour = tours.find(el => el.id === req.params.id * 1);
  res.status(200).json({
    message: 'success',
    data: {
      tour: tour
    }
  });
};
module.exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(204).json({
    message: 'success'
  });
};
module.exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    message: 'success',
    data: {
      tour: 'Data Updated'
    }
  });
};

module.exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const tour = Object.assign({ id: newId }, req.body);

  tours.push(tour);
  fs.writeFile(tourFilePath, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tours: tour
      }
    });
  });
};

module.exports.checkId = (req, res, next, val) => {
  console.log('id : ', val);
  if (!val || val > 12) {
    return res.status(404).json({
      status: 'failed',
      message: 'please provie an ID'
    });
  }

  next();
};
module.exports.checkBody = function(req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'please provid valid Tour Data'
    });
  }
  console.log('Body : ', req.body);
  next();
};
