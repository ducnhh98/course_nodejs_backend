import { StatusCodes, ReasonPhases } from '../utils/httpStatusCode.js'

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.status = statusCode
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhases.CONFLICT,
    statusCode = StatusCodes.CONFLICT
  ) {
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode)
  }
}

export {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError
}
