import { INestApplication } from "@nestjs/common";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function appCreate(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          transformOptions: {
            enableImplicitConversion: true
          }
        }),
      );
    
      const SwaggerConfig = new DocumentBuilder()
        .setTitle('NestJS example')
        .setDescription('The NestJS API')
        .setTermsOfService('http://localhost:3000/terms-of-service')
        .addServer('http://localhost:3000')
        .setVersion('1.0')
        .build();
      const documentFactory = () => SwaggerModule.createDocument(app, SwaggerConfig);
      SwaggerModule.setup('api', app, documentFactory);
    
      const configService = app.get(ConfigService);
      config.update({
        credentials: {
          accessKeyId: configService.get<string>('appConfig.awsAccessKeyId'),
          secretAccessKey: configService.get<string>(
            'appConfig.awsSecretAccessKey',
          ),
        },
        region: configService.get<string>('appConfig.awsRegion'),
      });
    
      app.enableCors();
}