const express = require("express")
const router  = express.Router()
const College = require("../controller/collegeController")
const Intern  = require("../controller/internController")

router.get("/test", (req, res)=>res.send("api"))


router.post( "/functionup/colleges" , College.createCollege )
router.post( "/functionup/interns" , Intern.createIntern )


module.exports= router