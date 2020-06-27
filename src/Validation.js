const ValidatorError = require('./ValidatorError');

module.exports = (validate, request = {}, rules = {}) => {
    if (typeof validate != 'function') throw new Error("El parametro validate debe de ser una función");
    return validate(request, rules).then(res => {
        if (res.fails()) throw new ValidatorError(res.messages());
    });
}