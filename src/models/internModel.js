const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            require : true,
            trim : true,
        },
         email : {
            type :String,
            require: true,
            trim : true,
            unique:true,
         },
         mobile : {
            type : Number,
            require: true,
            unique : true,
            trim : true,
         },
        collegeId:{
         type: String,
         require: true
        },
         isDeleted : {
            type : Boolean,
            default : false,
         }
    });


    module.exports = mongoose.model("Intern",internSchema)
