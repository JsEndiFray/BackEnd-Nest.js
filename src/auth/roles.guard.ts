import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    // El Reflector se utiliza para acceder a los metadatos establecidos por decoradores
    constructor(private readonly reflector: Reflector) {
    }

// Metodo principal que determina si una solicitud tiene permiso para continuar
    canActivate(context: ExecutionContext): boolean {
        /**
         * 1. Obtener los roles requeridos:
         *    Usamos `reflector.getAllAndOverride` para buscar los roles requeridos en los metadatos del controlador o ruta.
         *    - `ROLES_KEY` es la clave de metadatos definida en el decorador `@Roles`.
         *    - `context.getHandler()` verifica si la ruta específica tiene roles requeridos.
         *    - `context.getClass()` verifica si el controlador tiene roles requeridos.
         */
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),// Ruta actual
            context.getClass(),// Clase controladora
        ]);
        // Si no hay roles requeridos para la ruta, se permite el acceso
        if (!requiredRoles) {
            return true;// Continuar con la solicitud
        }
        /**
         * 2. Obtener el usuario autenticado:
         *    El usuario autenticado se extrae del objeto de solicitud. Esto es posible porque
         *    el AuthGuard ya ha validado el token JWT y ha agregado los datos del usuario al objeto de la solicitud.
         */
        const {user} = context.switchToHttp().getRequest();
        /**
         * 3. Verificar si el rol del usuario coincide con los roles requeridos:
         *    - `user.role` es el rol del usuario autenticado (proveniente del token JWT).
         *    - `requiredRoles.includes(user.role)` verifica si el rol del usuario está en la lista de roles permitidos.
         */
        return requiredRoles.includes(user.role);
    }
}