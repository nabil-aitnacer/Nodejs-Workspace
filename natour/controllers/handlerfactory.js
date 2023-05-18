const catchAndSync = require("../Utils/utils");

module.exports.getOne = Model => catchAndSync( async (req, res) => {
    const id = req.params.id;
    if (id) {
      const user = await Model.findById(id)
   
      res.status(200).json({
        message: 'success',
        data: {
          user: user
        }
      });
    } 
  });