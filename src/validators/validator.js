const isValidName = function (name) {
    const nameRegex = /^[a-z, A-Z]+$/;
    return nameRegex.test(name)
}

const isValidNumber= function(invoice){
    const nameRegex = /^[0-9]+$/;
    return nameRegex.test(invoice)
}

const isValidEmail=function(email){
    const pattern = /(^$|^.*@.*\..*$)/
    return  pattern.test(email)
}


module.exports={isValidEmail,isValidName, isValidNumber}
