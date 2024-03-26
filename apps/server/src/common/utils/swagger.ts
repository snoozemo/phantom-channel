import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
    if (process.env.ENV !== 'prod') {
        const options = new DocumentBuilder()
            .setVersion('1.0.0')
            .setTitle('Phantom Channel API')
            .setDescription('Phantom Channel API description')
            .build();
        const document = SwaggerModule.createDocument(app, options, {
            // extraModels: schemas,
        });
        SwaggerModule.setup('/api', app, document);
        return 'api';
    }
}
