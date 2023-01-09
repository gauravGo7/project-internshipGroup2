const express = require("express")
const router = express.Router()
const College=require("../controller/collegeController")

router.get("/test", (req, res)=>res.send("api"))

router.post("/functionup/colleges",College.createCollege)
module.exports= router