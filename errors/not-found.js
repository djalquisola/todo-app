import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api-error.js';

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
