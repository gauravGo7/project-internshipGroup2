const isValidName = function (name) {
    const nameRegex = /^[a-z ,A-Z]+$/;
    return nameRegex.test(name)
}

const isValidNumber= function(invoice){
    const nameRegex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
    return nameRegex.test(invoice)
}

const isValidEmail=function(email){
    const pattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


    return  pattern.test(email)
}

const isValidNames = function (name) {
    const nameRegex = /^[a-z]+$/;
    return nameRegex.test(name)
}


module.exports={isValidName,isValidEmail, isValidNumber , isValidNames}





