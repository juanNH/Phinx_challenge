import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

/**
 * Exception to catch not found data.
 * @param text String that is going to be the message.
 */
@Injectable()
export class NotFoundException extends HttpException {
  constructor(text:string) {
    super(text, HttpStatus.NOT_FOUND);
  }
}