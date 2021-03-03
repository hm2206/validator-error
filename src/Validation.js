const ValidatorError = require('./ValidatorError');
const { validator } = require('indicative')

const locationes = [
    'es'
];

module.exports = (validate = null, data = {}, rules = {}, messages = {}, location = 'es') => {
    let is_adonis = true;
    if (typeof validate != 'function') {
        validate = validator.validateAll;
        is_adonis = false;
    }
    // obtener idíoma
    if (locationes.includes(location)) {
        let location_messages = require(`./lang/${location}.js`);
        messages = { ...location_messages, ...messages };
    }
    // validar si es adonis
    if (is_adonis) return validate(data, rules, messages)
        .then(res => {
            if (res.fails()) throw new ValidatorError(res.messages());
            return res.data;
        });
    // response
    return validate(data, rules, messages).then(res => res)
    .catch(errors => {
        throw new ValidatorError(errors);
    });
}