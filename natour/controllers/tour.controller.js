const path = require('path')
const fs = require('fs')
const tourFilePath = path.resolve(__dirname, '..','dev-data', 'data', 'tours-simple.json')

const tours = JSON.parse(
    fs.readFileSync(tourFilePath)
)


module.exports.getAllTour = (req, res) => {
    res.status(200).json({
        message: "success",
        result: tours.length,
        data: {
            tours: tours
        }
    })
}

module.exports.getTourById=async (req, res) => {
    const id = req.params.id *1
    if (id) {
      
        
        if(id > tours.length){
            return res.status(404).json({
                status:"failed",
                message : "Please provide a valid id"
            })
        }
        const tour = tours.find(el=> el.id === req.params.id*1);
        res.status(200).json({
            message: "success",
            data:{
                tour:tour
            }

        })
    } else {
        res.status(404).json({
            status:"failed",
            message:"please provie an ID"
        })
    }

}
module.exports.deleteTour =(req, res) => {
    const id = req.params.id *1
    if (id) {
        
        if(id > tours.length){
            return res.status(404).json({
                status:"failed",
                message : "Please provide a valid id"
            })
        }
        
        res.status(204).json({
            message: "success",
            

        })
    } else {
        res.status(404).json({
            status:"failed",
            message:"please provie an ID"
        })
    }

}
module.exports.updateTour = (req, res) => {
    const id = req.params.id *1
    if (id) {
        
        if(id > tours.length){
            return res.status(404).json({
                status:"failed",
                message : "Please provide a valid id"
            })
        }
        
        res.status(200).json({
            message: "success",
            data:{
                tour:'Data Updated'
            }

        })
    } else {
        res.status(404).json({
            status:"failed",
            message:"please provie an ID"
        })
    }

}
module.exports.addTour=(req, res) => {
    if (req.body) {

        const newId = tours[tours.length - 1].id + 1;
        const tour = Object.assign({ id: newId }, req.body)

        tours.push(tour)
        fs.writeFile(tourFilePath, JSON.stringify(tours), err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tours: tour
                }
            })
        })
    } else {

    }



} 