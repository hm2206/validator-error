const ValidatorError = require('./ValidatorError');

const saveFile = async (request, name, config = { required: false }, Helpers, upload = { path: "upload", options: { name: "", overwrite: false } }) => {
    let file = request.file(name, config);
    if (config.required && !file) throw new ValidatorError([ { field: name, message: `el archivo ${name} es requerido` } ]);
    if (!file) return {
        success: false,
        code: "NOT_FOUND_FILE",
        message: "No se encontró el archivo"
    };
    // next
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
        success: true,
        code: "SAVE_SUCCESS",
        message: "El archivo se guardo correctamente",
        realPath: Helpers.tmpPath(`${upload.path}/${upload.options.name}`),
        path: `${upload.path}/${upload.options.name}`,
        name: upload.options.name,
        extname: file.extname,
        size: file.size
    }
}


module.exports = { saveFile };