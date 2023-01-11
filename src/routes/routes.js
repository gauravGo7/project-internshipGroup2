const express = require("express")
const router  = express.Router()
const {createCollege, getCollege} = require("../controller/collegeController")
const {createIntern} = require("../controller/internController")




router.post( "/functionup/colleges" , createCollege )

router.get("/functionup/colleges", getCollege)

router.post( "/functionup/interns" , createIntern )


module.exports= router