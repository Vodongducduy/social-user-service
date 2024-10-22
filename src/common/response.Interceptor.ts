import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";
import { Request, Response} from "express";


export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((res: any) => this.responseHandler(res, context)),
            // catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
        ); 
    }

    // private errorHandler(exception: HttpException, context: ExecutionContext) {
    //     const ctx = context.switchToHttp();
    //     const response = ctx.getResponse<Response>();
    //     const request = ctx.getRequest<Request>();

    //     const status = exception instanceof HttpException ? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    //     response.status(status).json({
    //         status: false
    //         , statusCode: status
    //         , message: exception.message
    //         , path: request.path
    //         , timeStamp: new Date().toISOString()
    //     })
    // }

    private responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        return {
            status: true
            , statusCode: response.statusCode
            , result: res
            , path: request.path
            , timeStamp: new Date().toISOString()
        }
    }
}

