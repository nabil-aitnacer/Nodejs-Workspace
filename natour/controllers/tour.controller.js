const path = require('path');
const fs = require('fs');
const Tour = require('../models/db/tour.model');
const { json } = require('express');
const { match } = require('assert');

module.exports.getAllTour = async (req, res) => {
  try {
    //Buil Query
    const queryParam = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((element) => delete queryParam[element]);

    //advanced filtering
    let queryStr = JSON.stringify(queryParam);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy =req.query.sort.split(',').join(' ')
      query = query.sort(sortBy);
      console.log(sortBy)
    } else {
     query = query.sort('-createdAt');
    }

    //fields
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ')
      query =query.select(fields)
    } 

 const page =req.query.page || 1;
 const limit = req.query.limit || 20;
 const skip =(page-1)*limit
 if(req.query.page){
  const countTours = await Tour.count()
  if(skip > countTours){
   throw new Error("This page doesnt exits")
  }
  console.log(countTours)
 }
 query = query.skip(skip).limit(limit)
    const tours = await query;
    res.status(200).json({
      message: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
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
