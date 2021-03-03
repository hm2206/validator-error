const ValidatorError = require('./ValidatorError');
const { validator } = require('indicative')

const locationes = [
    'es'
];

module.exports = (validate = null, data = {}, rules = {}, messages = {}, location = 'es') => {
    if (typeof validate != 'function') validate = validator.validateAll;
    // obtener idíoma
    if (locationes.includes(location)) {
        let location_messages = require(`./lang/${location}.js`);
        messages = { ...location_messages, ...messages };
    }
    // response
    return validate(data, rules, messages).then(res => {
        return res;
    }).catch(errors => {
        throw new ValidatorError(errors);
    });
}