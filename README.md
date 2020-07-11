
# Error personalizado del Validator de Adonisjs 4.1.* en el servidor



``` js
    const ValidatorError = require('validator-error');
```


# Parametros

``` js

    let errores = [
        { field: String, message: String },
    ];

    throw ValidatorError(errores);

```


# Error personalizado del Validator de Adonis para el cliente
