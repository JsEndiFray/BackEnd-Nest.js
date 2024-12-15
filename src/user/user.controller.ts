import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {Public} from "../auth/public.decorator";
import {AuthGuard} from '../auth/auth.guard';
import {Roles} from '../auth/roles.decorator';
import {RolesGuard} from '../auth/roles.guard';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard) // Aplicamos guardias globales para este controlador
export class UserController {
    constructor(private readonly userService: UserService) {
    }


    // Ruta protegida para prueba

    @Get('protected')
    @Roles('admin') // Solo accesible para administradores
    protectedRoute() {
        return {message: 'Acceso autorizado solo para administradores.'};
    }

    // Crear un nuevo usuario
    @Post()
    @Roles('admin') // Solo los administradores pueden crear usuarios
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // Obtener todos los usuarios
    @Get()
    @Roles('admin', 'user', 'employee') // Accesible para administradores y usuarios
    findAll() {
        return this.userService.findAll();
    }

    // Obtener un usuario por ID
    @Get(':id')
    @Roles('admin', 'user', 'employee') // Accesible para administradores y usuarios
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    // Actualizar un usuario
    @Patch(':id')
    @Roles('admin') // Solo los administradores pueden actualizar usuarios
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    // Eliminar un usuario
    @Delete(':id')
    @Roles('admin') // Solo los administradores pueden eliminar usuarios
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    // Iniciar sesión
    @Public() // Esta ruta será accesible sin autenticación
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto);
    }
}