const collegeModel=require("../models/collegeModel")


const createCollege=async function (req,res)  {
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

module.exports.createCollege=createCollege