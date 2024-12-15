import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly reflector: Reflector, // Usado para obtener los roles requeridos
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Verificar si la ruta es pública
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true; // Permitir acceso sin autenticación
        }

        // Validar el token para rutas protegidas
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No se proporcionó un token válido.');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Formato de token inválido.');
        }

        // Verificar el token de forma síncrona
        const decoded = this.jwtService.verify(token);
        if (!decoded) {
            throw new UnauthorizedException('Token inválido o expirado.');
        }

        request.user = decoded; // Guardar los datos del usuario en la solicitud

        // Validar roles necesarios
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(), // Verifica si el métod0 tiene roles definidos
            context.getClass(), // Verifica si la clase tiene roles definidos
        ]);

        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            // Si el rol del usuario no está en los roles permitidos, lanza un error
            throw new ForbiddenException('No tienes permiso para acceder a esta ruta.');
        }

        return true; // Permitir acceso si tod0 es válido
    }
}