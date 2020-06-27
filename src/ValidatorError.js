'use strict';

class ValidatorError extends Error {

    constructor(errors = []) {
        super();
        this.name = 'ValidatorError';
        this.code = "E_DATA_INVALIDATE";
        this.status =  "402";
        // validar errors
        let obj = {};
        // add meta_data
        errors.filter(e => {
        let newMessages = [];
            newMessages.push(e.message);
            obj[e.field || "undefined"] = newMessages || "undefined";
        })
        this.message = "Los datos son incorrectos!";
        this.data = JSON.stringify(obj);
    }

}


module.exports = ValidatorError;