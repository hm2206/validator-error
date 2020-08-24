const ValidatorError = require('./ValidatorError');

const saveFile = async (request, name, config = { required: false, multifiles: false }, Helpers, upload = { path: "upload", options: { name: "", overwrite: false } }) => {
    let file = request.file(name, config);
    if (config.required && !file) throw new ValidatorError([ { field: name, message: `el archivo ${name} es requerido` } ]);
    if (!file) return {
        success: false,
        code: "NOT_FOUND_FILE",
        message: "No se encontró el archivo"
    };
    // validar multiples archivos
    if (config.multifiles) {
        let tmpFiles = [];
        // save files
        await file.moveAll(Helpers.tmpPath(upload.path), (f) => {
            console.log(f);
            let newName = upload.options.name ? `${upload.options.name}_${new Date().getTime()}.${f.extname}` : f.clientName;
            // add file 
            tmpFiles.push({
                realPath: Helpers.tmpPath(`${upload.path}/${newName}`),
                path: `${upload.path}/${newName}`,
                name: newName,
                extname: f.extname,
                size: f.size
            });
            // save name
            return { name: newName };
        });
        // validar archivos
        if (!file.movedAll()) {
            let errors = file.errors();
            throw new ValidatorError(errors);
        }
        // response multifiles
        return {
            success: true,
            code: 'SAVE_SUCCESS_FILES',
            message: "Los archivos se guardarón correctamente",
            files: tmpFiles
        }
    }
    // assign name file
    upload.options.name = upload.options.name ? `${upload.options.name}.${file.extname}` : file.clientName;
    // next
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