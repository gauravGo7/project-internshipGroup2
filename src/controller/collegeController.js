const collegeModel = require("../models/collegeModel")
let internModel = require("../models/internModel")
const { isValidName, isValidNames, isValidLogoLink } = require("../validators/validator")

//=====================================================================CREATING COLLEGES========================================================

let createCollege = async function (req, res) {
    try {
        const data = req.body;
        let { name, fullName, logoLink } = data

        name = name.trim()
        fullName = fullName.trim()
        logoLink = logoLink.trim()

        //CHECKING IF ALL THE FIELDS PRESENT IN THE BODY------------------------------
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "cannot create data without any information" })
        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        if (!fullName) return res.status(400).send({ status: false, message: "Full name is required" })
        if (!logoLink) return res.status(400).send({ status: false, message: "Logo link is required" })

        //VALIDATIONS USING REGEX---------------------------------------------------------
        let validName = isValidNames(name)
        if (!validName) return res.status(400).send({ status: false, message: "name can only contain small letters" })

        let validFullName = isValidName(fullName)
        if (!validFullName) return res.status(400).send({ status: false, message: "Full name can only contain letters" })

        let validLogoLink = isValidLogoLink(logoLink)
        if (!validLogoLink) return res.status(400).send({ status: false, message: "LogoLink is invalid" })
        let isfullName = await collegeModel.find({ fullName: fullName })
        if (isfullName.length !== 0) return res.status(400).send({ status: false, message: "this college already exists" })
        //CREATING COLLEGE----------------------------------------------------------
        const newCollege = await collegeModel.create(data);
        res.status(201).send({ status: true, data: newCollege })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


//=============================================================GETTING COLLEGES=============================================================

const getCollege = async (req, res) => {
    try {
        let collegeName = req.query.collegeName
        let college = await collegeModel.find({ name: collegeName })

        if (college.length === 0) return res.status(400).send({ status: false, msg: "No such college exists in the DB" })

        let collegeId = college[0]._id.toString()
        let name = college[0].name
        const fullName = college[0].fullName
        const logo = college[0].logoLink

        let interns = await internModel.find({ collegeId: collegeId })
        if (interns.length === 0) return res.send({ status: false, message: "No interns have applied for this college" })

        let internId = interns.map(el => el._id)
        let internName = interns.map(el => el.name)
        let email = interns.map(el => el.email)
        let mobile = interns.map(el => el.mobile)

        let internArr = []
        for (let i = 0; i < internId.length; i++) {
            let el = { id: internId[i] }
            internArr.push(el)
        }
        for (let i = 0; i < internName.length; i++) {
            internArr[i].name = internName[i]
        }
        for (let i = 0; i < email.length; i++) {
            internArr[i].email = email[i]
        }
        for (let i = 0; i < mobile.length; i++) {
            internArr[i].mobile = mobile[i]
        }


        let data = {}
        data.name = name
        data.fullName = fullName
        data.logoLink = logo
        data.interns = internArr

        res.status(200).send(data)
    }
    catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }
}

module.exports.createCollege = createCollege
module.exports.getCollege = getCollege


