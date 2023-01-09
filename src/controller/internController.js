const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")



 let createIntern = async ( req , res ) => {
    try {
        let data = req.body
        let {name, email, mobile,collegeName} = data
    
         let college = await collegeModel.find({name:collegeName})
         let collegeId = college[0]._id.toString()
       
        data.collegeId= collegeId
       
        let createdData = await internModel.create(data)
     

        return res.status(201).send({status : true , data : createdData})

    }catch(error){
        return res.status(400).send({status:false , message : error.message})
    }
}
module.exports.createIntern=createIntern