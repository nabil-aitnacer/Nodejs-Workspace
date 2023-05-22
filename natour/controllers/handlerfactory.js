const catchAndSync = require("../Utils/utils");
const AppError = require("../Utils/AppError");
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

  module.exports.deleteOne= Model =>catchAndSync( async (req,res,next)=>{
    const doc = await  Model.findByIdAndDelete(req.params.id);
    if(!doc){
      return next(new AppError("No document Found with that id ",404))
    }
    
    res.status(200).json({
        message: 'success',
        data:null
      });
  })