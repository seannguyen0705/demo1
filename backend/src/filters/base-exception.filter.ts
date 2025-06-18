/* eslint-disable no-console */
import {
  BadRequestException,
  Catch,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import type { Response } from 'express';
import type { HttpException } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { BaseException } from '@/exceptions';
import { Exception } from '@/utils/constants';
import { isDevelopmentEnv } from '@/utils/helpers';

import type { IBaseExceptionResponse } from '@/exceptions';

@Catch()
export class AdvancedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): Response<IBaseExceptionResponse> {
    const isDevelopment = isDevelopmentEnv();
    const response = host.switchToHttp().getResponse<Response>();

    let data = <IBaseExceptionResponse>{
      errorCode: Exception.INTERNAL_ERROR_CODE,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong!',
    };

    try {
      const status = exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof BaseException) {
        const { errorCode, message } = exception;

        data = {
          errorCode,
          status,
          message,
        };
      } else {
        const { message } = exception;

        if (exception instanceof BadRequestException) {
          data = {
            errorCode: Exception.BAD_REQUEST_CODE,
            status,
            message,
          };
        } else if (exception instanceof ForbiddenException) {
          data = {
            errorCode: Exception.FORBIDDEN_CODE,
            status,
            message,
          };
        } else if (exception instanceof UnauthorizedException) {
          data = {
            errorCode: Exception.UNAUTHORIZED_CODE,
            status,
            message,
          };
        } else if (exception instanceof NotFoundException) {
          data = {
            errorCode: Exception.NOT_FOUND_CODE,
            status,
            message,
          };
        } else {
          if (isDevelopment) {
            data = {
              errorCode: Exception.NOT_FOUND_CODE,
              status,
              message,
              stack: exception?.cause ? (exception?.cause as any).stack : undefined,
            };

            console.log("Exception Filter's Exception");
            console.log(exception);
          }
        }
      }

      return response.status(data.status).send(data);
    } catch (error) {
      if (isDevelopment) {
        data.stack = error?.stack;
        data.message = error?.message;
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(data);
    }
  }
}
