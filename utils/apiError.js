class APIError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    /**
     * failed is for any error starting with 400 while error is for others, this is an if statement in ternary operators
     */
    this.status = `${statusCode}`.startsWith(`4`) ? `fail` : `error`;

    Error.captureStackTrace = (this, this.constructor);
  }
}

module.exports = APIError;
