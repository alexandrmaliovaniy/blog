const mongose = require('mongoose');
function Connect(uri = "", props = {}) {
    return mongose.connect(uri, {
        useNewUrlParser: props.useNewUrlParser || true,
        useUnifiedTopology: props.useUnifiedTopology || true,
        useCreateIndex: props.useCreateIndex || true
    })
}

module.exports = Connect;