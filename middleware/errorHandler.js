const {constant} = require("../constans");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack })
            break;
        case constant.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack })
            break;
        case constant.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack })
            break;
        case constant.FORMIDDEN:
            res.json({ title: "Formidden", message: err.message, stackTrace: err.stack })
            break;
        case constant.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack })
            break;
        default:
            console.log("no error")
            break;
    }
}

module.exports = errorHandler;