const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")
const {isValidName,isValidEmail, isValidNumber} = require("../validators/validator")


//==========================================================CREATING INTERNS===============================================================

 let createIntern = async ( req , res ) => {
    try {
        let data = req.body
        let {name, email, mobile,collegeName} = data
        
        name = name.trim()
        email = email.trim()
        collegeName = collegeName.trim()

        if(Object.keys(data).length===0)  return res.status(400).send({status:false, msg : "cannot create data without any information"})
        if(!name)  return res.status(400).send({status:false, msg : "Name is required"})
        if(!email) return res.status(400).send({status:false, msg :"Email is required"})
        if(!mobile) return res.status(400).send({status:false, msg :"Mobile number is required"})
        if(!collegeName) return res.status(400).send({status:false, msg :"College name is required"})
        
        let validName = isValidName(name)
        if(!validName)  return res.status(400).send({status:false, msg: "Name can only contain letters"})

        let validEmail = isValidEmail(email)
        if(!validEmail)  return res.status(400).send({status:false, msg:"Email is not valid"})

        let validCollegeName = isValidName(collegeName)
        if(!validCollegeName)  return res.status(400).send({status:false, msg : "College name can only contain letters"})


         //ADDING COLLEGE ID IN DATA USING COLLEGE NAME----------------------

         let college = await collegeModel.find({name:collegeName})
         let collegeId = college[0]._id.toString()
       
        data.collegeId= collegeId
       
        let createdData = await internModel.create(data)
     

        return res.status(201).send({status : true , data : createdData})

    }
    catch(error){
        return res.status(400).send({status:false , message : error.message})
    }
}
module.exports.createIntern=createIntern