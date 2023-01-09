const isValidName = function (name) {
    const nameRegex = /^[a-z A-Z]+$/;
    return nameRegex.test(name)
}

const isValidNumber= function(invoice){
    const nameRegex = /^[0-9]+$/;
    return nameRegex.test(invoice)
}

const isValidPassword = function (password) {
    const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/
    return passwordRegex.test(password);
};
const isValidEmail=function(email){
    const pattern = /(^$|^.*@.*\..*$)/
    return  pattern.test(email)
}


module.exports={isValidEmail,isValidName,isValidPassword, isValidNumber}
