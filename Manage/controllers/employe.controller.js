const express = require('express')
const router = express.Router();
const employeModule = require('../modules/employee.module');
const { json } = require('body-parser');
router.post('/add', async (req, res) => {


    await employeModule.create(req.body, (error, user) => {
        if (error) {
            console.log('creation error ', error)

            res.redirect('/')

        } else {

            res.render('index')
        }

    })

})

router.post('/edit',async(req,res)=>{
 
    const update ={name:req.body.name,email:req.body.email,address:req.body.address,phone:req.body.phone}
    const options = { new: true };
    const query = employeModule.findOneAndUpdate({ _id: req.body._id }, update, options);
    const clonedQuery = query.clone();

    clonedQuery.exec((error, employee) => {
      if (error) {
        console.error({     error:'DuplicateKey',
        field:error.keyPattern});
        res.status(400).send(error)

      } else {
        console.log(employee);
        res.json(employee)
      }
})
})

router.get('/', async (req, res) => {
    
    const page =1;
    const skip = (page -1)*10;
    const limit =10;

    try {
       const totalDocuments = await employeModule.countDocuments();
      const  employees = await employeModule.find().skip(skip).limit(limit);
      console.log(skip)
      res.render('index', {
          list: employees,
          total:totalDocuments,
          skip:skip
      })
    } catch (error) {
        console.log(error)
    }

})
router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    employeModule.findByIdAndDelete(id,(err,user)=>{
        if(err){
            console.log(err)
        }else {
            res.redirect('/')
        }
    })
})
module.exports = router;