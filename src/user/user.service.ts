import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from './dto/login-user.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly jwtService: JwtService,
    ) {
    }

    // Crear nuevo usuario
    async create(createUserDto: CreateUserDto): Promise<{ message: string; data?: User }> {
        const fieldsToCheck = ['name', 'email'];// Agrega aquí los campos que quieres validar

        for (const field of fieldsToCheck) {
            const condition = {[field]: createUserDto[field]};// Construye la condición dinámicamente
            const existingUser = await this.userModel.findOne({where: condition});
            if (existingUser) {
                return {
                    message: `El ${field} ${createUserDto[field]} ya está registrado.`,
                };
            }
        }

        //Encriptar la contraseña
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        // Crear el usuario
        const user = await this.userModel.create(createUserDto);

        return {
            message: `El usuario ${user.name} fue registrado exitosamente con el rol ${user.role}.`,
            data: user,
        };
    }


    // Obtener todos los usuarios
    async findAll(): Promise<{ message: string; data: User[] }> {
        const users = await this.userModel.findAll();
        if (users.length === 0) {
            return {message: 'No hay usuarios registrados.', data: []};
        }
        return {message: 'Lista de usuarios registrados.', data: users};
    }

    // Obtener un usuario por ID
    async findOne(id: number): Promise<{ message: string; data: User }> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }
        return {message: `Usuario con ID ${id} encontrado.`, data: user};
    }

    // Actualizar un usuario
    async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; data: User }> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }

        await user.update(updateUserDto);
        return {message: `Usuario con ID ${id} actualizado correctamente.`, data: user};
    }

    // Eliminar un usuario
    async remove(id: number): Promise<{ message: string; data: User }> {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }

        await user.destroy();
        return {message: `Usuario con ID ${id} eliminado correctamente.`, data: user};
    }

    // Login
    async login(loginUserDto: LoginUserDto): Promise<{ message: string; token?: string }> {
        const {email, password} = loginUserDto;

        const user = await this.userModel.findOne({where: {email}});
        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }


        // Verifica si la contraseña es válida
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        const payload = {id: user.id, email: user.email, role: user.role};
        const token = this.jwtService.sign(payload);
        return {message: 'Inicio de sesión exitoso.', token};
    }
}