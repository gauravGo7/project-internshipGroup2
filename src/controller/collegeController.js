const collegeModel=require("../models/collegeModel")
let internModel = require("../models/internModel")
const validator=require("../validators/validator")


let createCollege=async function (req,res)  {
    try{
        const data=req.body;
        let {name,fullName,logoLink}=data
        if (Object.keys(data).length==0){
            return res.send(400).send({status:false,message:"all fields are mandatory"})
        }
        if (!validator.isValidName(name)){
            return res.status(400)
            .send({status:false,msg:"name is required"})
        }
        if (!validator.isValidName(fullName)){
            return res.status(400).send({status:false,msg:"fullName is required"})
        }
        const newCollege=await collegeModel.create(data);
        res.status(201).send({status:true,
        data:newCollege})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


const getCollege = async (req, res)=> {
    try{
    let collegeName = req.query.collegeName
    let college= await collegeModel.find({name: collegeName})

    if(!college)   return res.status(400).send({status:false, msg: "No such college exists in the DB"})

    let collegeId = college[0]._id.toString()
    let name = college[0].name
    const fullName = college[0].fullName
    const logo = college[0].logoLink

    let interns = await internModel.find({collegeId: collegeId})

    let internId = interns.map(el=>el._id)
    let internName = interns.map(el=>el.name)
    let email = interns.map(el=>el.email)
    let mobile= interns.map(el=>el.mobile)

    let internArr=[]
    for(let i=0; i<internId.length; i++){
     let el ={id :internId[i] }
     internArr.push(el)
    }
    for(let i=0; i<internName.length; i++){
       internArr[i].name = internName[i]
    }
    for(let i=0; i<email.length; i++){
        internArr[i].email = email[i]
     }
     for(let i=0; i<mobile.length; i++){
        internArr[i].mobile = mobile[i]
     }
  

    let data = {}
    data.name =name
    data.fullName= fullName
    data.logoLink = logo
    data.interns = internArr

    res.status(200).send(data)
    }
    catch(err){
        return res.status(400).send({status: false, msg : err.message})
    }
}

module.exports.createCollege= createCollege
module.exports.getCollege=getCollege