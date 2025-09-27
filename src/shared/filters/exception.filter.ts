import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 500;

    // ⚠️ dev only!
    if (process.env.NODE_ENV === 'dev') {

      response.status(status).json({
        statusCode: status,
        message: `${exception.name}: ${exception.message}`,
        query: exception.query,
      });

    } else {

      response.status(status).json({
        statusCode: status,
        message: `Something went wrong!`,
      });

    }

  }
}
