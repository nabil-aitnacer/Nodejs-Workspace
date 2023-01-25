/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/db/user.model');

const catchAndSync = require('../Utils/utils')

//TODO: user conteroller complet function

module.exports.getAllUsers = catchAndSync ( async (req, res,next) => {
  const users =await User.find({});

  res.status(200).json({
    message: 'success',
    result: users.length,
    data: {
      users: users
    }
  });
});

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (id) {
 
    res.status(200).json({
      message: 'success',
      data: {
        user: user
      }
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'please provie an ID'
    });
  }
};
module.exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  if (id) {
    res.status(204).json({
      message: 'success'
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'please provie an ID'
    });
  }
};
module.exports.updateUserById = (req, res) => {
  const { id } = req.params;
  if (id) {
    res.status(200).json({
      message: 'success',
      data: {
        user: 'Data Updated'
      }
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'please provie an ID'
    });
  }
};
module.exports.addUser = (req, res) => {
  if (req.body) {
    const newId = req.params.id;
    const user = Object.assign({ id: newId }, req.body);


    // eslint-disable-next-line no-empty
  } else {
  }
};

