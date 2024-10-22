import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.Interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './logger/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter(new Logger('Logger')));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
