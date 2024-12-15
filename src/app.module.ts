import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {Dialect} from 'sequelize';
import {APP_GUARD, Reflector} from '@nestjs/core';
import {AuthGuard} from './auth/auth.guard';
import {JwtModule} from "@nestjs/jwt";
import {RolesGuard} from "./auth/roles.guard";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Hace que las variables de entorno sean accesibles globalmente
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: configService.get<Dialect>('DB_DIALECT'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                autoLoadModels: true,
                synchronize: true, // Cambiar a false en producción si pongo a false, es porque si hago algun cambio en la base de datos y no se actualice
            }),
        }),
        /** COMENTARIO
         * Configuración asíncrona del módulo JWT en NestJS utilizando `JwtModule.registerAsync`.
         *
         * Este código registra el módulo JWT (`JwtModule`) de forma asíncrona, permitiendo
         * inyectar servicios y obtener configuraciones dinámicas, como claves secretas
         * o tiempos de expiración, desde el `ConfigService`.
         *
         * Detalles de cada sección:
         *
         * 1. `imports: [ConfigModule]`:
         *    - Importa el módulo `ConfigModule` para acceder a configuraciones globales
         *      definidas en el entorno (variables de entorno).
         *
         * 2. `inject: [ConfigService]`:
         *    - Inyecta el `ConfigService`, que es el servicio que permite leer valores
         *      desde el archivo de configuración (`.env`) o cualquier otra fuente configurada.
         *
         * 3. `useFactory: async (configService: ConfigService) => ({ ... })`:
         *    - Define una función de fábrica que genera la configuración necesaria para el módulo JWT.
         *    - Es asíncrona por si necesitas realizar operaciones como leer datos remotos o
         *      realizar cálculos previos antes de devolver la configuración.
         *
         * 4. `secret: configService.get<string>('JWT_PASSWORD')`:
         *    - Establece la clave secreta que se usará para firmar y verificar los tokens JWT.
         *    - El valor se extrae de las variables de entorno usando `ConfigService.get`.
         *    - `JWT_PASSWORD` debe estar definido en el archivo `.env` o equivalente.
         *
         * 5. `signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE_IN') }`:
         *    - Especifica las opciones para firmar los tokens JWT.
         *    - `expiresIn` define cuánto tiempo será válido el token (por ejemplo, "1h" para una hora).
         *    - El valor también se obtiene del entorno usando `ConfigService.get`.
         *
         * Ejemplo de archivo `.env` asociado:
         *
         * JWT_PASSWORD=mi_clave_secreta
         * JWT_EXPIRE_IN=1h
         *
         * Beneficios de esta configuración:
         * - Permite personalizar las opciones del JWT fácilmente desde el archivo de configuración.
         * - Es flexible y asíncrona, lo que permite adaptarse a entornos dinámicos.
         * - Centraliza la configuración de seguridad para facilitar el mantenimiento.
         */
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_PASSWORD'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRE_IN'),
                }
            })
        }),
        UserModule, // Módulo para la gestión de usuarios
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard, // Aplicar AuthGuard globalmente
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,

        },
        Reflector,
        //el Reflector se utiliza para verificar si una ruta o metodo tiene metadatos específicos asociados,
        // como si es pública (mediante el decorador @Public()) o qué roles están permitidos (mediante el decorador @Roles()).
    ],
})
export class AppModule {
}