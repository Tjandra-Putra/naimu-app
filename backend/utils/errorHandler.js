class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // The super method is used to call the constructor of the parent class (Error) and pass the message parameter to it.
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
