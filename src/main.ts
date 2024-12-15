import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    // Validador de forma global para todos los DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Elimina automáticamente campos no definidos en los DTOs
            forbidNonWhitelisted: true, // Opcional: Lanza un error si hay campos adicionales
        }),
    );

    // Habilitar CORS (modifica origin en producción)
    app.enableCors({
        origin: '*', // Cambia a un dominio específico en producción
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['content-type', 'Authorization'],
    });

    // Inicia la aplicación en el puerto especificado
    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();