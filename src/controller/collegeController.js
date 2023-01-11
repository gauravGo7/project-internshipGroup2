const collegeModel = require("../models/collegeModel");
let internModel = require("../models/internModel");
const {isValidName, isValidNames} = require("../validators/validator");
let axios = require("axios");

//=================================================CREATING COLLEGES=============================================================================//

let createCollege = async function (req, res) {
  try {
    const data = req.body;
    let { name, fullName, logoLink } = data;

    //CHECKING IF ALL THE FIELDS PRESENT IN THE BODY------------------------------
    if (Object.keys(data).length == 0)
      return res
        .status(400)   
        .send({
          status: false,
          message: "cannot create data without any information",
        });

    //KEY VALIDATION---------------------------------------------------------------
    let keyArr = Object.keys(data);
    for (let i = 0; i < keyArr.length; i++) {
      keyArr[i] = keyArr[i].trim();
      if (keyArr[i].length === 0) {
        return res
          .status(400)
          .send({ status: false, message: "key cannot be empty" });
      }
    }

    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Name is required" });
    name = name.trim();

    if (!fullName)
      return res
        .status(400)
        .send({ status: false, message: "Full name is required" });
    fullName = fullName.trim();

    if (!logoLink)
      return res
        .status(400)
        .send({ status: false, message: "Logo link is required" });
    logoLink = logoLink.trim();

    //VALIDATIONS USING REGEX---------------------------------------------------------
    let validName = isValidNames(name);
    if (!validName)
      return res
        .status(400)
        .send({
          status: false,
          message: "name can only contain small letters",
        });

    let validFullName = isValidName(fullName);
    if (!validFullName)
      return res
        .status(400)
        .send({ status: false, message: "Full name can only contain letters" });

    let urlfound = false;

    await axios
      .get(logoLink)
      .then((result) => {
        if (result.status == 201 || result.status == 200) urlfound = true;
      })
      .catch((err) => {});

    if (urlfound == false)
      return res
        .status(400)
        .send({ status: false, ERROR: "Invalid Logo link" });

    //IF COLLEGE ALREAY EXISTS-----------------------------------------------------------------------
    let isfullName = await collegeModel.find({ fullName: fullName });
    if (isfullName.length !== 0)
      return res
        .status(400)
        .send({ status: false, message: "This college already exists" });

    //CREATING COLLEGE IF COLLEGE DOES NOT EXISTS---------------------------------------------------------
    const newCollege = await collegeModel.create(data);
    res.status(201).send({ status: true, data: newCollege });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//=============================================================GETTING COLLEGES=====================================================================

const getCollege= async(req, res)=> {
  try{
  let collegeName = req.query.collegeName
  let college = await collegeModel.findOne({name: collegeName}).select({_id:1, name:1, fullName:1,logoLink:1 }).lean()
  let x = college._id
  console.log(x)
  let interns = await internModel.find({ collegeId: college._id.toString()})
  
  console.log(interns)
  college.interns= interns
  res.send({status:true, data: college})
  
  }
  catch(err){
    return res.status(500).send({ status: false, msg: err.message });
  }
  }


module.exports.createCollege = createCollege;
module.exports.getCollege = getCollege;
