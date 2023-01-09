const internModel = require("../models/collegeModel")



exports.createIntern = async ( req , res ) => {
    try {
        let data = req.body

        if (!data) return res.status(400).send({status:false , msg : "Please provide valid credentials"})
       
        let createdData = await internModel.create(data)

        return res.status(201).send({status : true , data : createdData})

    }catch(error){
        return res.status(500).send({status:false , message : "error.message"})
    }
}