import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api-error.js';

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
