import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // Para las variables de entorno
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_PASSWORD'), // Clave JWT
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRE_IN'), // Tiempo de expiración
                },
            }),
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], // Exportar para usar en otros módulos
})
export class UserModule {
}