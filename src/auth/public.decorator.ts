import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Decorador personalizado para marcar una ruta como pública.
 *
 * Esto establece un metadato `isPublic` en `true`, que puede ser leído por guards
 * (por ejemplo, un AuthGuard) para permitir el acceso a la ruta sin necesidad
 * de autenticación.
 *
 * Úsalo en rutas que deben ser accesibles por cualquier usuario, como:
 * - Páginas de inicio de sesión o registro.
 * - Recuperación de contraseñas.
 * - Información general (términos, condiciones, etc.).
 * - APIs públicas que no manejan datos sensibles.
 *
 * Nota: Si no se utiliza este decorador, las rutas estarán protegidas
 * de acuerdo con la configuración de los guards.
 *
 * Ejemplo de uso:
 *
 * @Controller('auth')
 * export class AuthController {
 *   @Post('login')
 *   @Public()
 *   login(@Body() loginDto: LoginDto) {
 *     return this.authService.login(loginDto);
 *   }
 * }
 */