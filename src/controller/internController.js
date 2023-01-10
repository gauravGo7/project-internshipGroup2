const internModel = require("../models/internModel")
const collegeModel= require("../models/collegeModel")
const {isValidName,isValidEmail, isValidNumber} = require("../validators/validator")


//==========================================================CREATING INTERNS===============================================================

 let createIntern = async ( req , res ) => {
    try {
        let data = req.body
        let {name, email, mobile,collegeName} = data
        
        //CHECKING IF ALL THE FIELDS PRESENT IN THE BODY---------------------------------
        if(Object.keys(data).length===0)  return res.status(400).send({status:false, msg : "cannot create data without any information"})
        //KEY VALIDATION---------------------------------------------------------------
        let keyArr = Object.keys(data)
        for(let i=0;i<keyArr.length; i++){
            keyArr[i]= keyArr[i].trim()
            if(keyArr[i].length ===0){
                return res.status(400).send({status:false, message:"please provide valid key"})
            }
        }

        if(!name)  return res.status(400).send({status:false, message : "Name is required"})
        name = name.trim()

        if(!email) return res.status(400).send({status:false, message :"Email is required"})
        email = email.trim()

        if(!mobile) return res.status(400).send({status:false, message :"Mobile number is required"})

        if(!collegeName) return res.status(400).send({status:false, message :"College name is required"})
        collegeName = collegeName.trim()

        
        //VALIDATIONS USING REGEX--------------------------
        let validName = isValidName(name)
        if(!validName)  return res.status(400).send({status:false, message: "Name can only contain letters"})

        let validEmail = isValidEmail(email)
        if(!validEmail)  return res.status(400).send({status:false, message:"Email is not valid"})

        let validCollegeName = isValidName(collegeName)
        if(!validCollegeName)  return res.status(400).send({status:false, message : "College name can only contain letters"})


         //ADDING COLLEGE ID IN DATA USING COLLEGE NAME----------------------

         let college = await collegeModel.find({name:collegeName})
         
         //IF NO SUCH COLLEGE EXISTS IN THE DB-----------------------------------
         if(college.length===0)  return res.status(400).send({status:false, message:"No such college exists in the collection"})

         //IF COLLEGE EXISTS-------------------------------------------------
         let collegeId = college[0]._id.toString()
         data.collegeId= collegeId
       
         //CREATING INTERNS
        let createdData = await internModel.create(data)
        return res.status(201).send({status : true , data : createdData})

    }
    catch(error){
        return res.status(400).send({status:false , message : error.message})
    }
}
module.exports.createIntern=createIntern