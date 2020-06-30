'use strict';

module.exports = (error = {}) => {
    try {
        let message = JSON.parse(error.message);
        return message;
    } catch (error) {
        return {
            errors: {},
            message: error.message
        };
    }
};