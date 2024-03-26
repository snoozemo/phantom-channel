import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './common/validation.pipe';
import { useSwagger } from './common/utils/swagger';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { AllExceptionsFilter } from './common/all-exception.filter';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());
    app.useGlobalFilters();
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({ origin: '*' });
    const apiPath = useSwagger(app);
    await app.listen(3100);
    Logger.log(await app.getUrl(), 'Listen');
    Logger.log(`${await app.getUrl()}/${apiPath}`, 'Swagger');
}
bootstrap();
