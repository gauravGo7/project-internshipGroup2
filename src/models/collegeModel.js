const mongoose=require('mongoose')


const collegeModel=new mongoose.Schema({
    name:{
        type :String,
        required:true,
        unique:true,
        trim : true
    },
    fullName:{
        type:String,
        required:true,
    },
    logoLink:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

module.exports=mongoose.model('College',collegeModel)