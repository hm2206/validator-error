const validation = require('./src/Validation');

validation(null, { email: "" }, { email: "required" })
.then(res => console.log(res))
.catch(err => console.error(err));
