const ValidatorError = require('./ValidatorError');

const saveFile = async (request, name, config = { required: false }, Helpers, upload = { path: "upload", options: { name: "", overwrite: false } }) => {
    let file = request.file(name, config);
    if (config.required && !file) throw new ValidatorError([ { field: name, message: `el archivo ${name} es requerido` } ]);
    upload.options.name = `${upload.options.name}.${file.extname}`;
    await file.move(Helpers.tmpPath(upload.path), upload.options);
    if (!file.moved()) {
        let error = file.error();
        throw new ValidatorError([
            {
                field: error.fieldName,
                message: error.message
            }
        ]);
    }
    // response
    return {
        path: `${upload.path}/${upload.options.name}.${file.extname}`,
        name: `${upload.options.name}.${file.extname}`,
        extname: file.extname,
        size: file.size
    }
}


module.exports = { saveFile };