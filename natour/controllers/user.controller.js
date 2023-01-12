/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
const path = require('path');
const fs = require('fs');
const userFilePath = path.resolve(
  __dirname,
  '..',
  'dev-data',
  'data',
  'users.json'
);

const users = JSON.parse(fs.readFileSync(userFilePath));

module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'success',
    result: users.length,
    data: {
      users: users
    }
  });
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const user = users.find(el => el._id === req.params.id);
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

    users.push(user);
    fs.writeFile(userFilePath, JSON.stringify(users), _err => {
      res.status(201).json({
        status: 'success',
        data: {
          users: user
        }
      });
    });
    // eslint-disable-next-line no-empty
  } else {
  }
};

