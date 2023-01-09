const collegeModel=require("../models/collegeModel")
let internModel = require("../models/internModel")


let createCollege=async function (req,res)  {
    try{
        const data=req.body;
        const newCollege=await collegeModel.create(data);
        res.send({status:true,
        data:newCollege})
    }
    catch(err){
        return res.send({status:false,msg:err.message})
    }
}


const getCollege = async (req, res)=> {
    try{
    let collegeName = req.query.collegeName
    let collegeId = await collegeModel.find({name: collegeName})
    console.log(collegeId)

    // let data = await collegeModel.find()
    // res.send(data)
    }
    catch(err){
        return res.status(400).send({status: false, msg : err.message})
    }
}

module.exports.createCollege= createCollege
module.exports.getCollege=getCollege