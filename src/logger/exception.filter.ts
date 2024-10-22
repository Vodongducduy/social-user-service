import { Response, Request } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) {}
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();

        // log error
        this.handleMessage(exception);

        // Response to client
        AllExceptionFilter.handleResponse(host, exception);

    }

    private handleMessage(exception: HttpException | Error) {
        let message = `Internal Server Error`;
        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse());
        } else if (exception instanceof Error) {
            message = exception.stack.toString();
        }
        this.logger.error(message);
    }

    private static handleResponse(host :ArgumentsHost,  exception: HttpException | Error) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
    
        let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status:false,
            statusCode: response.statusCode,
            message: exception.message,
            path: request.path,
            timeStamp: new Date().toISOString()
        })
    }

}
