const internModel = require("../models/internModel")



 let createIntern = async ( req , res ) => {
    try {
        let data = req.body
       
        let createdData = await internModel.create(data)

        return res.status(201).send({status : true , data : createdData})

    }catch(error){
        return res.status(500).send({status:false , message : "error.message"})
    }
}
module.exports.createIntern=createIntern