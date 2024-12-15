
import {SetMetadata} from '@nestjs/common';

// Clave que se usará para los metadatos de roles
export const ROLES_KEY = 'roles';
/*
 * ROLES_KEY:
 * Esta constante define el nombre de la clave para los metadatos.
 * Se usa para identificar y almacenar los roles permitidos en cada ruta o controlador.
 * Este identificador será leído por el RolesGuard para validar los roles de acceso.
 */

// Decorador para establecer roles

// Decorador para establecer roles
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
/*
 * Decorador Roles:
 * Este decorador sirve para asignar roles específicos a una ruta o controlador.
 *
 * Uso:
 * - Cuando se aplica a una ruta, establece qué roles tienen permiso para acceder a ella.
 * - Se usa en combinación con un RolesGuard que verifica estos roles.
 *
 * Ejemplo:
 * @Roles('admin', 'user') // Permitir acceso a usuarios con roles 'admin' o 'user'
 * @Get('example')
 * myProtectedRoute() {
 *   return 'Esta ruta es protegida';
 * }
 *
 * Si no utilizas este decorador:
 * - No podrás restringir rutas por roles.
 * - Tu RolesGuard no tendrá la información necesaria para validar roles, por lo que no funcionará.
 */